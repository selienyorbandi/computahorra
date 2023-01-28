import Accordion from "../../../../components/accordion/Accordion";
import { IFaq } from "../../../../models/faq.interface";
import styles from "./styles.module.css";

function FaqList({ list }: { list: IFaq[] }) {
  return (
    <section className={styles.FaqList}>
      {list ? (
        list.map(el => (
          <Accordion key={el.id} title={el.title}>
            <>
              <strong>{el.question}</strong>
              <p>{el.answer}</p>
            </>
          </Accordion>
        ))
      ) : (
        <></>
      )}
    </section>
  );
}
export default FaqList;
