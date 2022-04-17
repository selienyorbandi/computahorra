import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ItemCount from "components/ItemCount/ItemCount";
import { formatPrice } from "utils/formatPrice";
import styles from "./styles.module.css";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { useCartContext } from "context/CartContext";
import { Link } from "react-router-dom";

function CartItem({item}) {
  const { title, thumbnail, price, quantity, stock, id }= item;
  const { removeItem } = useCartContext();

  return (
    <div className={styles.CartItem}>
      <Link to={`/item/${item.id}`}>
        <div className={`${styles.CartItem__img} ${styles.CartItem__col}`}>
          <img src={thumbnail} alt={title} />
        </div>
      </Link>
      <Link to={`/item/${item.id}`}>
        <div className={styles.CartItem__title}><h3>{title}</h3></div>
      </Link>
      <div className={styles.CartItem__bRow}>
        <div className={styles.CartItem__price}><p>{formatPrice(price*quantity)}</p></div>
        <div className={`${styles.CartItem__count}`}><ItemCount btn={false} initial={quantity} stock={stock} item={item} /></div>
        <div className={styles.CartItem__delete} onClick={()=> removeItem(id)}><FontAwesomeIcon icon={ faTrashCan }/></div>
      </div>
    </div>
  );
}

export default CartItem;