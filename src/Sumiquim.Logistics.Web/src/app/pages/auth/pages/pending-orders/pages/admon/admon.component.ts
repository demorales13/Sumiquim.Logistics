import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoaderService } from '@app/services/loader.service';
import { NotificationService } from '@app/services/notification.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { PendingOrderService } from '@app/services/pending.service';
import { IPendingOrder } from '@app/models/backend/pending-order/index';
@Component({
  selector: 'app-admon-pending',
  templateUrl: './admon.component.html',
  styleUrls: ['./admon.component.scss']
})
export class AdmonComponent implements OnInit {

  subscriptions = new Subject();
  pendingOrderLines!: IPendingOrder[];

  constructor(private dialog: MatDialog,
    private loaderService: LoaderService,
    private pendingOrderService: PendingOrderService,
    private notificationService: NotificationService) { }

  ngOnInit() {
    this.getPendingOrders();
  }

  getPendingOrders() {
    this.loaderService.show();
    this.pendingOrderService.get()
      .pipe(takeUntil(this.subscriptions))
      .subscribe(res => {
        this.pendingOrderLines = res.sort((a, b) => this.orderPendingOrdersByClientName(a, b));
        this.loaderService.hide();
      }, error => {
        console.log("Error => ", error);
        this.loaderService.hide();
        this.notificationService.toast('Se produjo un error. Intente nuevamente.', 'error');
      });
  }

  orderPendingOrdersByClientName(a: IPendingOrder, b: IPendingOrder) {
    var an = a.client?.name as string;
    var bn = b.client?.name as string;

    if (an < bn) {
      return -1;
    }
    if (an < bn) {
      return 1;
    }
    return 0;
  }

  onPendingOrderClick(pendingOrder: IPendingOrder): void {
    this.notificationService.confirm("", "Está seguro(a) que desea eliminar este registro")
      .then(response => {
        if (response.isConfirmed) {
          this.pendingOrderService.delete(pendingOrder);
        }
      })
  }

}
