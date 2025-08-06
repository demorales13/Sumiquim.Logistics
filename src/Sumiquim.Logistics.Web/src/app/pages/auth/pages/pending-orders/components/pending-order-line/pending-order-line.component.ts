import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IPendingOrder } from '../../../../../../models/backend/pending-order/index';

@Component({
  selector: 'app-pending-order-line',
  templateUrl: './pending-order-line.component.html',
  styleUrls: ['./pending-order-line.component.scss']
})
export class PendingOrderLineComponent implements OnInit {

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
