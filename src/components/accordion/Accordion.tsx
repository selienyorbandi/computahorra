import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import styles from "./styles.module.css";

function Accordion({ children, title }: { children: JSX.Element; title: string }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className={styles.Accordion}>
      <div className={styles.Accordion__Header} onClick={() => setIsOpen(!isOpen)}>
        <div className={styles.Accordion__Header__Title}>{title}</div>
        <FontAwesomeIcon icon={faChevronDown} title="Desplegar contenido" />
      </div>
      {isOpen ? <div className={styles.Accordion__Body}>{children}</div> : <></>}
    </div>
  );
}
export default Accordion;
