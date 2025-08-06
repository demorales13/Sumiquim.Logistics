import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { IPendingOrder } from '@app/models/backend/pending-order';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PendingOrderService {

  private collection: AngularFirestoreCollection<IPendingOrder>;

  constructor(private fs: AngularFirestore) {
    this.collection = fs.collection<IPendingOrder>('pending-orders');
  }

  public get(): Observable<IPendingOrder[]>{
    return this.fs.collection('pending-orders')
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

  public save(item: IPendingOrder) {
    if (item.id) {
      return this.collection.doc(item.id).update(item);
    } else {
      return this.collection.add(item);
    }
  }

  public delete(item: IPendingOrder) {
      return this.collection.doc(item.id).delete();
  }
}
