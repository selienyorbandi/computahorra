import { faAngleUp, faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCartContext } from "context/CartContext";
import { useState, useEffect } from "react";
import Button from "components/Button/Button";
import styles from "./styles.module.css";

function ItemCount({stock, initial, onAdd, message, size, primary, expanded, btn = true, item}){
  const [quantity, setQuantity] = useState(initial);
  const { changeQuantity, isInCart, cartList } = useCartContext();

  function increaseQuantity(){
    if(quantity < stock) {
      if(!btn) {
        changeQuantity(item.id, quantity+1);
      }
      setQuantity(quantity+1);
    }
  }

  function decreaseQuantity(){
    if(quantity > 1) {
      if(!btn) {
        changeQuantity(item.id, quantity-1);
      }
      setQuantity(quantity-1);
    }
  }
    
  useEffect(() => {
    if (isInCart(item.id)) {
      setQuantity(cartList.find(i => i.id === item.id).quantity);
    }
  }, [cartList, isInCart, item.id]);

  return(
    <div className={styles.ItemCount}>
      {btn ? <Button message={isInCart(item.id) ? "Actualizar cantidad": message } onClick={()=> onAdd(quantity)} primary={primary} size={size}/> : <></>}
      {expanded ? stock > 0 ? isInCart(item.id) ? <div className={styles.ItemCount__stock}>¡Ya tienes {cartList.find(i => i.id === item.id).quantity} en tu carrito!</div> : <div className={styles.ItemCount__stock}>¡Stock disponible!</div> : <div className={`${styles.ItemCount__stock} ${styles.ItemCount__stock_red}`}>Sin stock</div> : <></>}
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