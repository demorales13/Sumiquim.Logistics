import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

import { ICredentials } from '../models/frontend';
import { IAppHttpResponse, IUser } from '../models/backend';
import { AppHttpServiceResponse } from '../classes/AppHttpServiceResponse.class';
import { environment } from '@src/environments/environment';
import { ROLES } from '@app/data/roles.const';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends AppHttpServiceResponse {

  private USER_KEY = "sumiquim_logistica_app"
  private _profile$: BehaviorSubject<IUser | null>;

  constructor(http: HttpClient) {
    super(http)
    this._profile$ = new BehaviorSubject<IUser | null>(this.getProfile());
  }

  login(user: ICredentials) {
    const url = `${environment.baseUrl}/auth/login`;

    return this.http
      .post<IAppHttpResponse<IUser>>(url, user)
      .pipe(
        tap((response) => {
          this.setProfile(response.data as IUser);
        })
      )
      .pipe(catchError((error) => this.handleHttpError(error)));
  }

  logout(): void {
    this.removeProfile();
  }

  public get profile$(): Observable<IUser | null> {
    return this._profile$.asObservable();
  }

  public get profile(): IUser | null {
    return this._profile$.value;
  }

  private setProfile(user: IUser): void {
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
    this._profile$.next(user);
  }

  private getProfile(): IUser | null {
    const userJson = localStorage.getItem(this.USER_KEY);
    return userJson ? JSON.parse(userJson) : null;
  }

  private removeProfile(): void {
    localStorage.removeItem(this.USER_KEY);
    this._profile$.next(null);
  }

  get isPlanner(): boolean {
    return this._profile$.value?.role == ROLES.PLANNER;
  }

  get isOperator(): boolean {
    return this._profile$.value?.role == ROLES.OPERATOR;
  }
}