import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "components/Button/Button";
import ErrorFeedback from "components/ErrorFeedback/ErrorFeedback";
import Loader from "components/Loader/Loader";
import { useAuthContext } from "context/AuthContext";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./styles.module.css";

function Register() {
  const [loading, setLoading] = useState(false);
  const { signUp } = useAuthContext();
  const [user, setUser] = useState({
    name: "",
    surname: "",
    email: "",
    tel: "",
    password: "",
    confirmPassword: ""
  });
  const navigate = useNavigate();
  const [regError, setRegError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    let userData;
    try {
      await signUp(user.email, user.password)
        .then(userCredentials => {
          userData = {
            id: userCredentials.user.uid,
            name: user.name,
            surname: user.surname,
            email: user.email,
            tel: user.tel
          };
          const db = getFirestore();
          setDoc(doc(db, "users", userData.id), userData)
            .then(()=> {
              navigate("/user");
            })
            .catch(err => console.log(err));
        });
    } catch (error) {
      setRegError(error.code);
      /* console.error("😵.... hubo un error maquinola, intentá de nuevo 😅 --> \n" + error.message + "\n Tipo de error: "+ regError); */
      setTimeout(()=> {
        setRegError(null);
      }, 8000);
    }
  };

  const handleChange = ({target: {name, value}}) => {
    setUser({...user, [name]: value});
  };

  return (
    <div className={styles.RegisterForm}>
      <form className={styles.Form} onSubmit={handleSubmit}>
        <FontAwesomeIcon icon={faCircleUser} color="#6C2F9A" size="4x"/>
        <h1>Crea tu cuenta</h1>
        <div>
          <label htmlFor="name">
            <span>Nombre *</span>
            <input type="text" name="name" placeholder="Nombre" id="name" onChange={e => handleChange(e)} required/>
          </label>
          <label htmlFor="surname">
            <span>Apellido *</span>
            <input type="text" name="surname" placeholder="Apellido" id="surname" onChange={e => handleChange(e)} required/>
          </label>
        </div>
        <div>
          <label htmlFor="email">
            <span>Correo Electrónico *</span>
            <input type="email" name="email" placeholder="Correo electrónico" id="email" onChange={e => handleChange(e)} required/>
          </label>
          <label htmlFor="tel">
            <span>Teléfono</span>
            <input type="tel" name="tel" placeholder="Teléfono" id="tel" onChange={e => handleChange(e)}/>
          </label>
        </div>
        <div>
          <label htmlFor="password">
            <span>Contraseña *</span>
            <input type="password" name="password" placeholder="Contraseña" id="password" onChange={e => handleChange(e)} required/>
          </label>
          <label htmlFor="confirmPassword">
            <span>Repetir contraseña *</span>
            <input type="password" name="confirmPassword" placeholder="Repetir contraseña" id="confirmPassword" onChange={e => handleChange(e)} required/>
          </label>
        </div>
        <div className={styles.Form__submit}>
          <Button message={"Registrarme"} primary size="sm" type="submit"/>
          <Link to="/login"><Button message={"Ya tengo cuenta"} size="sm"/></Link>
        </div>
        {regError ? <ErrorFeedback code={regError} /> : <></>}
        {loading ? <Loader/> : <></>}
      </form>
      
    </div>
  );
}

export default Register;
