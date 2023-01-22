import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { useCartContext } from "../../context/CartContext";
import { formatPrice } from "../../utils/formatPrice";
import { ICartContext } from "../../models/cartcontext.interface";
import Button from "../button/Button";
import SummItem from "./SummItem/SummItem";

type Props = {
  cart: boolean;
  checkout: boolean;
  children?: JSX.Element;
};

function Summary({ cart = false, checkout = false, children }: Props) {
  const { getTotalPrice, clearCart } = useCartContext() as ICartContext;

  return (
    <div className={cart ? styles.Cart__full__details : styles.CheckoutSum}>
      <h2>{cart ? "Resumen" : "Resumen de compra"}</h2>
      {checkout ? <SummItem /> : <></>}
      <h4>
        <strong>Subtotal: </strong> <span>{formatPrice(getTotalPrice())}</span>
      </h4>
      <h4>
        <strong>Total: </strong> <span>{formatPrice(getTotalPrice())}</span>
      </h4>
      {cart ? (
        <>
          <Link to="/checkout">
            <Button message="Comprar" type="primary" />
          </Link>
          <Link to="/">
            <Button message="Agregar productos" type="secondary" />
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
