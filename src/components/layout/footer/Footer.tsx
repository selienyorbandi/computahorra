import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faInstagram,
  faWhatsapp,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";

import NewsletterCta from "./newsletter-cta/NewsLetterCta";

import styles from "./styles.module.css";

function Footer() {
  return (
    <>
      <footer className={styles.Footer}>
        <NewsletterCta />
        <div className={styles.Footer__content}>
          <ul className={styles.Footer__content__row}>
            <li>Botón de arrepentimiento</li>
            <li>
              <Link to="/politica-de-privacidad">Política de privacidad</Link>
            </li>
            <li>
              <Link to="/garantia-y-devoluciones">Garantía y devoluciones</Link>
            </li>
            <li>
              <Link to="/ayuda">Preguntas frecuentes</Link>
            </li>
          </ul>
          <hr className={styles.Footer__content__hr} />
          <ul className={styles.Footer__content__row}>
            <li>
              <a
                href="https://www.linkedin.com/in/selien-yorbandi/"
                target="_blank"
                rel="noreferrer">
                Copyright © {new Date().getFullYear()} Computahorra
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/in/selien-yorbandi/"
                target="_blank"
                rel="noreferrer">
                Desarrollado por Selien Yorbandi
              </a>
            </li>
          </ul>
          <ul className={styles.Footer__content__row}>
            <li>
              <FontAwesomeIcon icon={faFacebookF} size="2xl" />
            </li>
            <li>
              <FontAwesomeIcon icon={faInstagram} size="2xl" />
            </li>
            <li>
              <FontAwesomeIcon icon={faWhatsapp} size="2xl" />
            </li>
            <li>
              <FontAwesomeIcon icon={faYoutube} size="2xl" />
            </li>
          </ul>
        </div>
      </footer>
    </>
  );
}

export default Footer;
