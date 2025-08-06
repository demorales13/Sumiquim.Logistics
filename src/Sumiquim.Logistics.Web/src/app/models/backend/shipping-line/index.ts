import { IClient, ICourierCompany, IItem } from "..";

export interface IShipping {
  id: string;
  item: IItem | null;
  client: IClient | null;
  quantity: number;
  batch: string;
  guide?: string;
  courierCompany: ICourierCompany | null;
  status: ShippingStatuses;
  date: number;
  notes: string;
}

export interface IShippingScheduling {
  id: string;
  date: number;
  client: string | null;
  batch: string | null;
  location: string | null;
  item: string | null;
  purchaseOrder: string | null;
  code: string | null;
  quantity: string | null;
  warehouse: string | null;
  address: string | null;
  city: string | null;
  notes?: string | null;
  carrierCompany: string | null;
  guide: string | null;
  salesAdvisor: string;
  incident: string | null;
  schedulingNotification: ShippingStatuses;
  shipmentNotification: ShippingStatuses;
}

export enum ShippingStatuses {
  Pending = 'pending',
  Sent = 'sent',
  Incident = 'incident',
  IncidentSent = 'incidentSent',
}
