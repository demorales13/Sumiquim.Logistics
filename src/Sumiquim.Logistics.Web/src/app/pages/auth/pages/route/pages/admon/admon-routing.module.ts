import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdmonComponent } from './admon.component';

const routes: Routes = [
  {
    path: '',
    component: AdmonComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdmonRoutingModule { }
