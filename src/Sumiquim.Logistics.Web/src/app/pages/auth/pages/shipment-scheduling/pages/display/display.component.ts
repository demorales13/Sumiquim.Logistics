import { Component, OnDestroy, OnInit } from '@angular/core';
import { IShippingScheduling } from '@app/models/backend';
import { NotificationService } from '@app/services/notification.service';
import { ShippingSchedulingNotifierService } from '@app/services/shipping-scheduling-notifier.service';
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
    private notificationService: NotificationService,
    private shippingSchedulingNotifierService: ShippingSchedulingNotifierService
  ) { }

  ngOnDestroy(): void {
    this.subscriptions.next(null);
    this.subscriptions.complete();
  }

  ngOnInit(): void {
    this.today = new Date().getTime();
    this.getShippings(this.today);
    this.subscribeToNotifications();
  }

  subscribeToNotifications(): void {
    this.shippingSchedulingNotifierService.shippingUpdated$.subscribe(() => {
      this.getShippings(this.today);
      this.notificationService.toast('Datos sincronizados.', 'info');
    });
  }

  getShippings(date: number) {
    this.shippingSchedulingService.getByDate(date)
      .pipe(takeUntil(this.subscriptions))
      .subscribe(res => {
        this.shippingLines = res as IShippingScheduling[];
      }, error => {
        console.log("Error => ", error);
        this.notificationService.toast('Se produjo un error. Intente nuevamente.', 'error');
      });
  }

  orderShippingByClientName(a: IShippingScheduling, b: IShippingScheduling) {
    var an = a.client as string;
    var bn = b.client as string;

    if (an < bn) {
      return -1;
    }
    if (an < bn) {
      return 1;
    }
    return 0;
  }

  onDateChanged(event: Value): void {
    this.getShippings(event as number);
  }

}
