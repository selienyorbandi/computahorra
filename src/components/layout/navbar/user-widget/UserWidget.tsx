import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

import styles from "./styles.module.css";

function UserWidget() {
  return (
    <Link to="/usuario" className={styles.UserWidget}>
      <FontAwesomeIcon icon={faUser} className={styles.FontAwesomeIcon} title="Usuario" />
    </Link>
  );
}

export default UserWidget;
