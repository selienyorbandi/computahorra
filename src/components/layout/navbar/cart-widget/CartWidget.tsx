import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";

import { useCartContext } from "../../../../context/CartContext";

import styles from "./styles.module.css";
import { ICartContext } from "../../../../models/cartcontext.interface";

function CartWidget() {
  const { getTotalQuantity, cartList } = useCartContext() as ICartContext;

  return (
    <Link to="/carrito-de-compras" className={styles.CartWidget}>
      <FontAwesomeIcon icon={faCartShopping} className={styles.FontAwesomeIcon} />
      {cartList && getTotalQuantity() > 0 ? (
        <div className={styles.CartWidget__ItemCount}>{getTotalQuantity()}</div>
      ) : (
        <></>
      )}
    </Link>
  );
}

export default CartWidget;
