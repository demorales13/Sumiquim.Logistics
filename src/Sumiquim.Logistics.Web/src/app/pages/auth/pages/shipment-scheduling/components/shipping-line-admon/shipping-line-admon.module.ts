import { NgModule, Pipe } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShippingLineAdmonComponent } from './shipping-line-admon.component';

@NgModule({
  declarations: [
    ShippingLineAdmonComponent
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    ShippingLineAdmonComponent
  ]
})
export class ShippingLineAdmonModule { }
