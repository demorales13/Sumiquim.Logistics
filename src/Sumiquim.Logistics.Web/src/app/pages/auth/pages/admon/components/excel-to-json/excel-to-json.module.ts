import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExcelToJsonComponent } from './excel-to-json.component';
import { DropZoneDirective } from './directives';
import { ExcelToJsonDirective } from './excel-to-json.directive';
import { MatDialogModule } from '@angular/material/dialog';
import { FileSizePipe } from './pipe';


@NgModule({
  declarations: [
    ExcelToJsonComponent,
    DropZoneDirective,
    ExcelToJsonDirective,
    FileSizePipe
  ],
  imports: [
    CommonModule,
    MatDialogModule
  ],
  // entryComponents: [
  //   ExcelToJsonComponent,
  // ],
  exports: [
    ExcelToJsonDirective
  ]
})
export class ExcelToJsonModule { }
