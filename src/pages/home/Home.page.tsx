import { query, collection, limit, where } from "firebase/firestore";
import { useFirestoreQuery } from "@react-query-firebase/firestore";
import { firestore } from "../../firebase/firebase";
import { IItem } from "../../models/item.interface";
import ItemList from "../../components/items/item-list/ItemList";
import styles from "./styles.module.css";
import Loader from "../../components/loader/Loader";
import Slideshow from "../../components/slideshow/Slideshow";
import images from "../../assets/img/promotions/ene-2023/promotions";

function Home() {
  const refGetTrendingItems = query(
    collection(firestore, "items"),
    limit(8),
    where("trending", "==", true)
  );
  const queryTrendingItems = useFirestoreQuery(
    ["items"],
    refGetTrendingItems,
    {
      subscribe: false,
      source: "cache",
    },
    {
      refetchOnWindowFocus: false,
      refetchInterval: 30 * 6 * 1000,
      refetchIntervalInBackground: false,
    }
  );

  const trendingItems = (): IItem[] => {
    if (queryTrendingItems.data) {
      return queryTrendingItems.data.docs.map(docSnapshot => {
        return { ...(docSnapshot.data() as IItem), id: docSnapshot.id };
      });
    } else {
      return [];
    }
  };

  return (
    <section className={styles.Home_TrendingItems}>
      {queryTrendingItems.isLoading ? (
        <Loader />
      ) : (
        <>
          <header>
            <Slideshow images={images} autoplay controls />
            <h1>Productos más populares</h1>
          </header>
          {queryTrendingItems.data ? <ItemList items={trendingItems()} /> : <></>}
        </>
      )}
    </section>
  );
}
export default Home;
