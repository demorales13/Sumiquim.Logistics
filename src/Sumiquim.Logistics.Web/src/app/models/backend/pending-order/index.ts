import { IClient } from "../client";
import { IItem } from "../item";

export interface IPendingOrder {
    id: string;
    item: IItem | null;
    client: IClient | null;
    quantity: number;
    notes: string;
  }