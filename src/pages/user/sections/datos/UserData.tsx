import { useAuthUpdatePassword } from "@react-query-firebase/auth";
import { DocumentData } from "firebase/firestore";
import { FormEvent, useState } from "react";
import Button from "../../../../components/button/Button";
import { ErrorFeedback } from "../../../../components/error/ErrorFeedback";
import Modal from "../../../../components/modal/Modal";
import { auth } from "../../../../firebase/firebase";
import useOnValidate from "../../../../hooks/useOnValidate";
import DataInput from "./data-input/DataInput";
import styles from "./styles.module.css";

function UserData({ userData, docId }: { userData: DocumentData | undefined; docId: string }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const { errors, validateInputOnBlur } = useOnValidate();

  const newPasswordMutation = useAuthUpdatePassword();

  const handlePasswordUpdate = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (auth.currentUser) {
      if (errors.password.is) {
        newPasswordMutation.mutate({
          user: auth.currentUser,
          newPassword: newPassword,
        });
      }
    }
  };

  return (
    <section className={styles.UserSection}>
      <div className={styles.UserSection__Data}>
        <DataInput
          name="Nombre"
          value={userData ? userData.name : ""}
          docId={docId}
          userData={userData}
        />
        <hr />
        <DataInput
          name="Apellido"
          value={userData ? userData.surname : ""}
          docId={docId}
          userData={userData}
        />
        <hr />
        <DataInput
          name="Email"
          value={userData ? userData.email : ""}
          docId={docId}
          userData={userData}
        />
        <hr />
        <DataInput
          name="Teléfono"
          value={userData ? userData.tel : ""}
          docId={docId}
          userData={userData}
        />
        <hr />
        <Button
          message="Cambiar contraseña"
          type="primary"
          size="sm"
          onClick={() => setIsModalOpen(true)}
        />
        <Modal isOpen={isModalOpen} handleClose={setIsModalOpen}>
          <div className={styles.DataInput__Edit}>
            <form onSubmit={e => handlePasswordUpdate(e)}>
              <label htmlFor="password">
                <h2>Modificar Contraseña</h2>
                <input
                  type="text"
                  name="password"
                  placeholder="Contraseña"
                  id="password"
                  onBlur={e => validateInputOnBlur(e)}
                  onChange={e => setNewPassword(e.target.value)}
                />
              </label>
              <div>
                <Button message="Guardar" type="primary" size="sm" />
                <Button
                  message="Cancelar"
                  type="secondary"
                  size="sm"
                  onClick={() => setIsModalOpen(false)}
                />
              </div>
            </form>
            {newPasswordMutation.isError ? (
              <ErrorFeedback code={newPasswordMutation.error.code} />
            ) : (
              <></>
            )}
            {errors.password.is ? <ErrorFeedback code={errors.password.code} /> : <></>}
          </div>
        </Modal>
      </div>
    </section>
  );
}
export default UserData;
