import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./styles.module.css";

function UserHeader({
  name = "Mi perfil",
  hasBackBtn,
  resetOption,
}: {
  name: string | null;
  hasBackBtn: boolean;
  resetOption: React.Dispatch<React.SetStateAction<"datos" | "pedidos" | "suscripciones" | null>>;
}) {
  return (
    <header className={styles.UserHeader}>
      <h1>{name}</h1>
      {hasBackBtn ? (
        <FontAwesomeIcon
          icon={faArrowLeft}
          color="var(--primary-color)"
          onClick={() => resetOption(null)}
        />
      ) : (
        <></>
      )}
    </header>
  );
}
export default UserHeader;
