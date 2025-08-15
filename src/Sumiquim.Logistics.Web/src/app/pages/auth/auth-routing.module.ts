import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgxPermissionsGuard } from 'ngx-permissions';
import { AuthComponent } from './auth.component';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: 'shipment-scheduling',
        loadChildren: () => import('./pages/shipment-scheduling/shipping-scheduling.module').then(m => m.ShippingSchedulingModule)
      },
      {
        path: 'pending-shipment-scheduling',
        loadChildren: () => import('./pages/pending-shipment-scheduling/pending-shipping-scheduling.module').then(m => m.PendingShippingSchedulingModule)
      },
      {
        path: "static",
        loadChildren: () => import('./pages/static/static.module').then(m => m.StaticModule)
      },
      {
        path: 'converter',
        loadChildren: () => import('./pages/converter/converter.module').then(m => m.ConverterModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
