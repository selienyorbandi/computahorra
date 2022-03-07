import styles from "./styles.module.css";
import ItemCount from '../../Item/ItemCount/ItemCount';
import Button from "../../Button/Button";

function ItemDetail({item}) {
  const {title, description, img, stock, price} = item;

  return (
    <div className={styles.ItemDetail}>
      <div className={styles.ItemDetail__img}>
        <img src={img} alt={title}/>
      </div>
      <div className={styles.ItemDetail__data}>
        <h1>{title}</h1>
        <p className={styles.ItemDetail__price}>{Intl.NumberFormat("es-AR", {style: 'currency',currency: 'ARS', minimumFractionDigits: 0}).format(price)}</p>
        <p>{description}</p>
        <div className={styles.ItemDetail__btns}>
          <Button message={"Comprar ahora"} onClick={()=>console.log("agregado")} primary={true} size="md"/>
          <ItemCount stock={stock} initial={1} onAdd={()=>console.log("agregado")} message="Añadir al carrito" primary={false} expanded={true}/>
        </div>
      </div>
    </div>
  )
}

export default ItemDetail;