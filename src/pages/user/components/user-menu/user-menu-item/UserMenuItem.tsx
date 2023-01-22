import {
  faAddressCard,
  faNewspaper,
  faBagShopping,
  faCircleDot,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./styles.module.css";

function UserMenuItem({
  name,
  dispatch,
}: {
  name: "datos" | "pedidos" | "suscripciones";
  dispatch: React.Dispatch<React.SetStateAction<"datos" | "pedidos" | "suscripciones" | null>>;
}) {
  const handleSetOption = () => {
    dispatch(name);
  };

  const handleIcon = () => {
    if (name === "datos") return faAddressCard;
    if (name === "pedidos") return faBagShopping;
    if (name === "suscripciones") return faNewspaper;
    return faCircleDot;
  };

  return (
    <li className={styles.UserMenu__Item} onClick={() => handleSetOption()}>
      <FontAwesomeIcon icon={handleIcon()} color="var(--primary-color)" />{" "}
      {`Mis ${name[0].toUpperCase()}${name.slice(1)}`}
    </li>
  );
}
export default UserMenuItem;
