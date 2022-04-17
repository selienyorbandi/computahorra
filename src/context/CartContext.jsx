import { createContext, useState, useContext } from "react";

const CartContext = createContext([]);
export const useCartContext = () => useContext(CartContext);

export function CartContextProvider({children}) {
  const [cartList, setCartList] = useState([]);
  
  const addItem = (item, quantity) => {
    const itemToAdd = Object.assign(item, {quantity: quantity});
    if (isInCart(item.id)) {
      let newQuantity;
      item.stock > quantity + getCurrentQuantity(item.id) ? newQuantity = quantity + getCurrentQuantity(item.id) : newQuantity = item.stock;
      changeQuantity(item.id, newQuantity);
    } else {
      setCartList([...cartList, itemToAdd]);
    }
  };
  
  const buyNow = (item) => {
    clearCart();
    const itemToAdd = Object.assign(item, {quantity: 1});
    setCartList([itemToAdd]);
  };

  const removeItem = itemId => {
    setCartList(cartList.filter(item => item.id !== itemId));
  };

  const isInCart = itemId => {
    return cartList.find(item => item.id === itemId); 
  };

  const clearCart = () => {
    setCartList([]);
  };

  const changeQuantity = (itemId, newQuantity) => {
    const updatedCart = cartList.map(item => item.id === itemId ? {...item, quantity: newQuantity} : item);
    setCartList(updatedCart);
  };

  const totalPrice = () => {
    let total = 0;
    cartList.forEach(item => total += item.quantity * item.price);
    return total;
  };

  const totalQuantity = () => {
    let total = 0;
    cartList.forEach(item => total += item.quantity);
    return total;
  };

  const getCurrentQuantity = itemId => {
    return cartList.find(item => item.id === itemId).quantity;
  };

  return (
    <CartContext.Provider value={{
      cartList,
      addItem,
      removeItem,
      clearCart,
      changeQuantity,
      totalPrice,
      totalQuantity,
      buyNow      
    }}>
      {children}
    </CartContext.Provider>
  );
}
