import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { ICartItem } from "../../../../models/cartItem.interface";
import styles from "./styles.module.css";
import ItemCount from "../../../../components/items/item-count/ItemCount";
import { useCartContext } from "../../../../context/CartContext";
import { ICartContext } from "../../../../models/cartcontext.interface";
import { formatPrice } from "../../../../utils/formatPrice";

function CartItem({ item }: { item: ICartItem }) {
  const { title, thumbnail, price, quantity, stock, id } = item;
  const { removeItem } = useCartContext() as ICartContext;

  return (
    <li className={styles.CartItem}>
      <Link to={`/item/${item.id}`}>
        <div className={`${styles.CartItem__img} ${styles.CartItem__col}`}>
          <img src={thumbnail} alt={title} />
        </div>
      </Link>
      <Link to={`/item/${item.id}`}>
        <div className={styles.CartItem__title}>
          <h3>{title}</h3>
        </div>
      </Link>
      <div className={styles.CartItem__bRow}>
        <div className={styles.CartItem__price}>
          <p>{formatPrice(price * quantity)}</p>
        </div>
        <div className={`${styles.CartItem__count}`}>
          <ItemCount btn={false} initial={quantity} stock={stock} item={item} size="md" />
        </div>
        <div className={styles.CartItem__delete} onClick={() => removeItem(id)}>
          <FontAwesomeIcon icon={faTrashCan} />
        </div>
      </div>
    </li>
  );
}
export default CartItem;
