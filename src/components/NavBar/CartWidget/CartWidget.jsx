import styles from "./styles.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";

function CartWidget({totalItems}){
    return(
        <div className={styles.CartWidget}>
            <FontAwesomeIcon icon={faCartShopping} className={styles.FontAwesomeIcon}/>
            <div className={styles.CartWidget__ItemCount}>{totalItems}</div>
        </div>
    );

}

export default CartWidget;