import ItemDetail from "../../components/items/item-detail/ItemDetail";
import { collection, doc } from "firebase/firestore";
import { useFirestoreDocument } from "@react-query-firebase/firestore";
import { firestore } from "../../firebase/firebase";
import { useParams } from "react-router-dom";
import styles from "./styles.module.css";
import Loader from "../../components/loader/Loader";
import { IItem } from "../../models/item.interface";
import NotFoundItems from "../../components/not-found/not-found-items/NotFoundItems";

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
        <NotFoundItems message="Lo siento, ese producto no existe" />
      )}
    </section>
  );
}

export default ItemDetailPage;
