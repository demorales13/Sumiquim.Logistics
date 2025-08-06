import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'item',
    loadChildren: ()=> import('./pages/item/item.module').then(m=>m.ItemModule)
  },
  {
    path: 'client',
    loadChildren: ()=> import('./pages/client/client.module').then(m=>m.ClientModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdmonRoutingModule { }
