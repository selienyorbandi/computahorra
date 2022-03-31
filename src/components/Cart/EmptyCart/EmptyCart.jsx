import Button from "components/Button/Button";
import React from "react";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";

function EmptyCart() {
  return (
    <div className={styles.Cart__empty}>
      <h1>No tienes productos en tu carrito</h1>
      <p>¡Nuestros productos te esperan!</p>
      <Link to="/"><Button message="Agregar productos" primary/></Link>
    </div>
  );
}

export default EmptyCart;