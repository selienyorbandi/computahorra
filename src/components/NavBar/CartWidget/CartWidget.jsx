import styles from "./styles.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useCartContext } from "context/CartContext";
import { countTotalQuantity } from "utils/countTotalQuantity";

function CartWidget(){
  const { cartList } = useCartContext();
    
  return(
    <Link to="/cart" className={styles.CartWidget}>
      <FontAwesomeIcon icon={faCartShopping} className={styles.FontAwesomeIcon}/>
      {cartList.length ? <div className={styles.CartWidget__ItemCount}>{countTotalQuantity(cartList)}</div> : <></> }
    </Link>
  );
    
}
  
export default CartWidget;