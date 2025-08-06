import { NgModule, Pipe } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DisplayRoutingModule } from './display-routing.module';
import { DisplayComponent } from './display.component';
import { DateModule } from '@app/shared/controls';
import { ShippingLineModule } from '../../components/shipping-line/shipping-line.module';
import { ShippingHeaderModule } from '../../components/shipping-header/shipping-header.module';
import { PipesModule } from '@app/shared/pipes/pipes.module';

@NgModule({
  declarations: [
    DisplayComponent
  ],
  imports: [
    CommonModule,
    DisplayRoutingModule,
    ShippingLineModule,
    ShippingHeaderModule,
    DateModule,
    PipesModule,
  ]
})
export class DisplayModule { }
