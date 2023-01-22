import { IMercadoPagoItem } from "../models/mercadoPagoItem";
import { ICartItem } from "./../models/cartItem.interface";

function adaptCartItemToMPItem(item: ICartItem): IMercadoPagoItem {
  return {
    title: item.title,
    description: item.description.slice(0, 60) + "...",
    quantity: item.quantity,
    currency_id: "$",
    unit_price: item.price,
  };
}

export function adaptCartItemsToMPItems(items: ICartItem[]): IMercadoPagoItem[] {
  return items.map(item => adaptCartItemToMPItem(item));
}
