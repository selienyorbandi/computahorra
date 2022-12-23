import Summary from "../../components/summary/Summary";
import { useCartContext } from "../../context/CartContext";
import { ICartContext } from "../../models/cartcontext.interface";
import CartList from "./components/cart-list/CartList";
import EmptyCart from "./components/empty-cart/EmptyCart";
import styles from "./styles.module.css";

function Cart() {
  const { cartList } = useCartContext() as ICartContext;

  return (
    <section className={styles.Cart}>
      {cartList.length ? (
        <>
          <h1 className={styles.Cart__Title}>Carrito de compras</h1>
          <div className={styles.Cart__Full}>
            <CartList />
            <Summary cart checkout={false} />
          </div>
        </>
      ) : (
        <EmptyCart />
      )}
    </section>
  );
}

export default Cart;
