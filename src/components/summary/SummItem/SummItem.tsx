import { useCartContext } from "../../../context/CartContext";
import { ICartContext } from "../../../models/cartcontext.interface";
import { formatPrice } from "../../../utils/formatPrice";
import styles from "./styles.module.css";

function SummItem() {
  const { cartList } = useCartContext() as ICartContext;

  return (
    <>
      {cartList.map(({ title, thumbnail, price, quantity, id }) => (
        <div className={styles.SummItem} key={id}>
          <div className={styles.SummItem__img}>
            <img src={thumbnail} alt={title} />
          </div>
          <div className={styles.SummItem__title}>
            <h3>{title}</h3>
          </div>
          <div>
            <div>
              <p>{formatPrice(price * quantity)}</p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default SummItem;
