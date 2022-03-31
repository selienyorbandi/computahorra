import Button from "components/Button/Button";
import FormStepper from "components/FormStepper/FormStepper";
import { useCartContext } from "context/CartContext";
import React from "react";
import { useState } from "react";
import styles from "./styles.module.css";

function Register() {
  const {setUserData, setIsUserData} = useCartContext();
  const [user, setUser] = useState({
    name: "",
    surname: "",
    email: "",
    tel: "",
    password: "",
    confirmPassword: ""
  });
  const handleSubmit = e => {
    e.preventDefault();
    setUserData(user);
    setIsUserData(true);
  };

  const handleChange = e => {
    setUser({...user, [e.target.name]: e.target.value});
    
  };
  
  return (
    <div className={styles.registerForm}>
      <FormStepper steps={["Identificate", "Envío", "Forma de Pago"]} />
      <form className={styles.Form} onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nombre">
            <span>Nombre</span>
            <input type="text" name="name" placeholder="Nombre" id="nombre" onChange={e => handleChange(e)}/>
          </label>
          <label htmlFor="apellido">
            <span>Apellido</span>
            <input type="text" name="surname" placeholder="Apellido" id="apellido" onChange={e => handleChange(e)}/>
          </label>
        </div>
        <div>
          <label htmlFor="email">
            <span>Correo Electrónico</span>
            <input type="email" name="email" placeholder="Correo electrónico" id="email" onChange={e => handleChange(e)}/>
          </label>
          <label htmlFor="">
            <span>Teléfono</span>
            <input type="tel" name="tel" placeholder="Teléfono" id="telefono" onChange={e => handleChange(e)}/>
          </label>
        </div>
        <div>
          <label htmlFor="contrasenia">
            <span>Contraseña</span>
            <input type="password" name="password" placeholder="Contraseña" id="contrasenia" onChange={e => handleChange(e)}/>
          </label>
          <label htmlFor="repetirContrasenia">
            <span>Repetir contraseña</span>
            <input type="password" name="confirmPassword" placeholder="Repetir contraseña" id="repetirContrasenia" onChange={e => handleChange(e)}/>
          </label>
        </div>
        <div>
          <Button message={"Registrarme"} primary size="sm"/>
        </div>
      </form>
    </div>
  );
}

export default Register;
