import { useState, useEffect } from "react";
import ItemDetail from "components/ItemDetail/ItemDetail";
import Loader from "components/Loader/Loader";
import { useParams } from "react-router-dom";
import styles from "./styles.module.css";
import { doc, getDoc, getFirestore } from "firebase/firestore";

function ItemDetailContainer() {
  const [item, setItem] = useState({});
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    const db = getFirestore();
    const queryDb = doc(db,"items", id);
    getDoc(queryDb)
      .then(response => setItem({id: response.id, ...response.data()}))
      .catch(err => console.log(err))
      .finally(()=> setLoading(false));
  }, [id]);

  return (
    <article className={styles.ItemDetailContainer}>
      {loading ? <Loader/> : <ItemDetail item={item}/> }
    </article>
  );
}
                                     
export default ItemDetailContainer;