import { Injectable } from '@angular/core';
import { IAppHttpResponse, IShippingScheduling, ITrackHttpError, IUser, ShippingStatuses } from '@app/models/backend';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AppHttpServiceResponse } from '@app/classes/AppHttpServiceResponse.class';
import { environment } from '@src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ShippingSchedulingService extends AppHttpServiceResponse {

  private _shippingLines: IShippingScheduling[] = [];
  private _pendingShippingLines: IShippingScheduling[] = [];

  private profile: IUser | null = null;

  constructor(
    http: HttpClient,
    private authService: AuthService
  ) {
    super(http)
    this.subscribeToProfile();
  }

  private subscribeToProfile(): void {
    this.authService.profile$.subscribe(
      (profile) => (this.profile = profile)
    );
  }

  get ShippingLines(): IShippingScheduling[] {
    return this._shippingLines;
  }

  get PendingShippingLines(): IShippingScheduling[] {
    return this._pendingShippingLines;
  }

  public getByDate(date: number): Observable<IShippingScheduling[] | ITrackHttpError> {
    const filterDate = this.formatDate(date);
    const url = `${environment.baseUrl}/shipping-scheduling/date/${filterDate}`;

    return this.http
      .get<IAppHttpResponse<IShippingScheduling[]>>(url)
      .pipe(
        map(
          (response) => response.data ?? []
        ),
        tap((list) => (this._shippingLines = list)),
        catchError((error) => this.handleHttpError(error))
      );
  }

  public getPendingShippingLines(): Observable<IShippingScheduling[] | ITrackHttpError> {
    const url = `${environment.baseUrl}/shipping-scheduling`;
    let params = new HttpParams();
    params = params.set('shipmentNotification', ShippingStatuses.Pending);
    return this.http
      .get<IAppHttpResponse<IShippingScheduling[]>>(url, { params })
      .pipe(
        map(
          (response) => response.data ?? []
        ),
        tap((list) => (this.mergePendingShippingScheduling(list))),
        catchError((error) => this.handleHttpError(error))
      );
  }

  public get(filters: { [key: string]: any }): Observable<IShippingScheduling[] | ITrackHttpError> {
    const url = `${environment.baseUrl}/shipping-scheduling`;
    let params = new HttpParams();

    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        params = params.set(key, value.toString());
      }
    });

    return this.http
      .get<IAppHttpResponse<IShippingScheduling[]>>(url, { params })
      .pipe(
        map(
          (response) => response.data ?? []
        ),
        tap((list) => (this.mergeShippingScheduling(list))),
        catchError((error) => this.handleHttpError(error))
      );
  }

  public Update(item: IShippingScheduling) {
    const url = `${environment.baseUrl}/shipping-scheduling/${item.shippingSchedulingId}`;

    return this.http
      .put<IAppHttpResponse<boolean>>(url, item)
      .pipe(
        tap(() => {
          this._shippingLines = this._shippingLines.filter(
            (line) => line.shippingSchedulingId !== item.shippingSchedulingId
          );
        }),
        catchError((error) => this.handleHttpError(error))
      );
  }

  public remove(item: IShippingScheduling) {
    const url = `${environment.baseUrl}/shipping-scheduling/${item.shippingSchedulingId}`;

    return this.http
      .delete<IAppHttpResponse<boolean>>(url)
      .pipe(
        tap(() => {
          this._shippingLines = this._shippingLines.filter(
            (line) => line.shippingSchedulingId !== item.shippingSchedulingId
          );
        }),
        catchError((error) => this.handleHttpError(error))
      );
  }

  createFromExcel(date: number, file: File): Observable<IAppHttpResponse<any> | ITrackHttpError> {
    var url = `${environment.baseUrl}/shipping-scheduling/excel/create`;

    const formData: FormData = new FormData();
    formData.append('File', file, file.name);
    formData.append('date', this.formatDate(date).toString());

    return this.http
      .post<IAppHttpResponse<any>>(url, formData)
      .pipe(catchError((error) => this.handleHttpError(error)));
  }

  formatDate(date: number): number {
    const d = new Date(date);
    let month = "" + (d.getMonth() + 1);
    let day = "" + d.getDate();
    const year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return +[year, month, day].join("");
  }

  private mergeShippingScheduling(newList: IShippingScheduling[]): void {
    const map = new Map(newList.map(n => [n.shippingSchedulingId, n]));

    // 1) Borrar los que ya no vienen
    for (let i = this._shippingLines.length - 1; i >= 0; i--) {
      if (!map.has(this._shippingLines[i].shippingSchedulingId)) {
        this._shippingLines.splice(i, 1);
      }
    }

    // 2) Actualizar / insertar
    newList.forEach((n, idx) => {
      const old = this._shippingLines.find(o => o.shippingSchedulingId === n.shippingSchedulingId);
      if (old) {
        Object.assign(old, n);
      } else {
        this._shippingLines.splice(idx, 0, n);
      }
    });
  }

  private mergePendingShippingScheduling(newList: IShippingScheduling[]): void {
    const map = new Map(newList.map(n => [n.shippingSchedulingId, n]));

    // 1) Borrar los que ya no vienen
    for (let i = this._pendingShippingLines.length - 1; i >= 0; i--) {
      if (!map.has(this._pendingShippingLines[i].shippingSchedulingId)) {
        this._pendingShippingLines.splice(i, 1);
      }
    }

    // 2) Actualizar / insertar
    newList.forEach((n, idx) => {
      const old = this._pendingShippingLines.find(o => o.shippingSchedulingId === n.shippingSchedulingId);
      if (old) {
        Object.assign(old, n);
      } else {
        this._pendingShippingLines.splice(idx, 0, n);
      }
    });
  }

}
