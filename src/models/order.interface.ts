import { IItem } from "./item.interface";

export interface IOrder {
  id: string;
  buyerId: string;
  date: string;
  items: IItem[];
  total: number;
}
