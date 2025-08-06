import { Component, OnDestroy, OnInit } from '@angular/core';
import { IShipping, IShippingScheduling } from '@app/models/backend';
import { LoaderService } from '@app/services/loader.service';
import { NotificationService } from '@app/services/notification.service';
import { ShippingSchedulingService } from '@app/services/shipping-scheduling.service';
import { Value } from '@app/shared/controls/date/date.component';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.scss']
})
export class DisplayComponent implements OnInit, OnDestroy {

  shippingLines!: IShippingScheduling[];
  today!: number;
  subscriptions = new Subject();

  constructor(
    private shippingSchedulingService: ShippingSchedulingService,
    private loaderService: LoaderService,
    private notificationService: NotificationService,) { }


  ngOnDestroy(): void {
    this.subscriptions.next(null);
    this.subscriptions.complete();
  }

  ngOnInit(): void {
    this.today = new Date().getTime();
    this.getShippings(this.today);
  }

  getShippings(date: number){
    this.shippingSchedulingService.getByDate(date)
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

  orderShippingByClientName( a: IShippingScheduling, b: IShippingScheduling ) {
    var an = a.client as string;
    var bn = b.client as string;

    if ( an < bn ){
      return -1;
    }
    if ( an < bn ){
      return 1;
    }
    return 0;
  }

  onDateChanged(event:Value):void {
    this.getShippings(event as number);
  }

}
