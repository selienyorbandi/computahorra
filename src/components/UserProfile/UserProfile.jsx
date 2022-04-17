import Button from "components/Button/Button";
import { useAuthContext } from "context/AuthContext";
import styles from "./styles.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import Loader from "components/Loader/Loader";

export default function UserProfile() {
  const { user, logOut, userData } = useAuthContext();

  return (
    userData ? 
      <div className={styles.UserProfile}>
        <h1>Mi perfil <span className={styles.UserProfile__img}><img src={user.photoURL || "https://i.postimg.cc/yNjszmcK/blank-profile-picture-973460-640.png"} alt="Avatar" width="60" heigth="60"></img></span></h1>
        <h2>Nombre y apellido</h2> 
        <p>{`${userData.name} ${userData.surname}` || user.displayName || "Visitante"} <FontAwesomeIcon icon={faEdit}/></p>
        <h2>Correo electrónico </h2>
        <p>{user.email} <FontAwesomeIcon icon={faEdit}/></p>
        <h2>Teléfono</h2>
        <p>{userData.tel || "-------------"} <FontAwesomeIcon icon={faEdit}/></p>
        <h2>Dirección</h2>
        <p>{userData.adress || "-------------"}<FontAwesomeIcon icon={faEdit}/></p>
        <div className={styles.UserProfile__actions}>
          <Button message="Cambiar contraseña"/>
          <Button message="Cerrar sesión" onClick={()=> logOut()}/>
        </div>
      </div>
      : 
      <Loader/>
  );
}