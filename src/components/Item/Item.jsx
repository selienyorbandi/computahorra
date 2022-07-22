import { Link } from "react-router-dom";
import { formatPrice } from "utils/formatPrice";

import styles from "./styles.module.css";

function Item({ item }) {
  const { title, price, thumbnail, id } = item;

  return (
    <div className={styles.Item}>
      <Link to={`/item/${id}`}>
        <div className={styles.Item__imgContainer}>
          <img
            src={thumbnail}
            alt={title}
            className={styles.Item__img}
            width="225"
            height="225"
            loading="lazy"
          />
        </div>
        <span className={styles.Item__price}>{formatPrice(price)}</span>
        <h2 className={styles.Item__title}>{title}</h2>
      </Link>
    </div>
  );
}

export default Item;
