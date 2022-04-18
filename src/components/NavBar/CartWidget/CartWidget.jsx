import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";

import { useCartContext } from "context/CartContext";

import styles from "./styles.module.css";

function CartWidget(){
  const { totalQuantity } = useCartContext();
    
  return(
    <Link to="/cart" className={styles.CartWidget}>
      <FontAwesomeIcon icon={faCartShopping} className={styles.FontAwesomeIcon}/>
      {totalQuantity() > 0 ? <div className={styles.CartWidget__ItemCount}>{totalQuantity()}</div> : <></> }
    </Link>
  );
}
  
export default CartWidget;