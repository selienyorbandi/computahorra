import { Link } from "react-router-dom";
import Button from "../../../../components/button/Button";
import styles from "./styles.module.css";
import cartCto from "../../../../assets/img/cartCTA.png";

function EmptyCart() {
  return (
    <div className={styles.Cart__empty}>
      <h1 className={styles.Cart__empty__Title}>No tiene productos en su carrito</h1>
      <img src={cartCto} alt="Agregue los productos que desea"></img>
      <p>Haga espacio para sus nuevos productos</p>
      <Link to="/">
        <Button message="Agregar productos" type="primary" />
      </Link>
    </div>
  );
}

export default EmptyCart;
