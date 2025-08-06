import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PendingOrderLineComponent } from './pending-order-line.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    PendingOrderLineComponent
  ],
  exports: [
    PendingOrderLineComponent
  ]
})
export class PendingOrderLineModule { }
