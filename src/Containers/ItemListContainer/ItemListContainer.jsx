import { getBrands } from "helpers/getBrands";
import { getCategories } from "helpers/getCategories";
import { getItems } from "helpers/getItems";
import { useParams} from "react-router-dom";
import { useState, useEffect } from "react";
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
    if (categoryFilter) {
      getCategories
        .then(res => setCategories(res));
      getBrands
        .then(res => setBrands(res))
        .catch(error => console.log(error));
    }
  }, [categoryFilter, categories, categoryId]);
  
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      getItems
        .then(
          categoryFilter ? res => res.filter(items => items.categoryId.toString() === categoryId ) 
            : res => res.filter(items => items.trending)
        )
        .then(result => setItems(result))
        .catch(error => console.log(error))
        .finally(setLoading(false));
    }, 200);
  }, [categoryId, categoryFilter]);

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