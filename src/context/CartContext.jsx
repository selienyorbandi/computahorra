import { createContext, useState, useContext } from "react";

const CartContext = createContext([]);
export const useCartContext = () => useContext(CartContext);

export function CartContextProvider({children}) {
  const [cartList, setCartList] = useState([]);
  
  const addItem = (item, quantity) => {
    const itemToAdd = Object.assign(item, {quantity: quantity});
    isInCart(item.id) ? changeQuantity(item.id, quantity) : setCartList([...cartList, itemToAdd]);
  };

  const buyNow = (item) => {
    clearCart();
    const itemToAdd = Object.assign(item, {quantity: 1});
    setCartList([itemToAdd]);
    //Breve timeout y llevará al checkout de pago directamente (cuando esté hecho)
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

  return (
    <CartContext.Provider value={{
      cartList,
      addItem,
      removeItem,
      clearCart,
      totalPrice,
      buyNow,
      isInCart,
      changeQuantity
    }}>
      {children}
    </CartContext.Provider>
  );
}