import styles from "./styles.module.css";
import notFoundImg from "../../../assets/img/not-found.gif";
import { Link } from "react-router-dom";
import Button from "../../button/Button";

function NotFoundItems({ message }: { message?: string }) {
  return (
    <div className={styles.DoesntExist}>
      <img src={notFoundImg} alt="Producto no encontrado" width="250px" height="140px" />
      <h1>{message ? message : "No se ha encontrado ningún resultado"}</h1>
      <Link to="/">
        <Button message="Volver al inicio" type="primary" />
      </Link>
    </div>
  );
}

export default NotFoundItems;
