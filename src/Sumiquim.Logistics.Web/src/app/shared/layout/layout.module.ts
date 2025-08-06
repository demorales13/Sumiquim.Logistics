import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { NavigationComponent } from './navigation/navigation.component';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPermissionsModule } from 'ngx-permissions';

var components = [ HeaderComponent, NavigationComponent ]

@NgModule({
  declarations: [ ...components ],
  imports: [
    CommonModule,
    RouterModule,
    NgbModule,
    NgxPermissionsModule
  ],
  exports: [ ...components ]
})
export class LayoutModule { }
