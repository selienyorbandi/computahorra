import { Link } from "react-router-dom";
import ItemCount from "./ItemCount/ItemCount";
import styles from "./styles.module.css";

function Item({title, price, thumbnail, stock, id}) {
    
  function addItem(amount, stock){
    if (amount <= stock)
      console.log(`${amount} ${title} en el carrito`);
  }

  return(
    
    <div className={styles.Item}>
      <div className={styles.Item__imgContainer}>
        <Link to={`/item/${id}`}>
          <img src={thumbnail} alt={title} className={styles.Item__img} width="225" height="225"/>
        </Link>
      </div>
      <span className={styles.Item__price}>{Intl.NumberFormat("es-AR", {style: "currency",currency: "ARS", minimumFractionDigits: 0}).format(price)}</span>
      <Link to={`/item/${id}`}>
        <h2 className={styles.Item__title}>{title}</h2>
      </Link>
      <ItemCount stock={stock} initial={1} onAdd={addItem} message="Añadir al carrito" size="sm" primary={true}/>
    </div>
  );
}

export default Item;