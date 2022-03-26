import Button from "components/Button/Button";
import { useCartContext } from "context/CartContext";
import { Link } from "react-router-dom";
import { formatPrice } from "utils/formatPrice";
import CartItem from "./CartItem/CartItem";
import styles from "./styles.module.css";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


function Cart() {
  const { cartList, clearCart, totalPrice } = useCartContext();

  return (
    <div className={styles.Cart}>
      {
        cartList.length > 0? 
          <>
            <h1>Carrito de compras</h1>
            <div className={styles.Cart__full}>
              <div className={styles.Cart__items}>
                {cartList.map(item => <CartItem item={item} key={item.id}/>)}
              </div>
              <div className={styles.Cart__full__details}>
                <h2>Resúmen</h2>
                <h4><strong>Subtotal: </strong> <span>{formatPrice(totalPrice())}</span></h4>
                <h5>Envío: <span>gratis</span></h5>
                <h4><strong>Total: </strong> <span>{formatPrice(totalPrice())}</span></h4>
                <Button message="Finalizar compra" primary/>
                <Link to="/"><Button message="Agregar productos"/></Link>
                <p onClick={clearCart}>Vaciar carrito <FontAwesomeIcon icon={ faTrashCan }/></p>
              </div>
            </div>
          </>
          :
          <div className={styles.Cart__empty}>
            <h1>Carrito de compras</h1>
            <p>No hay nada en tu carrito. ¡Nuestros productos te esperan!</p>
            <Link to="/"><Button message="Agregar productos" primary/></Link>
          </div>
      }
    </div>
  );
}

export default Cart;