import { useCartContext } from "context/CartContext";

import CartItem from "../../components/CartItem/CartItem";
import EmptyCart from "../../components/EmptyCart/EmptyCart";
import Summary from "components/Summary/Summary";

import styles from "./styles.module.css";

function CartContainer() {
  
  const { cartList } = useCartContext();
  
  return (
    <div className={styles.Cart}>
      {
        cartList.length > 0? 
          <>
            <h1>Carrito de compras</h1>
            <div className={styles.Cart__full}>
              <div className={styles.Cart__items}>
                {cartList.map(item => <CartItem item={item} key={item.id}/>)}
              </div>
              <Summary cart/>
            </div>
          </>
          :
          <EmptyCart/>
      }
    </div>
  );
}

export default CartContainer;