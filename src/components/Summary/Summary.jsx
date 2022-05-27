import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { formatPrice } from "utils/formatPrice";

import { useCartContext } from "context/CartContext";

import Button from "components/Button/Button";
import SummItem from "./SummItem/SummItem";

import styles from "./styles.module.css";

function Summary({ cart = false, checkout = false, order = {}, children }) {
  const { totalPrice, clearCart } = useCartContext();

  return (
    <div className={cart ? styles.Cart__full__details : styles.CheckoutSum}>
      <h2>{cart ? "Resumen" : "Resumen de compra"}</h2>
      {checkout ? <SummItem /> : <></>}
      <h4>
        <strong>Subtotal: </strong> <span>{formatPrice(totalPrice())}</span>
      </h4>
      <h4>
        <strong>Total: </strong> <span>{formatPrice(totalPrice())}</span>
      </h4>
      {cart ? (
        <>
          <Link to="/checkout">
            <Button message="Comprar" primary />
          </Link>
          <Link to="/">
            <Button message="Agregar productos" />
          </Link>
        </>
      ) : (
        <></>
      )}
      {cart ? (
        <p onClick={() => clearCart()}>
          Vaciar carrito <FontAwesomeIcon icon={faTrashAlt} />
        </p>
      ) : (
        <></>
      )}
      <div className={styles.OptionalChild}>{children}</div>
    </div>
  );
}

export default Summary;
