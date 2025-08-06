import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat/app';

import { ICredentials } from '../models/frontend';
import { IUser } from '../models/backend';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private USER_KEY = "sumiquimLogisticaApp"
  user$ : Observable<firebase.User | null>;
  profile$ : BehaviorSubject<IUser | null>;

  constructor(
    private fs: AngularFirestore,
    private afauth: AngularFireAuth) {
    this.user$ = afauth.authState;
    this.profile$ = new BehaviorSubject( this.getProfile() );
  }

  login(user: ICredentials) {
    const { email, password } = user;
    return this.afauth.signInWithEmailAndPassword(email, password);
  }

  logout() {
    return this.afauth.signOut().finally(() =>{
      this.removeProfile();
    });
  }

  profile(id: string) {
    return this.fs.doc<IUser>(`users/${id}`).valueChanges()
      .pipe(
        tap(res => {
          if(res) {
            this.setProfile(res);
          }
        })
      )
  }

  private setProfile(user: IUser){
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
    this.profile$.next(this.getProfile());
  }

  private getProfile(): IUser | null {
    var user = localStorage.getItem(this.USER_KEY);
    if(!user){
      return null;
    }
    return JSON.parse(user);
  }

  private removeProfile(): void {
    localStorage.clear();
    this.profile$.next(this.getProfile());
  }

  get isLogistics(): boolean {
    return this.profile$.value?.role == "logistica";
  }

  get isUser(): boolean {
    return this.profile$.value?.role == "usuario";
  }
}
