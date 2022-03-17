import styles from "./styles.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleUp, faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import Button from "components/Button/Button";

function ItemCount({stock, initial, onAdd, message, size, primary, expanded}){
  const [quantity, setQuantity] = useState(initial);

  function increaseQuantity(){
    if(quantity < stock) {
      setQuantity(quantity+1);
    }
  }

  function decreaseQuantity(){
    if(quantity > 1) {
      setQuantity(quantity-1);
    }
  }
    
  return(
    <div className={styles.ItemCount}>
      <Button message={message} onClick={()=> onAdd(quantity)} primary={primary} size={size}/>
      {expanded ? stock > 0 ? <div className={styles.ItemCount__stock}>¡Stock disponible!</div> : <div className={`${styles.ItemCount__stock} ${styles.ItemCount__stock_red}`}>Sin stock</div> : <></>}
      <div className={styles.ItemCount__count}>
        <span className={styles.ItemCount__display}>{quantity}</span>
        <div className={styles.ItemCount__controllers}>
          <span onClick={increaseQuantity}><FontAwesomeIcon icon={faAngleUp} size="xs"/></span><span onClick={decreaseQuantity}><FontAwesomeIcon icon={faAngleDown} size="xs"/></span>
        </div>
      </div>
    </div>
  );
}

export default ItemCount;