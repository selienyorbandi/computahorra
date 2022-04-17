import styles from "./styles.module.css";

export default function ErrorFeedback({code}) {
  const MESSAGES = {
    "auth/email-already-in-use": "El email ingresado está en uso.",
    "auth/weak-password": "Debe ingresar una contraseña de al menos 6 caracteres",
    "auth/invalid-phone-number": "Ingrese un teléfono de la forma +54 9 XXX XXX XXXX",
    "auth/wrong-password": "Contraseña incorrecta",
    "auth/user-not-found": "El usuario ingresado no existe",
    "auth/account-exists-with-different-credential": "El email de esa cuenta ya se encuentra en uso",
    "register/password-confirm-error": "Las contraseñas no coinciden",
    "register/empty-fields": "Los campos marcados con * son obligatorios",
    "auth/invalid-email": "El correo electrónico ingresado no es válido"
  };
  return (
    <>
      <p className={styles.ErrMessage}>
        {MESSAGES[code] || "Error inesperado. Por favor intentelo nuevamente"}
      </p>
    </>
  );
}