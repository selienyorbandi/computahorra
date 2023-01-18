import { DocumentData } from "firebase/firestore";
import Button from "../../../../components/button/Button";
import DataInput from "./data-input/DataInput";
import styles from "./styles.module.css";

function UserData({ userData, docId }: { userData: DocumentData | undefined; docId: string }) {
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
        <Button message="Cambiar contraseña" type="primary" size="sm" />
      </div>
    </section>
  );
}
export default UserData;
