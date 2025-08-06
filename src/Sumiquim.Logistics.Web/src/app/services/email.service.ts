import { Injectable } from '@angular/core';
import { AppHttpServiceResponse } from '@app/classes/AppHttpServiceResponse.class';
import { IAppHttpResponse, ITrackHttpError } from '@app/models/backend';
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailService extends AppHttpServiceResponse {

  sendScheduledNotificationEmail(): Observable<IAppHttpResponse<boolean> | ITrackHttpError> {
    var url = `${this.emailSenderBaseUrl}/order/email/scheduled`;

    var body = {  
      date: new Date()
    }

    return this.http
      .post<IAppHttpResponse<boolean>>(url, body)
      .pipe(catchError((error) => this.handleHttpError(error)));
  }

  sendShipmentNotificationEmail(): Observable<IAppHttpResponse<boolean> | ITrackHttpError> {
    var url = `${this.emailSenderBaseUrl}/order/email/shipment`;

    var body = {  
      date: new Date()
    }

    return this.http
      .post<IAppHttpResponse<boolean>>(url, body)
      .pipe(catchError((error) => this.handleHttpError(error)));
  }

}
