import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { IItem } from '@app/models/backend';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { CacheService } from './cache.service';

const collectionName: string = "items";

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  private collection: AngularFirestoreCollection<IItem>;


  constructor(private fs: AngularFirestore, private cacheService: CacheService) {
    this.collection = fs.collection<IItem>(collectionName);
  }

  public get(): Observable<IItem[]>{

    // verifica en la caché
    var cache = this.cacheService.load(collectionName);
    if(cache){
      console.log("CACHE GET ITEM");
      return of(cache);
    }

    return this.fs.collection<IItem>(collectionName, ref => ref.orderBy('name'))
      .snapshotChanges()
      .pipe(
        map(actions=>

          actions.map(a=>{
            const data = a.payload.doc.data() as any;
            const id = a.payload.doc.id;
            return { ...data, id };
          })
        ),
        tap(values => {
          this.cacheService.save(JSON.stringify(values), collectionName, 60);
        })
      )
  }

  public getById(id: string): Observable<IItem | undefined> {

    // verifica en la caché
    var cache: IItem[] = this.cacheService.load(collectionName);
    if(cache){
      var item = cache.find(x=>x.id == id);
      if(item){
        console.log("CACHE GET ITEM ID");
        return of(item);
      }
    }

    return this.fs.doc<IItem>(`${collectionName}/${id}`).valueChanges();
  }

  public editById(id: string) {
    return this.collection.doc(id).delete();
  }

  public saveAll(items: IItem[]) {
    items.map(item=> {
      this.save(item);
    })
  }

  public save(item: IItem) {
    if (item.id) {
      return this.collection.doc(item.id).update(item);
    } else {
      return this.collection.add(item);
    }

  }
}
