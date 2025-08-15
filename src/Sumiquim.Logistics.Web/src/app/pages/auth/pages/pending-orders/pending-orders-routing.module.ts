import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgxPermissionsGuard } from 'ngx-permissions';

const routes: Routes = [
  {
    path: 'admon',
    loadChildren: () => import('./pages/admon/admon.module').then(m => m.AdmonModule),
    canActivate: [NgxPermissionsGuard],
    data: {
      permissions: {
        only: ['Logistics'],
        redirectTo: '/auth'
      }
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PendingOrdersRoutingModule { }
