import { faEnvelopeOpenText } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FormEvent, useState } from "react";
import Button from "../../button/Button";
import styles from "./styles.module.css";

function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    fetch("https://formsubmit.co/ajax/cddd277c3d8f6add03bf6c22aa4ffd19", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name,
        message,
        email,
      }),
    }).then(() => {
      setMessage("");
    });
  };

  return (
    <form className={styles.ContactForm} onSubmit={e => handleSubmit(e)}>
      <FontAwesomeIcon icon={faEnvelopeOpenText} color="var(--primary-color)" size="4x" />
      <h1>¿Quiéres decirnos algo?</h1>
      <div className={styles.ContactForm__UserData}>
        <label htmlFor="name">
          <span>Nombre</span>
          <input
            type="text"
            name="name"
            placeholder="Nombre"
            required
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </label>
        <label htmlFor="email">
          <span>Correo electrónico</span>
          <input
            type="email"
            name="email"
            placeholder="Correo electrónico"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label htmlFor="message">
          <span>Mensaje</span>
          <textarea
            name="message"
            value={message}
            onChange={e => setMessage(e.target.value)}
            placeholder="¿Cómo podemos ayudarte?"></textarea>
        </label>
      </div>
      <Button message={"Enviar mensaje"} type="primary" size="md" />
    </form>
  );
}
export default ContactForm;
