import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AutocompleteModule, FormFieldModule, InputModule } from '@app/shared/controls';
import { ExcelFormComponent } from './excel-form.component';

@NgModule({
  declarations: [
    ExcelFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormFieldModule,
    InputModule,
    AutocompleteModule
  ]
})
export class ExcelFormModule { }
