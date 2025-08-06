import { Component, OnInit } from '@angular/core';
import { IItem } from '@app/models/backend';
import { ItemService } from '@app/services/item.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {

  fields: string[] = [ "name" ];
  items: IItem[] = [];

  constructor(private itemService: ItemService) { }

  ngOnInit(): void {
  }

  onChange(items: any[]): void {
    this.items = items;
  }

  save():void {
    this.itemService.saveAll(this.items);
    this.items = [];
  }

}
