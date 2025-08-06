import { Directive, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ExcelToJsonComponent } from './excel-to-json.component';


@Directive({
  selector: '[appExcelToJson]'
})
export class ExcelToJsonDirective {

  @Input() fields!: string[];
  @Input() title!: string;
  @Output() changed = new EventEmitter<any[]>();

  constructor(private dialog: MatDialog) { }

  @HostListener('click', ['event']) onclick() {
    this.openDialog();
  }

  private openDialog(): void {
    const dialogRef = this.dialog.open(ExcelToJsonComponent, {
      width: '550px',
      height: '500px',
      data: {
        fields: this.fields,
        title: this.title
      }
    })

    dialogRef.afterClosed().subscribe(result => {
      this.changed.emit(result || []);
    })
  }

}
