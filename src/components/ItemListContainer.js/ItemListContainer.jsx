import styles from "./styles.module.css";

function ItemListContainer({greeting}){
    return(
        <div className={styles.ItemListContainer}>
            <h1>{greeting}</h1>
        </div>
    );
}

export default ItemListContainer;