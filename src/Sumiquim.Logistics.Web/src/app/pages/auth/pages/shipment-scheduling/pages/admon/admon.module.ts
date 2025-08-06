import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdmonRoutingModule } from './admon-routing.module';
import { AdmonComponent } from './admon.component';
import { DateModule } from '@app/shared/controls';
import { ButtonModule } from '@app/shared/buttons';
import { MatDialogModule } from '@angular/material/dialog';
import { ShippingLineAdmonModule } from '../../components/shipping-line-admon/shipping-line-admon.module';
import { ShippingHeaderAdmonModule } from '../../components/shipping-header-admon/shipping-header-admon.module';
import { FormModule } from '../../components/form/form.module';
import { ExcelFormModule } from '../../components/excel-form/excel-form.module';
import { IncidentFormModule } from '../../components/incident-form/incident-form.module';
import { PipesModule } from '@app/shared/pipes/pipes.module';

@NgModule({
  declarations: [
    AdmonComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    AdmonRoutingModule,
    ShippingLineAdmonModule,
    ShippingHeaderAdmonModule,
    FormModule,
    IncidentFormModule,
    DateModule,
    ButtonModule,
    ExcelFormModule,
    PipesModule,
  ]
})
export class AdmonModule { }
