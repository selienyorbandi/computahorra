import { useCartContext } from "context/CartContext";
import CartItem from "./CartItem/CartItem";
import styles from "./styles.module.css";
import EmptyCart from "./EmptyCart/EmptyCart";
import Summary from "components/Summary/Summary";

function Cart() {
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

export default Cart;