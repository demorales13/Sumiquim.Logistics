import { HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '@app/services/auth.service';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthInterceptor {

    constructor(private authService: AuthService) { }

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        const profile = this.authService.profile;
        if (profile?.token) {
            req = req.clone({
                setHeaders: {
                    Authorization: `Bearer ${profile.token}`
                }
            });
        }
        return next.handle(req);
    }
}