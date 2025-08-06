import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IShipping, ShippingStatuses } from '@app/models/backend';
import { LoaderService } from '@app/services/loader.service';
import { NotificationService } from '@app/services/notification.service';
import { ShippingService } from '@app/services/shipping.service';
import { Value } from '@app/shared/controls/date/date.component';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FormComponent } from '../../components/form/form.component';

@Component({
  selector: 'app-admon',
  templateUrl: './admon.component.html',
  styleUrls: ['./admon.component.scss']
})
export class AdmonComponent implements OnInit, OnDestroy {

  shippingLines!: IShipping[];
  date!: number;
  subscriptions = new Subject();

  constructor(private dialog: MatDialog,
    private loaderService: LoaderService,
    private notificationService: NotificationService,
    private shippingService: ShippingService) { }

  ngOnDestroy(): void {
    this.subscriptions.next(null);
    this.subscriptions.complete();
  }

  ngOnInit(): void {
    this.date = new Date().getTime();
    this.getShippings();
  }

  getShippings(){
    this.loaderService.show();
    this.shippingService.getByDate(this.date)
      .pipe(takeUntil(this.subscriptions))
      .subscribe(res => {
        this.shippingLines = res.sort((a,b) => this.orderShippingByClientName(a,b) );
        this.loaderService.hide();
      }, error => {
        console.log("Error => ", error);
        this.loaderService.hide();
        this.notificationService.toast('Se produjo un error. Intente nuevamente.', 'error');
      });
  }

  orderShippingByClientName( a: IShipping, b: IShipping ) {
    var an = a.client?.name as string;
    var bn = b.client?.name as string;

    if ( an < bn ){
      return -1;
    }
    if ( an < bn ){
      return 1;
    }
    return 0;
  }

  onDateChanged(event:Value):void {
    this.date = event as number;
    this.getShippings();
  }

  onAddOrder(): void {
    const dialogRef = this.dialog.open(FormComponent, {
      width: '550px',
      data: {
        date: this.date
      }
    })

    dialogRef.afterClosed()
      .pipe(takeUntil(this.subscriptions))
      .subscribe(result => {
        this.getShippings();
      })
  }

  onShippingEditClick(shipping: IShipping): void {
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

  onShippingDeleteClick(shipping: IShipping): void {
    this.notificationService.confirm("", "Está seguro(a) que desea eliminar este registro")
    .then(response => {
      if(response.isConfirmed){
        this.shippingService.delete(shipping);
      }
    })
  }

}
