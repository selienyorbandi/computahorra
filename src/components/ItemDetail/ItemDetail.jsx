import { formatPrice } from "utils/formatPrice";
import { Link } from "react-router-dom";
import { useCartContext } from "context/CartContext";
import { useState } from "react";
import Button from "components/Button/Button";
import ItemCount from "components/ItemCount/ItemCount";
import styles from "./styles.module.css";

function ItemDetail({item}) {
  const {title, description, img, stock, price} = item;
  const [selectedCount, setSelectedCount] = useState(null);

  const { addItem, buyNow } = useCartContext();

  const onAdd = (quantity) => {
    addItem(item, quantity);
    setSelectedCount(true);
  };
  
  return (
    <div className={styles.ItemDetail}>
      <div className={styles.ItemDetail__img}>
        <img src={img} alt={title}/>
      </div>
      <div className={styles.ItemDetail__data}>
        <h1>{title}</h1>
        <p className={styles.ItemDetail__price}>{formatPrice(price)}</p>
        <p>{description}</p>
        <div className={styles.ItemDetail__btns}>
          {selectedCount ?
            <>
              <Link to="/cart"><Button message={"Ir al carrito y terminar compra"} size="md" primary/></Link>
              <Link to="/"><Button message={"Seguir comprando"} size="md"/></Link>
            </>
            : <>
              <Link to="/cart"><Button message={"Comprar ahora"} onClick={()=>buyNow(item)} primary={true} size="md"/></Link>
              <ItemCount stock={stock} initial={1} onAdd={onAdd} message="Añadir al carrito" primary={false} expanded={true} item={item}/>
            </>
          }
        </div>
      </div>
    </div>
  );
}

export default ItemDetail;