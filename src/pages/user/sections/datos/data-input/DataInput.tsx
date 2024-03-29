import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAuthUpdateEmail } from "@react-query-firebase/auth";
import { useFirestoreDocumentMutation } from "@react-query-firebase/firestore";
import { collection, doc, DocumentData } from "firebase/firestore";
import { FormEvent, useState } from "react";
import Button from "../../../../../components/button/Button";
import { ErrorFeedback } from "../../../../../components/error/ErrorFeedback";
import Modal from "../../../../../components/modal/Modal";
import { auth, firestore } from "../../../../../firebase/firebase";
import useOnValidate from "../../../../../hooks/useOnValidate";
import styles from "./styles.module.css";

function DataInput({
  name,
  value,
  docId,
  userData,
}: {
  name: string;
  value: string;
  docId: string;
  userData: DocumentData | undefined;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [newValue, setNewValue] = useState(value);
  const { errors, validateInputOnBlur } = useOnValidate();
  const userCollection = collection(firestore, "users");
  const userDataref = doc(userCollection, docId);
  const userDataMutation = useFirestoreDocumentMutation(userDataref, { merge: true });
  const userEmailMutation = useAuthUpdateEmail();

  const handleUpdate = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!errors[handleDocumentFields()].is) {
      userDataMutation.mutate({
        ...userData,
        [handleDocumentFields()]: newValue,
      });
      handleEmailUpdate();
      setIsOpen(false);
    }
  };

  const handleDocumentFields = () => {
    if (name === "Nombre") return "name";
    if (name === "Apellido") return "surname";
    if (name === "Teléfono") return "tel";
    if (name === "Email") return "email";
    return "password";
  };

  const handleEmailUpdate = () => {
    if (name === "Email") {
      if (auth.currentUser) {
        userEmailMutation.mutate({
          user: auth.currentUser,
          newEmail: value,
        });
      }
    }
  };

  return (
    <div className={styles.DataInput}>
      <div>
        <p>{name}</p>
        <p>{value}</p>
      </div>
      <FontAwesomeIcon icon={faEdit} onClick={() => setIsOpen(true)} />
      <Modal isOpen={isOpen} handleClose={setIsOpen}>
        <div className={styles.DataInput__Edit}>
          <h2>Modificar {name.toLowerCase()}</h2>
          <form onSubmit={e => handleUpdate(e)}>
            <label htmlFor={name}>
              <span>{name}</span>
              <input
                type="text"
                name={handleDocumentFields()}
                placeholder={name}
                id={name}
                onBlur={e => validateInputOnBlur(e)}
                onChange={e => setNewValue(e.target.value)}
              />
            </label>
            <div>
              <Button
                message="Guardar"
                type="primary"
                size="sm"
                disabl={userDataMutation.isLoading}
              />
              <Button
                message="Cancelar"
                type="secondary"
                size="sm"
                onClick={() => setIsOpen(false)}
              />
            </div>
          </form>
          {userDataMutation.isError ? <ErrorFeedback code={userDataMutation.error.code} /> : <></>}
          {errors[handleDocumentFields()].is ? (
            <ErrorFeedback code={errors[handleDocumentFields()].code} />
          ) : (
            <></>
          )}
        </div>
      </Modal>
    </div>
  );
}

export default DataInput;
