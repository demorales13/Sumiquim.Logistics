import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderByPipe } from './order-by/order-by.pipe';
import { MultiFieldOrderByPipe } from './multi-field-order-by/multi-field-order-by.pipe';

@NgModule({
  declarations: [
    OrderByPipe,
    MultiFieldOrderByPipe
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    OrderByPipe,
    MultiFieldOrderByPipe
  ]
})
export class PipesModule { }
