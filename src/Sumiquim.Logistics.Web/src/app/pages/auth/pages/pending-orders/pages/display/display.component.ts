import { Component, OnInit } from '@angular/core';
import { IPendingOrder } from '@app/models/backend/pending-order';
import { LoaderService } from '@app/services/loader.service';
import { NotificationService } from '@app/services/notification.service';
import { PendingOrderService } from '@app/services/pending.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.scss']
})
export class DisplayComponent implements OnInit {

  subscriptions = new Subject();
  pendingOrderLines!: IPendingOrder[];

  constructor(private loaderService: LoaderService,
    private pendingOrderService: PendingOrderService,
    private notificationService: NotificationService) { }

  ngOnInit() {
    this.getPendingOrders();
  }

  getPendingOrders(){
    this.loaderService.show();
    this.pendingOrderService.get()
      .pipe(takeUntil(this.subscriptions))
      .subscribe(res => {
        this.pendingOrderLines = res.sort((a,b) => this.orderPendingOrdersByClientName(a,b) );
        this.loaderService.hide();
      }, error => {
        console.log("Error => ", error);
        this.loaderService.hide();
        this.notificationService.toast('Se produjo un error. Intente nuevamente.', 'error');
      });
  }

  orderPendingOrdersByClientName( a: IPendingOrder, b: IPendingOrder) {
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

}
