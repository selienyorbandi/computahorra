import { Link } from "react-router-dom";
import { IItem } from "../../../models/item.interface";
import { formatPrice } from "../../../utils/formatPrice";

import styles from "./styles.module.css";

function Item({ item }: { item: IItem }) {
  const { title, price, thumbnail, id } = item;

  return (
    <li className={styles.Item}>
      <Link to={`/producto/${id}`}>
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
    </li>
  );
}

export default Item;
