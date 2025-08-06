import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConverterRoutingModule } from './converter-routing.module';
import { ConverterComponent } from './converter.component';
import { DateModule, FormFieldModule, InputModule } from '@app/shared/controls';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from '@app/shared/buttons';
import { MonthsCountPipe } from './pipes/months-count/moths-count.pipe';


@NgModule({
  declarations: [
    ConverterComponent,
    MonthsCountPipe
  ],
  imports: [
    CommonModule,
    ConverterRoutingModule,
    ReactiveFormsModule,
    FormFieldModule,
    ButtonModule,
    DateModule,
    InputModule
  ]
})
export class ConverterModule { }
