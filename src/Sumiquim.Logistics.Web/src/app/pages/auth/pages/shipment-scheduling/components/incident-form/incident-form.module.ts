import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AutocompleteModule, FormFieldModule, InputModule } from '@app/shared/controls';
import { IncidentFormComponent } from './incident-form.component';

@NgModule({
  declarations: [
    IncidentFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormFieldModule,
    InputModule,
    AutocompleteModule
  ]
})
export class IncidentFormModule { }
