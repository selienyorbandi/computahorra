import { useCartContext } from "../../../../context/CartContext";
import { ICartContext } from "../../../../models/cartcontext.interface";
import { ICartItem } from "../../../../models/cartItem.interface";
import CartItem from "../cart-item/CartItem";
import styles from "./styles.module.css";

function CartList() {
  const { cartList } = useCartContext() as ICartContext;

  return (
    <ul className={styles.Cart__List}>
      {cartList.map((item: ICartItem, i: number) => (
        <span key={`CartItem#${item.id}#${i}`}>
          <CartItem item={item} />
          {i + 1 < cartList.length ? <hr /> : <></>}
        </span>
      ))}
    </ul>
  );
}

export default CartList;
