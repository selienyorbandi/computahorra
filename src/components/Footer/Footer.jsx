import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faFacebookF, faInstagram, faWhatsapp, faYoutube } from '@fortawesome/free-brands-svg-icons';
import NewsletterAdd from "./NewsletterAdd/NewsletterAdd";
import styles from "./styles.module.css";

function Footer(props) {
  return (
    <>
      <footer className={styles.Footer}>
        <NewsletterAdd />
        <div className={styles.Footer__content}>
          <ul className={styles.Footer__content__row}>
            <li>Botón de arrepentimiento</li>
            <li>Términos y condiciones</li>
            <li>Política de privacidad</li>
            <li>Garantía y devoluciones</li>
            <li>Preguntas frecuentes</li>
          </ul>
          <hr className={styles.Footer__content__hr}/>
          <ul className={styles.Footer__content__row}>
                <li>Copyright © {new Date().getFullYear()} Computahorra</li>
                <li>Desarrollado por Selien Yorbandi</li>
          </ul>
          <ul className={styles.Footer__content__row}> 
                <li><FontAwesomeIcon icon={faFacebookF} size="2xl"/></li>
                <li><FontAwesomeIcon icon={faInstagram} size="2xl"/></li>
                <li><FontAwesomeIcon icon={faWhatsapp} size="2xl"/></li>
                <li><FontAwesomeIcon icon={faYoutube} size="2xl"/></li>
          </ul>
        </div>
      </footer>
    </>
  );
}

export default Footer;
