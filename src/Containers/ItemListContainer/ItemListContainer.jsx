import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";

import { filterSearch } from "services/filterSearch";

import FilterBar from "components/FilterBar/FilterBar";
import ItemList from "components/ItemList/ItemList";
import Loader from "components/Loader/Loader";
import Button from "components/Button/Button";

import styles from "./styles.module.css";

function ItemListContainer({
  trending = false,
  categoryFilter = false,
  search = false,
}) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id: categoryId } = useParams();
  const { keywords } = useParams();
  const [categories, setCategories] = useState(null);
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    if (!categories && !brands) {
      if (categoryFilter && categoryId) {
        const db = getFirestore();
        const queryCollectionCategories = collection(db, "categories");
        const queryCollectionBrands = collection(db, "brands");
        getDocs(queryCollectionCategories)
          .then((response) =>
            response.docs.map((category) => ({
              id: category,
              ...category.data(),
            }))
          )
          .then((result) => setCategories(result))
          .catch((error) => console.log(error));
        getDocs(queryCollectionBrands)
          .then((response) =>
            response.docs.map((brand) => ({ id: brand, ...brand.data() }))
          )
          .then((result) => setBrands(result))
          .catch((error) => console.log(error));
      }
    }
  }, [categories, brands, categoryFilter, categoryId]);

  useEffect(() => {
    const db = getFirestore();
    const queryCollection = collection(db, "items");
    let queryFirebase;
    if (trending) {
      queryFirebase = query(queryCollection, where("trending", "==", true));
    }
    if (categoryFilter) {
      queryFirebase = query(
        queryCollection,
        where("categoryId", "==", `${categoryId}`)
      );
    }
    if (search) {
      queryFirebase = query(queryCollection);
    }
    getDocs(queryFirebase)
      .then((response) =>
        response.docs.map((item) => ({ id: item.id, ...item.data() }))
      )
      .then((result) => {
        if (search) {
          setItems(filterSearch(keywords, result));
        } else {
          setItems(result);
        }
      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, [categoryFilter, categoryId, trending, search, keywords]);

  return (
    <section>
      {loading ? (
        <Loader />
      ) : (
        <>
          {items.length ? (
            <>
              <h1 className={styles.MainTitle}>
                {categoryFilter ? (
                  categories ? (
                    categories.find((catg) => categoryId === catg.id).name
                  ) : (
                    <></>
                  )
                ) : trending ? (
                  "Productos destacados"
                ) : (
                  keywords.toLocaleUpperCase()
                )}
              </h1>
              <div className={styles.MainContainer}>
                {categoryFilter ? (
                  categories ? (
                    <FilterBar categories={categories} brands={brands} />
                  ) : (
                    <></>
                  )
                ) : (
                  <></>
                )}
                <div className={styles.ItemListContainer}>
                  <ItemList items={items} />
                </div>
              </div>
            </>
          ) : (
            <div className={styles.ItemListContainer__doesntExist}>
              <h1>Lo siento, no hemos encontrado nada</h1>
              <Link to="/">
                <Button message="Volver al inicio" />
              </Link>
            </div>
          )}
        </>
      )}
    </section>
  );
}

export default ItemListContainer;
