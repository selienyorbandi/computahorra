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
  const [isFullfilledForm, setIsFullfiledForm] = useState(false);
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
    if (user.name !== "" && user.surname !== "" && user.email !== "" && user.password !== "" && user.confirmPassword !== "") {
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
        setLoading(false);
        setTimeout(()=> {
          setRegError(null);
        }, 6000);
      }
    } else {
      setRegError("register/empty-fields");
    }
  };

  const handleChange = ({target: {name, value}}) => {
    setUser({...user, [name]: value});
  };

  const handleValidation = () => {
    setRegError(null);
    if (user.password !== user.confirmPassword) {
      setRegError("register/password-confirm-error");
    } else {
      setIsFullfiledForm(true);
    }
  };
  
  return (
    <div className={styles.RegisterForm}>
      <form className={styles.Form} onSubmit={handleSubmit}>
        <FontAwesomeIcon icon={faCircleUser} color="#6C2F9A" size="4x"/>
        <h1>Crea tu cuenta</h1>
        <div>
          <label htmlFor="name">
            <span>Nombre *</span>
            <input type="text" name="name" placeholder="Nombre" id="name" onChange={e => handleChange(e)}/>
          </label>
          <label htmlFor="surname">
            <span>Apellido *</span>
            <input type="text" name="surname" placeholder="Apellido" id="surname" onChange={e => handleChange(e)}/>
          </label>
        </div>
        <div>
          <label htmlFor="email">
            <span>Correo Electrónico *</span>
            <input type="email" name="email" placeholder="Correo electrónico" id="email" onChange={e => handleChange(e)}/>
          </label>
          <label htmlFor="tel">
            <span>Teléfono</span>
            <input type="tel" name="tel" placeholder="Teléfono" id="tel" onChange={e => handleChange(e)}/>
          </label>
        </div>
        <div>
          <label htmlFor="password">
            <span>Contraseña *</span>
            <input type="password" name="password" placeholder="Contraseña" id="password" onChange={e => handleChange(e)}/>
          </label>
          <label htmlFor="confirmPassword">
            <span>Repetir contraseña *</span>
            <input type="password" name="confirmPassword" placeholder="Repetir contraseña" id="confirmPassword" onBlur={()=> handleValidation()} onChange={e => handleChange(e)}/>
          </label>
        </div>
        <div className={styles.Form__submit}>
          <Button message={"Registrarme"} primary size="sm" type="submit" disabl={!isFullfilledForm}/>
          <Link to="/login"><Button message={"Ya tengo cuenta"} size="sm"/></Link>
        </div>
        {regError ? <ErrorFeedback code={regError} /> : <></>}
        {loading ? <Loader/> : <></>}
      </form>
    </div>
  );
}

export default Register;
