import { useState, useEffect } from "react";
import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";
import { updateEmail, updateProfile } from "firebase/auth";

import { useAuthContext } from "context/AuthContext";

import {
  restrictOnlyAlphabet,
  restrictOnlyNumbersPlus,
  restrictOnlyAlphanumeric,
  isValidEmail,
  cleanError,
} from "utils/validateInputs";

import Button from "components/Button/Button";
import Loader from "components/Loader/Loader";
import ErrorFeedback from "components/ErrorFeedback/ErrorFeedback";

import styles from "./styles.module.css";

export default function UserProfile() {
  const { user, logOut, userData, setUserData } = useAuthContext();
  const [isUpdateMode, setIsUpdatemode] = useState(false);
  const [newUserData, setNewUserData] = useState({});
  const [regError, setRegError] = useState(null);

  const handleChange = ({ target: { name, value } }) => {
    setNewUserData({ ...newUserData, [name]: value });
  };

  const handleSubmit = async (e) => {
    if (
      newUserData.name !== "" &&
      newUserData.surname !== "" &&
      newUserData.email !== ""
    ) {
      if (isValidEmail(newUserData.email)) {
        e.preventDefault();
        const db = getFirestore();
        setUserData(newUserData);

        await setDoc(doc(db, "users", user.uid), newUserData)
          .catch((err) => console.log(err))
          .finally(setIsUpdatemode(false));

        let displayName = `${userData.name} ${userData.surname}`;
        await updateProfile(user, { displayName: displayName });

        updateEmail(user, newUserData.email).catch((err) => {
          console.log(err);
        });
      } else {
        setRegError("auth/invalid-email");
        cleanError(setRegError);
      }
    } else {
      setRegError("register/empty-fields");
      cleanError(setRegError);
    }
  };

  const getUserData = async (id) => {
    const db = getFirestore();
    const queryDb = doc(db, "users", id);
    await getDoc(queryDb)
      .then((response) => {
        setUserData(response.data());
        setNewUserData(response.data());
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getUserData(user.uid);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isUpdateMode]);

  return userData ? (
    <div className={styles.UserProfile}>
      <h1>
        Mi perfil
        <span>
          {!isUpdateMode && (
            <img
              src={
                user.photoURL ||
                "https://i.postimg.cc/yNjszmcK/blank-profile-picture-973460-640.png"
              }
              alt="Avatar"
              width="60"
              heigth="60"
            ></img>
          )}
        </span>
      </h1>
      {isUpdateMode && (
        <div className={`${styles.UserProfile__img}`}>
          <img
            src={
              user.photoURL ||
              "https://i.postimg.cc/yNjszmcK/blank-profile-picture-973460-640.png"
            }
            alt="Avatar"
            width="60"
            heigth="60"
          />
          <input type="file" accept="image/png, image/jpeg" disabled />
        </div>
      )}
      <hr />

      {isUpdateMode ? (
        <>
          <h2>Nombre *</h2>
          <input
            type="text"
            name="name"
            defaultValue={userData.name || user.displayName || "Visitante"}
            onLoad={(e) => handleChange(e)}
            onChange={(e) => handleChange(e)}
            onKeyDown={restrictOnlyAlphabet}
          />
          <h2>Apellido *</h2>
          <input
            type="text"
            name="surname"
            defaultValue={userData.surname || "Visitante"}
            onLoad={(e) => handleChange(e)}
            onChange={(e) => handleChange(e)}
            onKeyDown={restrictOnlyAlphabet}
          />
        </>
      ) : (
        <>
          <h2>Nombre y apellido</h2>
          <p>
            {`${userData.name} ${userData.surname}` ||
              user.displayName ||
              "Visitante"}{" "}
          </p>
        </>
      )}
      <h2>Correo electrónico * </h2>
      {isUpdateMode ? (
        <>
          <input
            type="text"
            name="email"
            defaultValue={userData.email || user.email}
            onLoad={(e) => handleChange(e)}
            onChange={(e) => handleChange(e)}
          />
        </>
      ) : (
        <p>{userData.email} </p>
      )}
      <h2>Teléfono</h2>
      {isUpdateMode ? (
        <>
          <input
            type="text"
            name="tel"
            defaultValue={userData.tel || ""}
            onLoad={(e) => handleChange(e)}
            onChange={(e) => handleChange(e)}
            onKeyDown={restrictOnlyNumbersPlus}
          />
        </>
      ) : (
        <p>{userData.tel || "------"} </p>
      )}
      <h2>Dirección</h2>
      {isUpdateMode ? (
        <>
          <input
            type="text"
            name="adress"
            defaultValue={userData.adress || ""}
            onLoad={(e) => handleChange(e)}
            onChange={(e) => handleChange(e)}
            onKeyDown={restrictOnlyAlphanumeric}
          />
        </>
      ) : (
        <p>{userData.adress || "------"}</p>
      )}
      <hr />
      <div className={styles.UserProfile__actions}>
        {isUpdateMode ? (
          <>
            <Button message="Guardar cambios" primary onClick={handleSubmit} />
            <Button
              message="Cancelar"
              color="red"
              onClick={() => setIsUpdatemode(!isUpdateMode)}
            />
          </>
        ) : (
          <>
            <Button
              message="Actualizar  perfil"
              primary
              onClick={() => setIsUpdatemode(!isUpdateMode)}
            />
            <Button message="Cambiar contraseña" />
            <Button
              message="Cerrar sesión"
              color="red"
              onClick={() => logOut()}
            />
          </>
        )}
      </div>
      {regError ? <ErrorFeedback code={regError} /> : <></>}
    </div>
  ) : (
    <Loader />
  );
}
