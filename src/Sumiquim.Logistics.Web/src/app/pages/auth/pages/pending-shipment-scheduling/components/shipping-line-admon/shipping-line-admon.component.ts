import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IShippingScheduling } from '@app/models/backend';

@Component({
  selector: 'app-shipping-line-admon',
  templateUrl: './shipping-line-admon.component.html',
  styleUrls: ['./shipping-line-admon.component.scss']
})
export class ShippingLineAdmonComponent implements OnInit {

  @Input() shippingLine!: IShippingScheduling;
  @Output() editClicked = new EventEmitter<IShippingScheduling>();
  @Output() deleteClicked = new EventEmitter<IShippingScheduling>();
  @Output() incidentClicked = new EventEmitter<IShippingScheduling>();

  viewFooter!:boolean;

  constructor() { }

  ngOnInit(): void {
  }

  onViewFooter():void {
    this.viewFooter = !this.viewFooter;
  }

  onDeleteClick():void {
    this.deleteClicked.emit(this.shippingLine);
  }

  onEditClick():void {
    this.editClicked.emit(this.shippingLine);
  }

  onIncidentClick():void { 
    this.incidentClicked.emit(this.shippingLine);
  }
}
