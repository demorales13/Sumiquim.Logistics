import { Component, Input, OnInit } from '@angular/core';
import { IShippingScheduling } from '@app/models/backend';

@Component({
  selector: 'app-shipping-line',
  templateUrl: './shipping-line.component.html',
  styleUrls: ['./shipping-line.component.scss']
})
export class ShippingLineComponent implements OnInit {

  @Input() shippingLine!: IShippingScheduling;

  viewFooter!:boolean;

  get shippingLineBackground() : string { 
    if (this.shippingLine.carrierCompany?.toLowerCase() == "sumiquim"){
      return "sumiquim";
    }

    if (this.shippingLine.carrierCompany?.toLowerCase() == "aldia paqueteo"){
      return "aldia-paqueteo";
    }

    if (this.shippingLine.carrierCompany?.toLowerCase() == "aldia masivo"){
      return "aldia-masivo";
    }

    if (this.shippingLine.carrierCompany?.toLowerCase() == "unilever"){
      return "unilever";
    }

    return "";
  }

  constructor() { }

  ngOnInit(): void {
  }

  onViewFooter():void {
    this.viewFooter = !this.viewFooter;
  }

}
