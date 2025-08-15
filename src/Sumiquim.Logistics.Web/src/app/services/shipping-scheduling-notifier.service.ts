import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { environment } from '@src/environments/environment';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ShippingSchedulingNotifierService {
    private hubConnection: signalR.HubConnection;
    public shippingUpdated$ = new Subject<void>();

    constructor() {
        this.hubConnection = new signalR.HubConnectionBuilder()
            .withUrl(`${environment.baseUrl}/hubs/shipping-scheduling`)
            .withAutomaticReconnect()
            .build();

        this.hubConnection.on('ShippingSchedulingUpdated', () => {
            this.shippingUpdated$.next();
        });

        this.startConnection();
    }

    private async startConnection(): Promise<void> {
        try {
            await this.hubConnection.start();
            console.log('SignalR conectado');
        } catch (err) {
            console.error('Error al conectar SignalR:', err);
            setTimeout(() => this.startConnection(), 5000);
        }
    }
}