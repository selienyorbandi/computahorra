import ContactForm from "../../components/forms/contact/Contact";
import ContactList from "./components/contact-list/ContactList";
import styles from "./styles.module.css";

function Contact() {
  return (
    <section className={styles.Contact}>
      <ContactList />
      <ContactForm />
    </section>
  );
}
export default Contact;
