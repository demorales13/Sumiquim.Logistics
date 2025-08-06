import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IShippingScheduling } from '@app/models/backend';
import { LoaderService } from '@app/services/loader.service';
import { NotificationService } from '@app/services/notification.service';
import { ShippingSchedulingService } from '@app/services/shipping-scheduling.service';
import { Value } from '@app/shared/controls/date/date.component';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FormComponent } from '../../components/form/form.component';
import { ExcelFormComponent } from '../../components/excel-form/excel-form.component';
import { EmailService } from '@app/services/email.service';

@Component({
  selector: 'app-admon',
  templateUrl: './admon.component.html',
  styleUrls: ['./admon.component.scss']
})
export class AdmonComponent implements OnInit, OnDestroy {

  date!: number;
  subscriptions = new Subject();

  constructor(private dialog: MatDialog,
    private loaderService: LoaderService,
    private notificationService: NotificationService,
    private emailService: EmailService,
    private shippingSchedulingService: ShippingSchedulingService) { }

  ngOnDestroy(): void {
    this.subscriptions.next(null);
    this.subscriptions.complete();
  }

  get ShippingLines(): IShippingScheduling[] {
    return this.shippingSchedulingService.ShippingLines;
  }

  ngOnInit(): void {
    this.date = new Date().getTime();
    this.getShippings();
  }

  getShippings() {
    this.loaderService.show();
    this.shippingSchedulingService.getByDate(this.date)
      .pipe(takeUntil(this.subscriptions))
      .subscribe(res => {
        this.loaderService.hide();
      }, error => {
        console.log("Error => ", error);
        this.loaderService.hide();
        this.notificationService.toast('Se produjo un error. Intente nuevamente.', 'error');
      });
  }

  onDateChanged(event: Value): void {
    this.date = event as number;
    this.getShippings();
  }

  onAddExcelFile(): void {
    const dialogRef = this.dialog.open(ExcelFormComponent, {
      width: '80%',
      data: {
        date: this.date
      }
    })

    dialogRef.afterClosed()
      .pipe(takeUntil(this.subscriptions))
      .subscribe(result => {
        this.getShippings();
        this.sendScheduledNotificationEmail();
      })
  }

  sendScheduledNotificationEmail(): void {
    this.emailService.sendScheduledNotificationEmail()
      .pipe(takeUntil(this.subscriptions))
      .subscribe(result => {
        console.log("SendScheduledNotificationEmail => ", result);
      });
  }

  onShippingEditClick(shipping: IShippingScheduling): void {
    const dialogRef = this.dialog.open(FormComponent, {
      width: '550px',
      data: shipping
    })

    dialogRef.afterClosed()
      .pipe(takeUntil(this.subscriptions))
      .subscribe(result => {
        this.getShippings();
      })
  }

  onShippingRemoveClick(shipping: IShippingScheduling): void {
    this.notificationService.confirm("", "Está seguro(a) que desea eliminar este registro")
      .then(response => {
        if (response.isConfirmed) {
          this.shippingSchedulingService.remove(shipping)
            .pipe(takeUntil(this.subscriptions))
            .subscribe(res => {

            }, error => {
              console.log("Error => ", error);
              this.notificationService.toast('Se produjo un error. Intente nuevamente.', 'error');
            });
        }
      })
  }

  onCheckEmails(): void {
    this.emailService.sendScheduledNotificationEmail()
      .pipe(takeUntil(this.subscriptions))
      .subscribe(result => {
        console.log("SendScheduledNotificationEmail => ", result);
      });

    this.emailService.sendShipmentNotificationEmail()
      .pipe(takeUntil(this.subscriptions))
      .subscribe(result => {
        console.log("sendShipmentNotificationEmail => ", result);
      });
  }

}
