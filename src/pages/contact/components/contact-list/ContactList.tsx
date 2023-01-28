import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { faClock, faEnvelope, faLocationDot, faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./styles.module.css";

function ContactList() {
  return (
    <ul className={styles.Contact__List}>
      <h1>Contacto</h1>
      <li>
        <FontAwesomeIcon
          icon={faLocationDot}
          title="Ubicación"
          size="2xl"
          color="var(--primary-color)"
        />
        Calle Pública S/N, X5000, Córdoba
      </li>
      <hr />
      <li>
        <FontAwesomeIcon
          icon={faClock}
          title="Horario de atención"
          size="2xl"
          color="var(--primary-color)"
        />
        Lunes a Viernes de 9:30 a 14 y 14:30 a 18 hs Sábados de 9.30 a 13.30 hs
      </li>
      <hr />
      <li>
        <FontAwesomeIcon
          icon={faPhone}
          title="Teléfono fijo"
          size="2xl"
          color="var(--primary-color)"
        />
        0810 1234 567
      </li>
      <hr />
      <li>
        <FontAwesomeIcon
          icon={faWhatsapp}
          title="Whatsapp"
          size="2xl"
          color="var(--primary-color)"
        />
        <a href="https://wa.me/+543511234567" target="_blank" rel="noreferrer">
          351 123-4567
        </a>
      </li>
      <hr />
      <li>
        <FontAwesomeIcon
          icon={faEnvelope}
          title="Correo electrónico"
          size="2xl"
          color="var(--primary-color)"
        />
        <a href="mailto:contacto@computahorra.com" target="_blank" rel="noreferrer">
          contacto@computahorra.com
        </a>
      </li>
    </ul>
  );
}
export default ContactList;
