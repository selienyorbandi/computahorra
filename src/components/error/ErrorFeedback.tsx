import styles from "./styles.module.css";

const MESSAGES = {
  "auth/email-already-in-use": "El correo electrónico ingresado está en uso.",
  "auth/invalid-phone-number": "Ingrese un teléfono válido",
  "auth/wrong-password": "Contraseña incorrecta",
  "auth/user-not-found": "El usuario ingresado no existe",
  "auth/account-exists-with-different-credential": "El email de esa cuenta ya se encuentra en uso",
  "auth/weak-password":
    "La contraseña debe contener al menos 6 caracteres, una minúscula, una mayúscula y un número",
  "auth/invalid-email": "El correo electrónico ingresado no es válido",
  "register/empty-fields": "Los campos marcados con * son obligatorios",
  "register/not-only-letters": "Debe tener 2 o más letras",
  "register/password-confirm-error": "Las contraseñas no coinciden",
};

export function ErrorFeedback({ code }: { code: string }) {
  const messageCode = code as keyof typeof MESSAGES;

  return (
    <>
      <p className={styles.ErrMessage}>
        {MESSAGES[messageCode] || "Error inesperado. Por favor intentelo nuevamente"}
      </p>
    </>
  );
}
