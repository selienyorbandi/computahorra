import { ChangeEvent, useState } from "react";
import {
  isValidEmail,
  isValidName,
  isValidPassword,
  isValidTelephone,
} from "../utils/validateInputs";

const useOnValidate = () => {
  const [errors, setErrors] = useState({
    name: { is: false, code: "register/not-only-letters" },
    surname: { is: false, code: "register/not-only-letters" },
    email: { is: false, code: "auth/invalid-email" },
    tel: { is: false, code: "auth/invalid-phone-number" },
    password: { is: false, code: "auth/weak-password" },
    confirmPassword: { is: false, code: "register/password-confirm-error" },
  });

  const validateInputOnBlur = (
    e: ChangeEvent<HTMLInputElement>,
    passwordValue?: string,
    confirmPasswordValue?: string
  ) => {
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
        confirmPassword: { ...prev.confirmPassword, is: !(passwordValue === confirmPasswordValue) },
      }));
    }
  };

  const areValidInputs = () => {
    let isValid = true;
    Object.values(errors).forEach(obj => (isValid = !obj.is && isValid));
    return isValid;
  };

  return { errors, setErrors, validateInputOnBlur, areValidInputs };
};

export default useOnValidate;
