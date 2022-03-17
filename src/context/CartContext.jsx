import { createContext, useState, useContext } from "react";

const CartContext = createContext([]);
export const useCartContext = () => useContext(CartContext);

export function CartContextProvider({children}) {
  const [cartList, setCartList] = useState([]);

  const addItem = (item, quantity) => {
    const itemToAdd = Object.assign(item, {quantity: quantity});
    isInCart(item.id) ? console.log("Ya está agregado en el carrito") : setCartList([...cartList, itemToAdd]);
  };

  const removeItem = itemId => {
    setCartList(cartList.filter(item => item.id !== itemId));
  };

  const isInCart = (itemId) => {
    return cartList.find(item => item.id === itemId); 
  };

  const clearCart = () => {
    setCartList([]);
  };

  return (
    <CartContext.Provider value={{
      cartList,
      addItem,
      removeItem,
      clearCart
    }}>
      {children}
    </CartContext.Provider>
  );
}
