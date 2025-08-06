import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShippingLineComponent } from './shipping-line.component';

@NgModule({
  declarations: [
    ShippingLineComponent
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    ShippingLineComponent
  ]
})
export class ShippingLineModule { }
