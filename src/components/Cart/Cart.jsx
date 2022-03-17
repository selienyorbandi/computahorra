import Button from "components/Button/Button";
import { useCartContext } from "context/CartContext";
import styles from "./styles.module.css";

function Cart() {
  const { cartList } = useCartContext();
  
  return (
    <div className={styles.Cart}>
      <h1>Carrito de compras</h1>
      <Button message="Ver CartList en consola" onClick={()=>console.log(cartList)} primary></Button>
    </div>
  );
}

export default Cart;