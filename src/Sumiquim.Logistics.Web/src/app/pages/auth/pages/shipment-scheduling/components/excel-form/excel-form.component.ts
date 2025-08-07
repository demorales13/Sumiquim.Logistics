import { ChangeDetectorRef, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IAppHttpResponse, IShippingScheduling } from '@app/models/backend';
import { LoaderService } from '@app/services/loader.service';
import { NotificationService } from '@app/services/notification.service';
import { ShippingSchedulingService } from '@app/services/shipping-scheduling.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-form',
  templateUrl: './excel-form.component.html',
  styleUrls: ['./excel-form.component.scss']
})
export class ExcelFormComponent implements OnInit, OnDestroy {

  form!: FormGroup;
  shippings: IShippingScheduling[] = [];
  errors: IExcelError[] = [];
  subscriptions = new Subject();
  excelFiles: File | null = null;

  constructor(private dialogRef: MatDialogRef<ExcelFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IShippingScheduling,
    private shippingSchedulingService: ShippingSchedulingService,
    private notificationService: NotificationService,
    private cdr: ChangeDetectorRef) {
    this.form = new FormGroup({});
  }

  ngOnDestroy(): void {
    this.subscriptions.next(null);
    this.subscriptions.complete();
  }

  ngOnInit(): void {
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.excelFiles = input.files[0];
    }
  }

  onSubmit() {
    this.shippingSchedulingService.createFromExcel(this.excelFiles as File)
      .subscribe(
        () => {
          this.notificationService.toast("La creación de despachos finalizó exitosamente", "success");
        },
        (response) => {
          console.error(response);
          this.errors = response.errors.errors || [];
        }
      );

  }

  onClose(): void {
    this.dialogRef.close();
  }

}

export interface IExcelError {
  rowIndex: string;
  columnName: string;
  message: string;
}
