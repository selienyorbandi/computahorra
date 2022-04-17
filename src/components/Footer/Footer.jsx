import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faFacebookF, faInstagram, faWhatsapp, faYoutube } from "@fortawesome/free-brands-svg-icons";

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
            <Link to="/terminos-y-condiciones">Términos y condiciones</Link>
            <Link to="/politica-de-privacidad">Política de privacidad</Link>
            <Link to="/garantia-y-devoluciones">Garantía y devoluciones</Link>
            <Link to="/ayuda">Preguntas frecuentes</Link>
          </ul>
          <hr className={styles.Footer__content__hr}/>
          <ul className={styles.Footer__content__row}>
            <li><a href="https://www.linkedin.com/in/selien-yorbandi-92a582210/" target="_blank" rel="noreferrer">Copyright © {new Date().getFullYear()} Computahorra</a></li>
            <li><a href="https://www.linkedin.com/in/selien-yorbandi-92a582210/" target="_blank" rel="noreferrer">Desarrollado por Selien Yorbandi</a></li>
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
