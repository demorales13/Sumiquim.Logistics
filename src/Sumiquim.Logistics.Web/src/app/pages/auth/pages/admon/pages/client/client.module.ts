import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientRoutingModule } from './client-routing.module';
import { ClientComponent } from './client.component';
import { ExcelToJsonModule } from '../../components/excel-to-json/excel-to-json.module';
import { ButtonModule } from '@app/shared/buttons';


@NgModule({
  declarations: [
    ClientComponent
  ],
  imports: [
    CommonModule,
    ClientRoutingModule,
    ExcelToJsonModule,
    ButtonModule
  ]
})
export class ClientModule { }
