import styles from "./styles.module.css";
import { useState, useEffect } from "react";
import { getItems } from "../../helpers/getItems";
import Loader from "../Loader/Loader";
import ItemList from "../ItemList/ItemList";

function ItemListContainer(){
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getItems
            .then(response => response) //el .json si fuera un fetch real
            .then(result => setItems(result))
            .catch(error => console.log(error))
            .finally(()=> setLoading(false));
    }, [])

    return(
            <>
               { loading ? <Loader/>:
                 <div className={styles.ItemListContainer}>
                    <ItemList items={items}/>
                 </div>
               }
            </>
    );
}

export default ItemListContainer;