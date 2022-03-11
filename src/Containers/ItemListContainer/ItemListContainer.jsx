import styles from "./styles.module.css";
import { useState, useEffect } from "react";
import { getItems } from "helpers/getItems";
import Loader from "components/Loader/Loader";
import ItemList from "components/ItemList/ItemList";
import { useParams } from "react-router-dom";
import { getCategories } from "helpers/getCategories";

function ItemListContainer({categoryFilter = false}){
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id: categoryId }  = useParams();
  const [currentCategory, setCurrentCategory] = useState(undefined); 

  useEffect(() => {
    getCategories
      .then(response => response.find(catg => categoryId === catg.id))
      .then(result=> setCurrentCategory(result))
      .catch(error => console.log(error));
  }, [categoryId]);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      getItems
        .then(categoryFilter ? res => res.filter(items => items.categoryId.toString() === categoryId ) : res => res)
        .then(result => setItems(result))
        .catch(error => console.log(error))
        .finally(setLoading(false));
    }, 400);
  }, [categoryId, categoryFilter]);

  return(
    <section>
      { loading ? <Loader/> : 
        <> 
          <h1 className={styles.MainTitle}>{currentCategory !== undefined ? currentCategory.name : "Productos destacados"}</h1>
          <div className={styles.ItemListContainer}>
            <ItemList items={items}/>
          </div>
        </>
      }
    </section>
  );
}

export default ItemListContainer;