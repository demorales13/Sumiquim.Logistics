import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { IClient } from '@app/models/backend';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { CacheService } from './cache.service';

const collectionName: string = "clients";

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private collection: AngularFirestoreCollection<IClient>;

  constructor(
    private fs: AngularFirestore,
    private cacheService: CacheService) {
    this.collection = fs.collection<IClient>(collectionName);
  }

  public get(): Observable<IClient[]>{

    // verifica en la caché
    var cache = this.cacheService.load(collectionName);
    if(cache){
      console.log("CACHE GET CLIENTS");
      return of(cache);
    }

    return this.fs.collection(collectionName, ref => ref.orderBy('name'))
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

  public getById(id: string): Observable<IClient | undefined> {

    // verifica en la caché
    var cache: IClient[] = this.cacheService.load(collectionName);
    if(cache){
      var item = cache.find(x=>x.id == id);
      if(item){
        console.log("CACHE GET CLIENT ID");
        return of(item);
      }
    }

    return this.fs.doc<IClient>(`${collectionName}/${id}`).valueChanges();
  }

  public editById(id: string) {
    return this.collection.doc(id).delete();
  }

  public saveAll(clients: IClient[]) {
    clients.map(client=> {
      this.save(client);
    })
  }

  public save(item: IClient) {
    if (item.id) {
      return this.collection.doc(item.id).update(item);
    } else {
      return this.collection.add(item);
    }
  }
}
