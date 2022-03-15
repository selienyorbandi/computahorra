import Button from "components/Button/Button";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";

function Item({title, price, thumbnail, stock, id}) {

  return(
    
    <div className={styles.Item}>
      <div className={styles.Item__imgContainer}>
        <Link to={`/item/${id}`}>
          <img src={thumbnail} alt={title} className={styles.Item__img} width="225" height="225"/>
        </Link>
      </div>
      <span className={styles.Item__price}>{Intl.NumberFormat("es-AR", {style: "currency",currency: "ARS", minimumFractionDigits: 0}).format(price)}</span>
      <Link to={`/item/${id}`}>
        <h2 className={styles.Item__title}>{title}</h2>
      </Link>
      <div className={styles.Item__Btns}>
        <Link to="/cart">
          <Button message={"Comprar ahora"} onClick={()=>console.log("Esto agrega 1 unidad del producto al carrito, la confirma y redirige a la sección de compra")} primary={true}/>
        </Link>
        <Link to={`/item/${id}`}>
          <Button message={"Ver detalle"} primary={false}/>
        </Link>
      </div>
    </div>
  );
}

export default Item;