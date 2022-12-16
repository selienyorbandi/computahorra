import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

import styles from "./styles.module.css";

function UserWidget() {
  return (
    <Link to="/user" className={styles.CartWidget}>
      <FontAwesomeIcon icon={faUser} className={styles.FontAwesomeIcon} />
    </Link>
  );
}

export default UserWidget;
