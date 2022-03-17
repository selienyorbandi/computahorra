import Button from "components/Button/Button";
import { useCartContext } from "context/CartContext";
import { Link } from "react-router-dom";
import { formatPrice } from "utils/formatPrice";
import styles from "./styles.module.css";

function Item({item}) {
  const {title, price, thumbnail, id} = item;
  const { addItem } = useCartContext();

  return(
    
    <div className={styles.Item}>
      <div className={styles.Item__imgContainer}>
        <Link to={`/item/${id}`}>
          <img src={thumbnail} alt={title} className={styles.Item__img} width="225" height="225"/>
        </Link>
      </div>
      <span className={styles.Item__price}>{formatPrice(price)}</span>
      <Link to={`/item/${id}`}>
        <h2 className={styles.Item__title}>{title}</h2>
      </Link>
      <div className={styles.Item__Btns}>
        <Link to="/cart">
          <Button message={"Comprar ahora"} onClick={()=> addItem(item,1)} primary={true}/>
        </Link>
        <Link to={`/item/${id}`}>
          <Button message={"Ver detalle"} primary={false}/>
        </Link>
      </div>
    </div>
  );
}

export default Item;