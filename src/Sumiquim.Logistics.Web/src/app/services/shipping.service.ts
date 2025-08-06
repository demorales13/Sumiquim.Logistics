import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { IShipping } from '@app/models/backend';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ShippingService {

  private collection: AngularFirestoreCollection<IShipping>;

  constructor(private fs: AngularFirestore) {
    this.collection = fs.collection<IShipping>('shippings');
  }

  public getByDate(date: number): Observable<IShipping[]>{

    var filter = this.formatDate(date);
    return this.fs.collection('shippings', ref => ref.where('date', '==', filter))
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

  public get(): Observable<IShipping[]>{

     return this.fs.collection('shippings')
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

  public save(item: IShipping) {

    if (item.id) {
      return this.collection.doc(item.id).update(item);
    } else {
      item.date = this.formatDate(item.date);
      return this.collection.add(item);
    }
  }

  public saveBatch(items: IShipping[]) {
    const batch = this.fs.firestore.batch();
  
    items.forEach((item) => {
      const docRef: any = item.id ? this.collection.doc(item.id).ref : this.collection.doc().ref;
 
      batch.set(docRef, { ...item, date: this.formatDate(item.date) });
    });
  
    return batch.commit();
  }

  public delete(item: IShipping) {
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

}
