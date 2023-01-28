import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import Loader from "../../components/loader/Loader";
import { IFaq } from "../../models/faq.interface";
import ContactList from "../contact/components/contact-list/ContactList";
import FaqList from "./components/faq-list/FaqList";
import styles from "./styles.module.css";

function Help() {
  const { data, isLoading } = useQuery(
    "searchItems",
    () => fetch("https://api.npoint.io/074933133655b2e67ead").then(res => res.json()),
    {
      staleTime: 30 * 20 * 1000,
    }
  );
  const [faqQuestions, setFaqQuestions] = useState<IFaq[] | []>(data || []);

  useEffect(() => {
    if (data) {
      setFaqQuestions(data);
    }
  }, [data]);

  return (
    <section className={styles.Help}>
      <div className={styles.Help__Faq}>
        <h1>Centro de Ayuda</h1>
        {data && faqQuestions.length ? <FaqList list={faqQuestions} /> : <></>}
      </div>
      <ContactList />
      {isLoading ? <Loader /> : <></>}
    </section>
  );
}

export default Help;
