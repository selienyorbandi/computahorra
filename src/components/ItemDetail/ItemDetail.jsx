import styles from "./styles.module.css";
import ItemCount from "components/ItemCount/ItemCount";
import Button from "components/Button/Button";
import { useState } from "react";
import { Link } from "react-router-dom";

function ItemDetail({item}) {
  const {title, description, img, stock, price} = item;
  const [selectedCount, setSelectedCount] = useState(null);

  const syncCounter = e => {
    console.log("Agregando el producto al context...");
    setSelectedCount(true);
  };

  return (
    <div className={styles.ItemDetail}>
      <div className={styles.ItemDetail__img}>
        <img src={img} alt={title}/>
      </div>
      <div className={styles.ItemDetail__data}>
        <h1>{title}</h1>
        <p className={styles.ItemDetail__price}>{Intl.NumberFormat("es-AR", {style: "currency",currency: "ARS", minimumFractionDigits: 0}).format(price)}</p>
        <p>{description}</p>
        <div className={styles.ItemDetail__btns}>
          <Link to="/cart"><Button message={"Comprar ahora"} onClick={()=>console.log("Esto agrega 1 unidad del producto al carrito y redirige inmediatamente a la sección detallada del carrito para finalizar la compra")} primary={true} size="md"/></Link>
          {selectedCount ?
            <Link to="/cart"><Button message={"Ir al carrito y terminar compra"} size="md"/></Link>
            :
            <ItemCount stock={stock} initial={1} onAdd={syncCounter} message="Añadir al carrito" primary={false} expanded={true}/>
          }
        </div>
      </div>
    </div>
  );
}

export default ItemDetail;