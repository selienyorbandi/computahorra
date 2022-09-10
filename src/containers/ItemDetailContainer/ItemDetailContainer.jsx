import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc, getFirestore } from "firebase/firestore";

import ItemDetail from "components/ItemDetail/ItemDetail";
import Loader from "components/Loader/Loader";

import styles from "./styles.module.css";

function ItemDetailContainer() {
  const [item, setItem] = useState({});
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    const db = getFirestore();
    const queryDb = doc(db, "items", id);
    getDoc(queryDb)
      .then((response) => setItem({ id: response.id, ...response.data() }))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, [id]);

  return (
    <article className={styles.ItemDetailContainer}>
      {loading ? <Loader /> : <ItemDetail item={item} />}
    </article>
  );
}

export default ItemDetailContainer;
