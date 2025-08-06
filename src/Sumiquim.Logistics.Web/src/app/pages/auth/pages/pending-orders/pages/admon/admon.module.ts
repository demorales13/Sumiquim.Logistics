import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from '@app/shared/buttons';
import { FormModule } from '../../components/form/form.module';
import { MatDialogModule } from '@angular/material/dialog';
import { PendingOrderLineAdmonModule } from '../../components/pending-order-line-admon/pending-order-line-admon.module';
import { AdmonRoutingModule } from './admon-routing.module';
import { AdmonComponent } from './admon.component';

@NgModule({
  declarations: [
    AdmonComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    AdmonRoutingModule,
    ButtonModule,
    FormModule,
    PendingOrderLineAdmonModule
  ]
})
export class AdmonModule { }
