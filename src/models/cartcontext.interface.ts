import { IItem } from "./item.interface";
import { ICartItem } from "./cartItem.interface";

export interface ICartContext {
  cartList: ICartItem[];
  addItem: (item: IItem, quantity: number) => void;
  buyNow: (item: IItem) => void;
  clearCart: () => void;
  getCurrentQuantity: (itemId: string) => number;
  getTotalPrice: () => number;
  getTotalQuantity: () => number;
  isInCart: (itemId: string) => boolean;
  removeItem: (itemId: string) => void;
  changeQuantity: (itemId: string, newQuantity: number) => void;
}
