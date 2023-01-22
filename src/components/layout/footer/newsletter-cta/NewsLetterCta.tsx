import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

import styles from "./styles.module.css";

function NewsletterAdd() {
  return (
    <div className={styles.NewsletterAdd}>
      <div className={styles.NewsletterAdd__content}>
        Reciba nuestras novedades{" "}
        <FontAwesomeIcon icon={faEnvelope} className={styles.FontAwesomeIcon} />
        <div className={styles.NewsletterAdd__content__bar}>
          <input
            type="textarea"
            placeholder="Ingrese su email"
            className={styles.NewsletterAdd__content__input}></input>
          <button type="submit">Suscribirse</button>
        </div>
      </div>
    </div>
  );
}

export default NewsletterAdd;
