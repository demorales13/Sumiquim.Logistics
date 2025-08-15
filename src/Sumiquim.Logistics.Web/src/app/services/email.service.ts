import { Injectable } from '@angular/core';
import { AppHttpServiceResponse } from '@app/classes/AppHttpServiceResponse.class';
import { IAppHttpResponse, ITrackHttpError } from '@app/models/backend';
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailService extends AppHttpServiceResponse {

  sendShipmentNotificationEmail(): Observable<IAppHttpResponse<boolean> | ITrackHttpError> {
    var url = `${this.emailSenderBaseUrl}/shipping-scheduling/email/shipment`;
    return this.http
      .post<IAppHttpResponse<boolean>>(url, {})
      .pipe(catchError((error) => this.handleHttpError(error)));
  }

}
