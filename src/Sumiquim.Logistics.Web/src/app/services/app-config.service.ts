import { Injectable } from '@angular/core';
import { NgxRolesService } from 'ngx-permissions';
import { AuthService } from './auth.service';

@Injectable()
export class AppConfigService {

  constructor(private authService: AuthService,
    private rolesService: NgxRolesService) {}

  load() {
    this.rolesService
    .addRoles({
      'User': () => {
        return this.authService.isUser;
      },
      'Logistics': () => {
        return this.authService.isLogistics;
      }
    });
  }

}
