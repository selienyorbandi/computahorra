import { Link } from "react-router-dom";

import Button from "components/Button/Button";

import styles from "./styles.module.css";

function EmptyCart() {
  return (
    <div className={styles.Cart__empty}>
      <h1>No tienes productos en tu carrito</h1>
      <img src="https://i.postimg.cc/D0Skyfg1/clip-delivery-in-time-satisfied-customer.png" alt="Agregue los productos que desea"></img>
      <p>Nuestros productos te esperan</p>
      <Link to="/"><Button message="Agregar productos" primary/></Link>
    </div>
  );
}

export default EmptyCart;