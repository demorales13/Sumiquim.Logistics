import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ItemRoutingModule } from './item-routing.module';
import { ItemComponent } from './item.component';
import { ButtonModule } from '@app/shared/buttons';
import { ExcelToJsonModule } from '../../components/excel-to-json/excel-to-json.module';


@NgModule({
  declarations: [
    ItemComponent
  ],
  imports: [
    CommonModule,
    ItemRoutingModule,
    ButtonModule,
    ExcelToJsonModule
  ]
})
export class ItemModule { }
