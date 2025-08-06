import { ChangeDetectorRef, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IClient, ICourierCompany, IItem, IShipping, IShippingScheduling, ShippingStatuses } from '@app/models/backend';
import { LoaderService } from '@app/services/loader.service';
import { NotificationService } from '@app/services/notification.service';
import { ShippingSchedulingService } from '@app/services/shipping-scheduling.service';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-form',
  templateUrl: './excel-form.component.html',
  styleUrls: ['./excel-form.component.scss']
})
export class ExcelFormComponent implements OnInit, OnDestroy {

  form!: FormGroup;
  items!: IItem[];
  clients!: IClient[];
  shippings: IShippingScheduling[] = [];
  errors: IError[] = [];
  courierCompanies!: ICourierCompany[];
  subscriptions = new Subject();

  constructor(private dialogRef: MatDialogRef<ExcelFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IShippingScheduling,
    private loaderService: LoaderService,
    private notificationService: NotificationService,
    private shippingSchedulingService: ShippingSchedulingService,
    private cdr: ChangeDetectorRef) { }

  ngOnDestroy(): void {
    this.subscriptions.next(null);
    this.subscriptions.complete();
  }

  ngOnInit(): void {
  }

  onAddExcelFile(event: any): void {
    this.shippings = [];
    this.errors = [];
    let file = event.target.files[0];
    this.loaderService.show();

    this.readExcelFile(file)
      .pipe(takeUntil(this.subscriptions))
      .subscribe(
        (shippings) => {
          this.shippings = shippings;
          this.loaderService.hide();
        },
        (error) => {
          console.error('Error al leer el archivo Excel:', error);
          this.notificationService.toast('Se produjo un error. Intente nuevamente.', 'error');
          this.loaderService.hide();
        }
      );
  }

  readExcelFile(file:any): Observable<IShippingScheduling[]> {

    return new Observable((observer) => {
      var shippings: IShippingScheduling[] = [];
      let fileReader = new FileReader();
      fileReader.readAsBinaryString(file);
  
      fileReader.onload = (e) => {
        var workbook = XLSX.read(fileReader.result, { type: 'binary'});
        var sheetNames = workbook.SheetNames;
        var dataSheetItems = XLSX.utils.sheet_to_json(workbook.Sheets[sheetNames[0]]);

        dataSheetItems.forEach((row: any) => {

          var client = (row as any)?.['RAZÓN SOCIAL']?.toString().trim() ?? null;
          var batch = (row as any)?.['LOTE']?.toString().trim() ?? null;
          var item = (row as any)?.['ITEM']?.toString().trim() ?? null;

          if(!client){
            this.pushError("Registro no tiene un cliente [RAZÓN SOCIAL]", client, batch, item);
            return;
          }

          if(!batch){
            this.pushError("Registro no tiene un lote [LOTE]", client, batch, item);
            return;
          }

          if(!item){
            this.pushError("Registro no tiene un item [ITEM]", client, batch, item);
            return;
          }

          var purchaseOrder = (row as any)?.['ORDEN DE COMPRA']?.toString().trim() ?? null;
          if(!purchaseOrder){
            this.pushError("Registro no tiene una orden de compra [ORDEN DE COMPRA]", client, batch, item);
            return;
          }

          var code = (row as any)?.['CODIGO']?.toString().trim() ?? null;
          if(!code){
            this.pushError("Registro no tiene un codigo [CODIGO]", client, batch, item);
            return;
          }
  
          const quantity = (row as any)?.['PESO NETO']?.toString().trim() ?? null;
          if(!quantity){
            this.pushError("Registro no tiene un peso neto [PESO NETO]", client, batch, item);
            return;
          }

          const warehouse = (row as any)?.['BODEGA']?.toString().trim() ?? null;
          if(!warehouse){
            this.pushError("Registro no tiene una bodega [BODEGA]", client, batch, item);
            return;
          }

          const address = (row as any)?.['DIRECCIÓN']?.toString().trim() ?? null;
          if(!address){
            this.pushError("Registro no tiene una dirección [DIRECCIÓN]", client, batch, item);
            return;
          }

          const city = (row as any)?.['CIUDAD']?.toString().trim() ?? null;
          if(!city){
            this.pushError("Registro no tiene una ciudad [CIUDAD]", client, batch, item);
            return;
          }

          const salesAdvisor = (row as any)?.['COMERCIAL']?.toString().trim() ?? null;
          if(!salesAdvisor){
            this.pushError("Registro no tiene un comercial [COMERCIAL]", client, batch, item);
            return;
          }

          const notes = (row as any)?.['NOTAS']?.toString().trim() ?? '';
          const carrierCompany = (row as any)?.['TRANSPORTADORA']?.toString().trim() ?? '';

          var shipping: IShippingScheduling = {
            id: '',
            date : this.data.date,
            client,
            batch,
            item,
            purchaseOrder,
            code,
            quantity,
            warehouse,
            address,
            city,
            notes,
            carrierCompany,
            guide: null,
            incident: null,
            salesAdvisor,
            schedulingNotification: ShippingStatuses.Pending,
            shipmentNotification: ShippingStatuses.Pending
          };
  
          shippings.push(shipping);
 
        });
        observer.next(shippings);
        observer.complete();
      }

      fileReader.onerror = (e) => {
        observer.error(e);
      };

    })
  }

  pushError(text: string, client: string, batch: string, item: string): void {
    this.errors.push({
      description: text,
      client,
      batch,
      item
    })
  }

  onSubmit(event: Event):void {
    event.preventDefault()
    this.loaderService.show();
    this.shippingSchedulingService.saveBatch(this.shippings)
      .then(res => {
        this.loaderService.hide();
        this.notificationService.toast("La información se almacenó exitosamente", "success");
        this.dialogRef.close(res);
      }).catch(error=>{
        console.log("Error => ", error);
        this.loaderService.hide();
        this.notificationService.toast('Se produjo un error. Intente nuevamente.', 'error');
      });
  }

  onClose(): void {
    this.dialogRef.close();
  }

}

export interface IError {
  batch: string;
  client: string;
  item: string;
  description: string;
}