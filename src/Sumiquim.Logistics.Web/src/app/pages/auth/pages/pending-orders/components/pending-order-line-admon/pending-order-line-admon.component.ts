import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IPendingOrder } from '../../../../../../models/backend/pending-order/index';

@Component({
  selector: 'app-pending-order-line-admon',
  templateUrl: './pending-order-line-admon.component.html',
  styleUrls: ['./pending-order-line-admon.component.scss']
})
export class PendingOrderLineAdmonComponent implements OnInit {

  @Input() pendingOrder!: IPendingOrder;
  @Output() clicked = new EventEmitter<IPendingOrder>();

  viewFooter!:boolean;

  constructor() { }

  ngOnInit(): void {
  }

  onClick():void {
    this.clicked.emit(this.pendingOrder);
  }

}
