import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faFacebook, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import Button from "components/Button/Button";
import styles from "./styles.module.css";
import { useAuthContext } from "context/AuthContext";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ErrorFeedback from "components/ErrorFeedback/ErrorFeedback";

function Login({redirect=true}) {

  const { logIn, logInGoogle, logInFacebook } = useAuthContext();
  const [user, setUser] = useState({
    email: "",
    password: ""
  });
  const [logError, setLogError] = useState(null);
  const navigate = useNavigate();

  const handleChange = ({target: {name, value}}) => {
    setUser({...user, [name]: value});
  };

  const handleSubmit = async (e,redirect) => {
    e.preventDefault();
    try {
      await logIn(user.email, user.password)
        .then( userCredentials => {
          console.log("Logueado con éxito!!");
          redirect && navigate("/user");
        });
    } catch (error) {
      setLogError(error.code);
      console.error("😵.... hubo un error maquinola, intentá de nuevo 😅 --> \n" + error.message + "\n Tipo de error: "+ logError);
      setTimeout(()=> {
        setLogError(null);
      }, 8000);
    }
  };
  
  const handleGoogleLogin = async () => {
    await logInGoogle();
  };

  const handleFacebookLogin = async () => {
    await logInFacebook(); //todo corregir
  };

  return (
    <div className={styles.registerForm}>
      <form className={styles.Form} onSubmit={handleSubmit}>
        <FontAwesomeIcon icon={faCircleUser} color="#6C2F9A" size="4x"/>
        <h1>Iniciar sesión</h1>
        <div>
          <label htmlFor="email">
            <span>Correo Electrónico *</span>
            <input type="email" name="email" placeholder="Correo electrónico" required onChange={e => handleChange(e)}/>
          </label>
        </div>
        <div>
          <label htmlFor="password">
            <span>Contraseña *</span>
            <input type="password" name="password" placeholder="Contraseña" required onChange={e => handleChange(e)}/>
          </label>
        </div>
        <div className={styles.Form__LogBtn}>
          <Button message={"Iniciar Sesión"} primary size="md" type="submit"/>
          <Link to="/register"><Button message={"Crear cuenta"} size="md"/></Link>
        </div>
        <p>O continúa con tus redes sociales</p>
        <div className={styles.Form__socialMedia}>
          <img src="https://i.postimg.cc/V6QV2gyX/google-Brand.png" width="24" alt="Continuar con Google" onClick={()=> handleGoogleLogin()}></img>
          <FontAwesomeIcon icon={faFacebook} color="#0674DF" size="xl" onClick={()=> handleFacebookLogin()}/>
          <FontAwesomeIcon icon={faTwitter} color="#00A3E2" size="xl"/>
        </div>
        {logError ? <ErrorFeedback code={logError} /> : <></>}
      </form>
    </div>
  );

}

export default Login;