import { useState } from "react";
import { Link } from "react-router-dom";

import styles from "./styles.module.css";
import { IItem } from "../../../models/item.interface";
import { useCartContext } from "../../../context/CartContext";
import { formatPrice } from "../../../utils/formatPrice";
import Button from "../../button/Button";
import ItemCount from "../item-count/ItemCount";
import { ICartContext } from "../../../models/cartcontext.interface";

function ItemDetail({ item }: { item: IItem }) {
  const { title, description, img, stock, price } = item;
  const [selectedCount, setSelectedCount] = useState<boolean | null>(null);

  const onAddToCart = () => {
    setSelectedCount(true);
  };

  const { buyNow } = useCartContext() as ICartContext;

  return (
    <div className={styles.ItemDetail}>
      <div className={styles.ItemDetail__img}>
        <img src={img} alt={title} />
      </div>
      <div className={styles.ItemDetail__data}>
        <h1>{title}</h1>
        <p className={styles.ItemDetail__price}>{formatPrice(price)}</p>
        <p>{description}</p>
        <div className={styles.ItemDetail__btns}>
          {selectedCount ? (
            <>
              <Link to="/carrito">
                <Button message={"Ir al carrito y terminar compra"} size="md" type="primary" />
              </Link>
              <Link to="/">
                <Button message={"Seguir comprando"} size="md" type="secondary" />
              </Link>
            </>
          ) : (
            <>
              <Link to="/carrito">
                <Button
                  message={"Comprar ahora"}
                  onClick={() => buyNow(item)}
                  type="primary"
                  size="md"
                />
              </Link>
              <ItemCount
                stock={stock}
                initial={1}
                message="Añadir al carrito"
                expanded={true}
                item={item}
                size="sm"
                onAddToCart={onAddToCart}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default ItemDetail;
