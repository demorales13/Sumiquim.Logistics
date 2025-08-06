import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Observable, Subscriber } from 'rxjs';
import * as XLSX from 'xlsx';

export interface DialogData {
  fields: string[];
  title: string;
}

interface ExcelError {
  data: string;
  description: string;
}

@Component({
  selector: 'app-excel-to-json',
  templateUrl: './excel-to-json.component.html',
  styleUrls: ['./excel-to-json.component.scss']
})
export class ExcelToJsonComponent implements OnInit {

  isHovering ?: boolean;

  files : File[]  = [];
  imageFile!: File | null ;
  isError!: boolean;
  items$!: Observable<any[]>;
  error!: ExcelError;

  constructor(
    private dialogRef: MatDialogRef<ExcelToJsonComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { }

  ngOnInit(): void {
  }

  toggleHover(event: boolean){
    this.isHovering = event;
  }

  onDrop(files: FileList): void{
    this.processFiles(files);
  }

  onDropFile(event: FileList | any) : void {
    this.processFiles(event.target.files);
  }

  processFiles(files: FileList): void{
    for(let i=0; i< files.length;i++){
      var file = files.item(i) as File ;
      this.files.push(file);

      this.items$ = new Observable((s : Subscriber<any>) => {
        this.readExcelData(file, s);
      })

    }
  }

  readExcelData(file: File, subscriber: Subscriber<any>): void {
    const fileReader = new FileReader();
    fileReader.readAsArrayBuffer(file);

    fileReader.onload = (e) => {
      const bufferArray = e.target?.result;
      const wb : XLSX.WorkBook = XLSX.read(bufferArray, {type: 'buffer'});
      const wsname: string = wb.SheetNames[0];

      const ws: XLSX.WorkSheet = wb.Sheets[wsname];
      const excelData = XLSX.utils.sheet_to_json(ws);
      const data = this.processData(excelData);

      subscriber.next(data);
      subscriber.complete();
    }
  }

  processData(items: any[]): any[] {
    var result: any[] = [];

    for(var i = 0; i < items.length; i++) {
      var item = items[i];

      var e : any = {};

      for(var j = 0; j < this.data.fields.length; j++) {
        var field = this.data.fields[j];
        e[field] = item[field];

        if (!e[field]) {
          this.error = {
            description: `No se encontró el campo ${field} en la linea ${i+1}.`,
            data: `${JSON.stringify(item)}`
          }
        }
      }

      if(this.error){
        result = [];
        break;
      }

      result.push(e);
    }

    return result;
  }

  onComplete(): void {
    this.items$.subscribe((items: any[]) => {
      this.dialogRef.close(items);
    });
  }

  onClose(): void {
    this.dialogRef.close();
  }

}
