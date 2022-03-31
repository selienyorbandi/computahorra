import Button from "components/Button/Button";
import { useCartContext } from "context/CartContext";
import React from "react";
import { Link } from "react-router-dom";
import { formatPrice } from "utils/formatPrice";
import styles from "./styles.module.css";
import SummItem from "./SummItem/SummItem";

function Summary({cart = false, checkout = false, order = {}}) {
  const {  totalPrice } = useCartContext();

  return (
    <div className={cart ? styles.Cart__full__details : styles.CheckoutSum}>
      <h2>{cart ? "Resumen" : "Resumen de compra"}</h2>
      {checkout ? <SummItem/> : <></>}
      <h4><strong>Subtotal: </strong> <span>{formatPrice(totalPrice())}</span></h4>
      <h5>Envío: <span>gratis</span></h5>
      <h4><strong>Total: </strong> <span>{formatPrice(totalPrice())}</span></h4>
      {
        cart ? 
          <>
            <Link to="/checkout"><Button message="Finalizar compra" primary/></Link>
            <Link to="/"><Button message="Agregar productos"/></Link>
          </>
          : <></>
      }
    </div>
  );
}

export default Summary;