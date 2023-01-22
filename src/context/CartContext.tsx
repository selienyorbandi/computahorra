import { createContext, useState, useContext } from "react";
import { ICartContext } from "../models/cartcontext.interface";
import { ICartItem } from "../models/cartItem.interface";
import { IItem } from "../models/item.interface";

const CartContext = createContext<ICartContext | null>(null);
export const useCartContext = () => useContext(CartContext);

export function CartContextProvider({ children }: { children: JSX.Element }) {
  const [cartList, setCartList] = useState<ICartItem[] | []>([]);

  const addItem = (item: IItem, quantity: number) => {
    const itemToAdd: ICartItem = {
      ...item,
      quantity,
    };
    if (isInCart(item.id)) {
      let newQuantity;
      item.stock > quantity + getCurrentQuantity(item.id)
        ? (newQuantity = quantity + getCurrentQuantity(item.id))
        : (newQuantity = item.stock);
      changeQuantity(item.id, newQuantity);
    } else {
      setCartList([...cartList, itemToAdd]);
    }
  };

  const buyNow = (item: IItem) => {
    clearCart();
    const itemToAdd = Object.assign(item, { quantity: 1 });
    setCartList([itemToAdd]);
  };

  const removeItem = (itemId: string) => {
    setCartList(cartList.filter(item => item.id !== itemId));
  };

  const isInCart = (itemId: string) => {
    if (cartList.find(item => item.id === itemId)) {
      return true;
    } else {
      return false;
    }
  };

  const clearCart = () => {
    setCartList([]);
  };

  const changeQuantity = (itemId: string, newQuantity: number) => {
    const updatedCart = cartList.map(item =>
      item.id === itemId ? { ...item, quantity: newQuantity } : item
    );
    setCartList(updatedCart);
  };

  const getTotalPrice = () => {
    let total = 0;
    cartList.forEach(item => (total += item.quantity * item.price));
    return total;
  };

  const getTotalQuantity = () => {
    let total = 0;
    cartList.forEach(item => (total += item.quantity));
    return total;
  };

  const getCurrentQuantity = (itemId: string) => {
    const findItem = cartList.find(item => item.id === itemId);
    if (findItem) {
      return findItem.quantity;
    }
    return 0;
  };

  return (
    <CartContext.Provider
      value={{
        cartList,
        addItem,
        buyNow,
        clearCart,
        getCurrentQuantity,
        getTotalPrice,
        getTotalQuantity,
        isInCart,
        removeItem,
        changeQuantity,
      }}>
      {children}
    </CartContext.Provider>
  );
}
