import { useState, useEffect } from "react";
import { getItems } from "helpers/getItems";
import ItemDetail from "components/ItemDetail/ItemDetail";
import Loader from "components/Loader/Loader";
import { useParams } from "react-router-dom";
import styles from "./styles.module.css";

function ItemDetailContainer() {
  const [item, setItem] = useState({});
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    setTimeout(()=>{
      getItems
        .then(response => response.find(item => item.id.toString() === id)) 
        .then(result => setItem(result))
        .catch(err => console.log(err))
        .finally(setLoading(false));
    },400);
  }, [id]);

  return (
    <article className={styles.ItemDetailContainer}>
      {loading ? <Loader/> : <ItemDetail item={item}/> }
    </article>
  );
}

export default ItemDetailContainer;