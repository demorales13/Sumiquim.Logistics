import { Component, OnInit } from '@angular/core';
import { IClient } from '@app/models/backend';
import { ClientService } from '@app/services/client.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {

  fields: string[] = [ "name" ];
  clients: IClient[] = [];

  constructor(private clientService: ClientService) { }

  ngOnInit(): void {
  }

  onChange(clients: any[]): void {
    this.clients = clients;
  }

  save():void {
    this.clientService.saveAll(this.clients);
    this.clients = [];
  }

}
