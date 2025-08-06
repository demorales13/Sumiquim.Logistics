import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IShipping } from '@app/models/backend';

@Component({
  selector: 'app-shipping-line-admon',
  templateUrl: './shipping-line-admon.component.html',
  styleUrls: ['./shipping-line-admon.component.scss']
})
export class ShippingLineAdmonComponent implements OnInit {

  @Input() shippingLine!: IShipping;
  @Output() editClicked = new EventEmitter<IShipping>();
  @Output() deleteClicked = new EventEmitter<IShipping>();

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
}
