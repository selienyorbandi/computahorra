import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";

import { useAuthContext } from "context/AuthContext";

import Button from "components/Button/Button";
import ErrorFeedback from "components/ErrorFeedback/ErrorFeedback";

import styles from "./styles.module.css";
import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";

function Login({ redirect = true }) {
  const navigate = useNavigate();

  const { logIn, logInGoogle, logInFacebook, setUserData, userData } =
    useAuthContext();
  const [logError, setLogError] = useState(null);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleChange = ({ target: { name, value } }) => {
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await logIn(user.email, user.password).then((userCredentials) => {
        redirect && navigate("/user");
      });
    } catch (error) {
      setLogError(error.code);
      /* console.error("😵.... hubo un error maquinola, intentá de nuevo 😅 --> \n" + error.message + "\n Tipo de error: "+ logError); */
      setTimeout(() => {
        setLogError(null);
      }, 8000);
    }
  };

  const handleGoogleLogin = async () => {
    await logInGoogle().then((userCredentials) => {
      const db = getFirestore();
      try {
        const queryDb = doc(db, "users", userCredentials.user.uid);
        getDoc(queryDb).then((response) => {
          if (response.data()) {
            setUserData(response.data());
            console.log(userData);
          }
        });
      } catch {
        setUserData({
          id: userCredentials.user.uid,
          name: userCredentials.user.displayName,
          surname: " ",
          email: userCredentials.user.email,
          tel: "",
          adress: "",
        });
        console.log(userData);
        setDoc(doc(db, "users", userCredentials.user.uid), userData)
          .then(() => {
            navigate("/user");
          })
          .catch((err) => console.log(err));
      }
      console.log(userCredentials);
      console.log(userData);
    });
  };

  const handleFacebookLogin = async () => {
    await logInFacebook();
  };

  return (
    <div className={styles.registerForm}>
      <form className={styles.Form} onSubmit={handleSubmit}>
        <FontAwesomeIcon icon={faCircleUser} color="#6C2F9A" size="4x" />
        <h1>Iniciar sesión</h1>
        <div>
          <label htmlFor="email">
            <span>Correo Electrónico *</span>
            <input
              type="email"
              name="email"
              placeholder="Correo electrónico"
              required
              onChange={(e) => handleChange(e)}
            />
          </label>
        </div>
        <div>
          <label htmlFor="password">
            <span>Contraseña *</span>
            <input
              type="password"
              name="password"
              placeholder="Contraseña"
              required
              onChange={(e) => handleChange(e)}
            />
          </label>
        </div>
        <div className={styles.Form__LogBtn}>
          <Button message={"Iniciar Sesión"} primary size="md" type="submit" />
          <Link to="/register">
            <Button message={"Crear cuenta"} size="md" />
          </Link>
        </div>
        <p>O continúa con tus redes sociales</p>
        <div className={styles.Form__socialMedia}>
          <img
            src="https://i.postimg.cc/V6QV2gyX/google-Brand.png"
            width="24"
            alt="Continuar con Google"
            onClick={() => handleGoogleLogin()}
          ></img>
          <FontAwesomeIcon
            icon={faFacebook}
            color="#0674DF"
            size="xl"
            onClick={() => handleFacebookLogin()}
          />
          <FontAwesomeIcon icon={faTwitter} color="#00A3E2" size="xl" />
        </div>
        {logError ? <ErrorFeedback code={logError} /> : <></>}
      </form>
    </div>
  );
}

export default Login;
