import { IItem } from "./item.interface";

export interface ICartItem extends IItem {
  quantity: number;
}
