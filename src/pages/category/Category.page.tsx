import { collection, query, where } from "firebase/firestore";
import { useParams } from "react-router-dom";
import Loader from "../../components/loader/Loader";
import { IItem } from "../../models/item.interface";
import { firestore } from "../../firebase/firebase";
import { useFirestoreQuery } from "@react-query-firebase/firestore";
import ItemList from "../../components/items/item-list/ItemList";
import styles from "./styles.module.css";
import NotFoundItems from "../../components/not-found/not-found-items/NotFoundItems";

function Category() {
  const { category } = useParams();

  const refGetItemsByCategory = query(
    collection(firestore, "items"),
    where("categoryId", "==", category)
  );

  const queryItemsByCategory = useFirestoreQuery(
    ["itemsByCateg", category],
    refGetItemsByCategory,
    {
      source: "cache",
      subscribe: false,
    },
    {
      select(data) {
        return data.docs.map(docSnapshot => {
          return { ...(docSnapshot.data() as IItem), id: docSnapshot.id };
        });
      },
      refetchOnWindowFocus: false,
      staleTime: 30 * 60 * 1000,
    }
  );

  const handleCategoryName = () => {
    //Just for categories with more than 1 word
    if (category === "componentes-pc") return "Componentes de pc";
    if (category === "computadoras-armadas") return "Computadoras armadas";
    if (category) {
      return category[0].toUpperCase() + category.slice(1);
    }
    return "";
  };

  return (
    <section className={styles.Category}>
      {queryItemsByCategory.isLoading ? (
        <Loader />
      ) : queryItemsByCategory.data?.length ? (
        <>
          <header>
            <h1>{handleCategoryName()}</h1>
          </header>
          <ItemList items={queryItemsByCategory.data} />
        </>
      ) : (
        <NotFoundItems />
      )}
    </section>
  );
}

export default Category;
