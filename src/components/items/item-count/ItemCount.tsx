import { useState } from "react";
import { faAngleUp, faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import styles from "./styles.module.css";
import { useCartContext } from "../../../context/CartContext";
import { ICartContext } from "../../../models/cartcontext.interface";
import { IItem } from "../../../models/item.interface";
import Button from "../../button/Button";

interface ITemCountProps {
  stock: number;
  initial: number;
  message?: string;
  size?: string;
  expanded?: boolean;
  btn?: boolean;
  item: IItem;
  onAddToCart?: () => void;
}

function ItemCount({
  stock,
  initial,
  message,
  size,
  expanded,
  btn = true,
  item,
  onAddToCart,
}: ITemCountProps) {
  const [quantity, setQuantity] = useState(initial);
  const { changeQuantity, addItem } = useCartContext() as ICartContext;

  const increaseQuantity = () => {
    if (quantity < stock) {
      if (!btn) {
        changeQuantity(item.id, quantity + 1);
      }
      setQuantity(quantity + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      if (!btn) {
        changeQuantity(item.id, quantity - 1);
      }
      setQuantity(quantity - 1);
    }
  };

  const onAdd = () => {
    addItem(item, quantity);
    if (onAddToCart) {
      onAddToCart();
    }
  };

  return (
    <div className={styles.ItemCount}>
      {btn && message ? (
        <Button message={message} onClick={onAdd} type="secondary" size={size} />
      ) : (
        <></>
      )}
      {expanded ? (
        stock > 0 ? (
          <div className={styles.ItemCount__stock}>¡Stock disponible!</div>
        ) : (
          <div className={`${styles.ItemCount__stock} ${styles.ItemCount__stock_red}`}>
            Sin stock
          </div>
        )
      ) : (
        <></>
      )}
      <div className={styles.ItemCount__count}>
        <span className={styles.ItemCount__display}>{quantity}</span>
        <div className={styles.ItemCount__controllers}>
          <span onClick={increaseQuantity}>
            <FontAwesomeIcon icon={faAngleUp} size="xs" />
          </span>
          <span onClick={decreaseQuantity}>
            <FontAwesomeIcon icon={faAngleDown} size="xs" />
          </span>
        </div>
      </div>
    </div>
  );
}

export default ItemCount;
