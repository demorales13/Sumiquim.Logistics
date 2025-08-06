import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from '@app/services/auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})


export class AuthGuard implements CanActivate {
  constructor(private router: Router,
    private authService:AuthService) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {

    var profile = this.authService.profile$.value;
    var user = this.authService.user$;

    if(profile){
      return true;
    }

    this.router.navigate(["login"], { queryParams: { returnUrl: state.url }});
    return false;
  }

}
