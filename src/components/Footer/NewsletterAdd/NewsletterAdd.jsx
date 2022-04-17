import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

import styles from "./styles.module.css";

function NewsletterAdd() {
  return (
    <div className={styles.NewsletterAdd}>
      <div className={styles.NewsletterAdd__content}>
            Recibe nuestras novedades <FontAwesomeIcon icon={faEnvelope} className={styles.FontAwesomeIcon}/>
        <div className={styles.NewsletterAdd__content__bar}>
          <input type="textarea"  placeholder="Ingresa tu email" className={styles.NewsletterAdd__content__input}></input>
          <button type="submit">Suscríbete</button>
        </div>
      </div>
    </div>
  );
}

export default NewsletterAdd;