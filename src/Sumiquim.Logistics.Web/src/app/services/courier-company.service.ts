import { Injectable } from '@angular/core';
import { ICourierCompany } from '@app/models/backend';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { CacheService } from './cache.service';

const collectionName: string = "courierCompanies";

@Injectable({
  providedIn: 'root'
})
export class CourierCompanyService {

  constructor(private cacheService: CacheService) {
  }

  public get(): Observable<ICourierCompany[]> {
    return of([]); // Temporarily returning an empty array, replace with actual implementation

    // // verifica en la caché
    // var cache = this.cacheService.load(collectionName);
    // if(cache){
    //   console.log("CACHE GET COURIER");
    //   return of(cache);
    // }

    // return this.fs.collection(collectionName, ref => ref.orderBy('name'))
    //   .snapshotChanges()
    //   .pipe(
    //     map(actions=>

    //       actions.map(a=>{
    //         const data = a.payload.doc.data() as any;
    //         const id = a.payload.doc.id;
    //         return { ...data, id };
    //       })
    //     ),
    //     tap(values => {
    //       this.cacheService.save(JSON.stringify(values), collectionName, 14400);
    //     })
    //   )
  }
}
