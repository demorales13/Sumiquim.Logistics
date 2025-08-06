import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { IShippingScheduling, IUser, ShippingStatuses } from '@app/models/backend';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { NotificationService } from './notification.service';
import { EmailService } from './email.service';
import { AuthService } from './auth.service';
import { LoaderService } from './loader.service';

@Injectable({
  providedIn: 'root'
})
export class ShippingSchedulingService {

  private _shippingLines: IShippingScheduling[] = [];
  private _pendingShippingLines: IShippingScheduling[] = [];
  private collection: AngularFirestoreCollection<IShippingScheduling>;
  private profile: IUser | null = null;

  constructor(
    private fs: AngularFirestore, 
    private emailService: EmailService,
    private authService: AuthService,
    private loaderService: LoaderService,
    private notificationService: NotificationService) {
    this.collection = fs.collection<IShippingScheduling>('shipping-scheduling');
    this.authService.profile$.subscribe(profile => this.profile = profile);
  }

  get ShippingLines(): IShippingScheduling[] {
    return this._shippingLines;
  }

  get PendingShippingLines(): IShippingScheduling[] {
    return this._pendingShippingLines;
  }

  public getByDate(date: number): Observable<IShippingScheduling[]>{
    var filter = this.formatDate(date);
    return this.fs.collection('shipping-scheduling', ref => ref.where('date', '==', filter))
      .snapshotChanges()
      .pipe(
        map(actions=>

          actions.map(a=>{
            const data = a.payload.doc.data() as any;
            const id = a.payload.doc.id;
            return { ...data, id };
          }),
        ), 
        tap(res => this._shippingLines = res.sort((a,b) => this.orderShippingByClientName(a,b) )),
        //tap(res => this.startEmailNotificationChecking()),
        tap(res => this.longTimeNoCheckEmailNotification())
      )
  }

  public getShipmentNotificationPending(): Observable<IShippingScheduling[]>{
    return this.fs.collection('shipping-scheduling', ref => ref.where('shipmentNotification', '==', ShippingStatuses.Pending))
      .snapshotChanges()
      .pipe(
        map(actions=>

          actions.map(a=>{
            const data = a.payload.doc.data() as any;
            const id = a.payload.doc.id;
            return { ...data, id };
          }),
        ), 
        tap(res => this._pendingShippingLines = res.sort((a,b) => this.orderShippingByClientName(a,b) )),
      )
  }

  public get(): Observable<IShippingScheduling[]>{

     return this.fs.collection('shipping-scheduling')
      .snapshotChanges()
      .pipe(
        map(actions=>

         actions.map(a=>{
            const data = a.payload.doc.data() as any;
            const id = a.payload.doc.id;
            return { ...data, id };
          })
        )
      )
  }

  public save(item: IShippingScheduling) {

    if (item.id) {
      return this.collection.doc(item.id).update(item);
    } else {
      item.date = this.formatDate(item.date);
      return this.collection.add(item);
    }
  }

  public saveBatch(items: IShippingScheduling[]) {
    const batch = this.fs.firestore.batch();
  
    items.forEach((item) => {
      const docRef: any = item.id ? this.collection.doc(item.id).ref : this.collection.doc().ref;

      var toStore = { ...item, date: this.formatDate(item.date) };
 
      batch.set(docRef, toStore);
    });
  
    return batch.commit();
  }

  public delete(item: IShippingScheduling) {
    return this.collection.doc(item.id).delete();
  }

  formatDate(date: number):number {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return +[year, month, day].join('');
  }

  orderShippingByClientName( a: IShippingScheduling, b: IShippingScheduling ) {
    var an = a.client as string;
    var bn = b.client as string;

    if ( an < bn ){
      return -1;
    }
    if ( an < bn ){
      return 1;
    }
    return 0;
  }

  get lastCheckingEmailNotification(): Date | null {
    var value = localStorage.getItem('lastCheckingEmailNotification');
    return value ? new Date(value) : null;
  }

  set lastCheckingEmailNotification(value: Date | null) {
    localStorage.setItem('lastCheckingEmailNotification', value ? value.toString() : '');
  }

  longTimeNoCheckEmailNotification(): void {
    if(this.profile?.role !== 'logistica') return;
    console.log('lastCheckingEmailNotification', this.lastCheckingEmailNotification);

    if(this.lastCheckingEmailNotification === null) {
      this.lastCheckingEmailNotification = new Date();
      console.log('lastCheckingEmailNotification new value', this.lastCheckingEmailNotification);
      console.log('checking emails notification missing');
      this.checkEmailNotification();
    }
    else {
      var lastChecking = new Date(this.lastCheckingEmailNotification);
      var now = new Date();
      var diff = now.getTime() - lastChecking.getTime();
      var diffMinutes = Math.floor(diff / 60000);
      console.log('lastCheckingEmailNotification check', diffMinutes, 'minutes');

      if(diffMinutes > this.intervalInMinutes) {
        this.lastCheckingEmailNotification = now;
        this.checkEmailNotification(); 
      }
    }
  }

  private intervalInMinutes: number = 15;
  private intervalId: any;
  private intervalTime: number = this.intervalInMinutes * 60 * 1000; // 30 minutos * 60 segundos * 1000 milisegundos

  startEmailNotificationChecking() {
    if(this.profile?.role !== 'logistica') return;
    console.log('Iniciando la revisión de notificaciones por email...');
    
    this.intervalId = setInterval(() => {
      this.checkEmailNotification();
    }, this.intervalTime);
  }

  stopEmailNotificationChecking() {
    console.log('Deteniendo la revisión de notificaciones por email...');
    clearInterval(this.intervalId);
  }

  snozeEmailNotificationChecking() {
    this.stopEmailNotificationChecking();
    this.startEmailNotificationChecking();
  }

  checkEmailNotification() {

    const pendingToSendNotification = this._shippingLines.filter(item =>
      item.shipmentNotification === 'pending' &&
      item.schedulingNotification === 'sent' && 
      item.guide !== null
    );

    console.log('Envios pendientes por notificar => ', pendingToSendNotification.length);

    if(pendingToSendNotification.length > 0){
      this.stopEmailNotificationChecking();

      this.notificationService
        .toastInfinite('Se encontraron notificaciones de despachos realizados pendientes por enviar.', 'info')
        .then((result) => {
          if (result.isConfirmed) {
            console.log('Enviar notificaciones...');
            this.sendShipmentNotificationEmail();
          } 
          if(result.isDenied){ 
            console.log('Postergar notificaciones...');
          }
          this.startEmailNotificationChecking();
        });
    }
  }

  sendShipmentNotificationEmail(): void {
    this.emailService
      .sendShipmentNotificationEmail()
      .pipe(
        take(1) // desuscribirse después de la primera emisión
      )
      .subscribe( 
        result => {
          console.log("sendShipmentNotificationEmail => ", result);
        }, 
        error => {
          console.log("ERROR [sendShipmentNotificationEmail] => ", error);
        }
      );
  }

  refreshCheckEmailNotification(): void { 
    this.loaderService.show();

    try { 
      this.lastCheckingEmailNotification = null;
      this.checkEmailNotification();
    } catch (error) {
      console.error('Error al verificar notificaciones por correo electrónico:', error);
      this.notificationService.toast('Se produjo un error. Intente nuevamente.', 'error');  
    }
    finally {
      setTimeout(() => {
        this.loaderService.hide();
      }, 500);
    }
  }
}
