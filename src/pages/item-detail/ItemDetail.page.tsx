import ItemDetail from "../../components/items/item-detail/ItemDetail";
import { collection, doc } from "firebase/firestore";
import { useFirestoreDocument } from "@react-query-firebase/firestore";
import { firestore } from "../../firebase/firebase";
import { Link, useParams } from "react-router-dom";
import styles from "./styles.module.css";
import Button from "../../components/button/Button";
import notFoundImg from "../../assets/img/not-found.gif";
import Loader from "../../components/loader/Loader";
import { IItem } from "../../models/item.interface";

function ItemDetailPage() {
  const { id } = useParams();
  const refItemsCollection = collection(firestore, "items");
  const refItemDoc = doc(refItemsCollection, id || " ");

  const queryItem = useFirestoreDocument(
    ["items", id || " "],
    refItemDoc,
    {
      subscribe: false,
      source: "cache",
    },
    {
      refetchOnWindowFocus: false,
      refetchInterval: 2 * 6 * 1000,
      refetchIntervalInBackground: false,
    }
  );

  const currentItem = () => {
    if (queryItem.data) {
      const queryData = queryItem.data.data() as IItem;
      const currentItemWithId: IItem = { ...queryData, id: queryItem.data.id };
      return currentItemWithId;
    } else {
      return {} as IItem;
    }
  };

  return (
    <section className={styles.ItemDetail}>
      {queryItem.isLoading ? (
        <Loader />
      ) : queryItem.data ? (
        <ItemDetail item={currentItem()} />
      ) : (
        <div className={styles.ItemDetail__doesntExist}>
          <img src={notFoundImg} alt="Producto no encontrado" width="250px" height="140px" />
          <h1>Lo siento, ese producto no existe</h1>
          <Link to="/">
            <Button message="Volver al inicio" type="primary" />
          </Link>
        </div>
      )}
    </section>
  );
}

export default ItemDetailPage;
