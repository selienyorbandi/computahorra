import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";

import styles from "./styles.module.css";
import Button from "../../button/Button";
import { FormEvent, useState } from "react";
import {
  useAuthSignInWithEmailAndPassword,
  useAuthSignInWithPopup,
} from "@react-query-firebase/auth";
import { auth } from "../../../firebase/firebase";
import { FacebookAuthProvider, GoogleAuthProvider, TwitterAuthProvider } from "firebase/auth";
import { ErrorFeedback } from "../../error/ErrorFeedback";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const mutationAuthEmail = useAuthSignInWithEmailAndPassword(auth, {
    onError(error) {
      console.log(error);
    },
  });
  const mutationAuthExternalProvider = useAuthSignInWithPopup(auth, {
    onError(error) {
      console.log(error);
    },
  });

  const onSignIn = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutationAuthEmail.mutate({ email, password });
  };

  const onSignWithExternalProvider = (providerType: string) => {
    const handleProviderType = () => {
      if (providerType === "google") return new GoogleAuthProvider();
      if (providerType === "facebook") return new FacebookAuthProvider();
      if (providerType === "twitter") return new TwitterAuthProvider();
      return null;
    };

    const provider = handleProviderType();
    if (provider) {
      mutationAuthExternalProvider.mutate({
        provider: provider,
      });
    }
  };

  return (
    <div className={styles.registerForm}>
      <form className={styles.Form} onSubmit={e => onSignIn(e)}>
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
              value={email}
              onChange={e => setEmail(e.target.value)}
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
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </label>
        </div>
        <div className={styles.Form__LogBtn}>
          <Button message={"Iniciar Sesión"} type="primary" size="md" />
          <Link to="/register">
            <Button message={"Crear cuenta"} size="md" type="secondary" />
          </Link>
        </div>
        <p>O continúa con tus redes sociales</p>
        <div className={styles.Form__socialMedia}>
          <img
            src="https://i.postimg.cc/V6QV2gyX/google-Brand.png"
            width="24"
            alt="Continuar con Google"
            onClick={() => onSignWithExternalProvider("google")}
          />
          <FontAwesomeIcon
            icon={faFacebook}
            color="#0674DF"
            size="xl"
            onClick={() => onSignWithExternalProvider("facebook")}
          />
          <FontAwesomeIcon
            icon={faTwitter}
            color="#00A3E2"
            size="xl"
            onClick={() => onSignWithExternalProvider("twitter")}
          />
        </div>
        {mutationAuthEmail.isError && <ErrorFeedback code={mutationAuthEmail.error.code} />}
      </form>

      {mutationAuthEmail.isSuccess && auth.currentUser && (
        <h3>{auth.currentUser.email} logueado con exito</h3>
      )}
    </div>
  );
}

export default Login;
