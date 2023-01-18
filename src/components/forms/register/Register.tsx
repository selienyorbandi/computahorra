import { ChangeEvent, FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  isValidEmail,
  isValidName,
  isValidPassword,
  isValidTelephone,
  restrictOnlyAlphabet,
  restrictOnlyNumbersPlus,
} from "../../../utils/validateInputs";

import styles from "./styles.module.css";
import Button from "../../button/Button";
import { useAuthCreateUserWithEmailAndPassword } from "@react-query-firebase/auth";
import { auth, firestore } from "../../../firebase/firebase";
import { ErrorFeedback } from "../../error/ErrorFeedback";
import { useFirestoreCollectionMutation } from "@react-query-firebase/firestore";
import { collection } from "firebase/firestore";
import { hashPassword } from "../../../utils/hashPassword";

function Register() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    surname: "",
    email: "",
    tel: "",
    password: "",
    confirmPassword: "",
  });
  const mutationSignUp = useAuthCreateUserWithEmailAndPassword(auth);
  const usersRef = collection(firestore, "users");
  const mutationPostUser = useFirestoreCollectionMutation(usersRef);

  const handleSignUp = async () => {
    mutationSignUp.mutate(
      {
        email: user.email,
        password: user.password,
      },
      {
        async onSuccess(data) {
          const adaptedUser = await adaptUser();
          mutationPostUser.mutate(
            { ...adaptedUser, uid: data.user.uid },
            {
              onSuccess() {
                navigate("/usuario");
              },
            }
          );
        },
      }
    );
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const [errors, setErrors] = useState({
    name: { is: false, code: "register/not-only-letters" },
    surname: { is: false, code: "register/not-only-letters" },
    email: { is: false, code: "auth/invalid-email" },
    tel: { is: false, code: "auth/invalid-phone-number" },
    password: { is: false, code: "auth/weak-password" },
    confirmPassword: { is: false, code: "register/password-confirm-error" },
  });

  const validateInputOnBlur = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "email") {
      setErrors(prev => ({
        ...prev,
        email: { ...prev.email, is: !isValidEmail(e.target.value) },
      }));
    }
    if (e.target.name === "name" || e.target.name === "surname") {
      const prop = e.target.name;
      setErrors(prev => ({
        ...prev,
        [e.target.name]: { ...prev[prop], is: !isValidName(e.target.value) },
      }));
    }
    if (e.target.name === "tel") {
      setErrors(prev => ({
        ...prev,
        tel: { ...prev.tel, is: !isValidTelephone(e.target.value) },
      }));
    }
    if (e.target.name === "password") {
      setErrors(prev => ({
        ...prev,
        password: { ...prev.password, is: !isValidPassword(e.target.value) },
      }));
    }
    if (e.target.name === "confirmPassword") {
      setErrors(prev => ({
        ...prev,
        confirmPassword: { ...prev.confirmPassword, is: !(user.password === user.confirmPassword) },
      }));
    }
  };

  const areValidInputs = () => {
    let isValid = true;
    Object.values(errors).forEach(obj => (isValid = !obj.is && isValid));
    return isValid;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (areValidInputs()) {
      handleSignUp();
    }
  };

  const adaptUser = async () => {
    const hashedPass = await hashPassword(user.password);
    return {
      ...user,
      password: hashedPass,
      confirmPassword: hashedPass,
    };
  };

  return (
    <div className={styles.RegisterForm}>
      <form className={styles.Form} onSubmit={e => handleSubmit(e)}>
        <FontAwesomeIcon icon={faCircleUser} color="#6C2F9A" size="4x" />
        <h1>Crea tu cuenta</h1>
        <div>
          <label htmlFor="name">
            <span>Nombre *</span>
            <input
              type="text"
              name="name"
              placeholder="Nombre"
              id="name"
              onKeyDown={restrictOnlyAlphabet}
              onChange={e => handleInputChange(e)}
              onBlur={e => validateInputOnBlur(e)}
              className={errors.name.is ? styles.ErrorInput : ""}
            />
            {errors.name.is ? <ErrorFeedback code={errors.name.code} /> : <></>}
          </label>
          <label htmlFor="surname">
            <span>Apellido *</span>
            <input
              type="text"
              name="surname"
              placeholder="Apellido"
              id="surname"
              onKeyDown={restrictOnlyAlphabet}
              onChange={e => handleInputChange(e)}
              onBlur={e => validateInputOnBlur(e)}
              className={errors.surname.is ? styles.ErrorInput : ""}
            />
            {errors.surname.is ? <ErrorFeedback code={errors.surname.code} /> : <></>}
          </label>
        </div>
        <div>
          <label htmlFor="email">
            <span>Correo Electrónico *</span>
            <input
              type="email"
              name="email"
              placeholder="Correo electrónico"
              id="email"
              onChange={e => handleInputChange(e)}
              onBlur={e => validateInputOnBlur(e)}
              className={errors.email.is ? styles.ErrorInput : ""}
            />
            {errors.email.is ? <ErrorFeedback code={errors.email.code} /> : <></>}
          </label>
          <label htmlFor="tel">
            <span>Teléfono</span>
            <input
              type="tel"
              name="tel"
              placeholder="Teléfono"
              id="tel"
              onKeyDown={restrictOnlyNumbersPlus}
              onChange={e => handleInputChange(e)}
              onBlur={e => validateInputOnBlur(e)}
              className={errors.tel.is ? styles.ErrorInput : ""}
            />
            {errors.tel.is ? <ErrorFeedback code={errors.tel.code} /> : <></>}
          </label>
        </div>
        <div>
          <label htmlFor="password">
            <span>Contraseña *</span>
            <input
              type="password"
              name="password"
              placeholder="Contraseña"
              id="password"
              onChange={e => handleInputChange(e)}
              onBlur={e => validateInputOnBlur(e)}
              className={errors.password.is ? styles.ErrorInput : ""}
            />
            {errors.password.is ? <ErrorFeedback code={errors.password.code} /> : <></>}
          </label>
          <label htmlFor="confirmPassword">
            <span>Repetir contraseña *</span>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Repetir contraseña"
              id="confirmPassword"
              onChange={e => handleInputChange(e)}
              onBlur={e => validateInputOnBlur(e)}
              className={errors.confirmPassword.is ? styles.ErrorInput : ""}
            />
            {errors.confirmPassword.is ? (
              <ErrorFeedback code={errors.confirmPassword.code} />
            ) : (
              <></>
            )}
          </label>
        </div>
        <div className={styles.Form__submit}>
          <Button message={"Registrarme"} type="primary" size="sm" />
          <Link to="/login">
            <Button type="secondary" message={"Ya tengo cuenta"} size="sm" />
          </Link>
        </div>
        {mutationSignUp.isError ? <ErrorFeedback code={mutationSignUp.error.code} /> : <></>}
        {mutationPostUser.isError ? <ErrorFeedback code={mutationPostUser.error.code} /> : <></>}
      </form>
    </div>
  );
}

export default Register;
