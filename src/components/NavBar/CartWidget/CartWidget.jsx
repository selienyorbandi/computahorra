import styles from "./styles.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useCartContext } from "context/CartContext";

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