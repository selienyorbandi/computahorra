import styles from "./styles.module.css";

export default function ErrorFeedback({code}) {
  const MESSAGES = {
    "auth/email-already-in-use": "Debe ingresar un correo electrónico válido",
    "auth/weak-password": "Debe ingresar una contraseña de al menos 6 caracteres",
    "auth/invalid-phone-number": "Ingrese un teléfono de la forma +54 9 XXX XXX XXXX",
    "auth/wrong-password": "Contraseña incorrecta",
    "auth/user-not-found": "El usuario ingresado no existe"
  };
  return (
    <>
      <p className={styles.ErrMessage}>
        {MESSAGES[code] || "Error inesperado. Por favor intentelo nuevamente"}
      </p>
    </>
  );
}