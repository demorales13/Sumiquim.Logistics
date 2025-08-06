import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DisplayComponent } from './display.component';
import { PendingOrderLineModule } from '../../components/pending-order-line/pending-order-line.module';
import { DisplayRoutingModule } from './display-routing.module';

@NgModule({
  imports: [
    CommonModule,
    PendingOrderLineModule,
    DisplayRoutingModule
  ],
  declarations: [DisplayComponent]
})
export class DisplayModule { }
