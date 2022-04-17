import { useState, useEffect } from "react";
import { useParams} from "react-router-dom";
import { collection, getDocs, getFirestore, query, where } from "firebase/firestore";

import FilterBar from "components/FilterBar/FilterBar";
import ItemList from "components/ItemList/ItemList";
import Loader from "components/Loader/Loader";

import styles from "./styles.module.css";

function ItemListContainer({categoryFilter = false}){
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id: categoryId }  = useParams();
  const [categories, setCategories] = useState(null);
  const [brands, setBrands] = useState([]);
  
  useEffect(() => {
    if(categoryFilter) {
      const db = getFirestore();
      const queryCollectionCategories = collection(db, "categories");
      const queryCollectionBrands = collection(db, "brands");
      getDocs(queryCollectionCategories)
        .then(response => response.docs.map(category => ({id: category, ...category.data()})))
        .then(result => setCategories(result))
        .catch(error => console.log(error));
      getDocs(queryCollectionBrands)
        .then(response => response.docs.map(brand => ({id: brand, ...brand.data()})))
        .then(result => setBrands(result))
        .catch(error => console.log(error));
    }
  }, [categoryFilter]);

  useEffect(() => {
    const db = getFirestore();
    const queryCollection = collection(db, "items");
    const queryTrendings =  query(queryCollection, where("trending", "==", true));
    const queryFilter = query(queryCollection, where("categoryId", "==", `${categoryId}`));
    getDocs(categoryFilter ? queryFilter : queryTrendings)
      .then(response => response.docs.map(item => ({id: item.id, ...item.data()})))
      .then(result => setItems(result))
      .catch(error => console.log(error))
      .finally(()=> setLoading(false));
  }, [categoryFilter, categoryId]);
  
  return(
    <section>
      { loading ? <Loader/> : 
        <> 
          <h1 className={styles.MainTitle}>{ categoryFilter ? categories ? categories.find(catg => categoryId === catg.id).name : <></> : "Productos destacados"}</h1>
          <div className={styles.MainContainer}>
            { categoryFilter ? categories ? <FilterBar categories={categories} brands={brands}/> : <></> : <></>} 
            <div className={styles.ItemListContainer}>
              <ItemList items={items}/>
            </div>
          </div>
        </>
      }
    </section>
  );
}

export default ItemListContainer;