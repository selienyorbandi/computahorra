import ItemCount from "./ItemCount/ItemCount";
import styles from "./styles.module.css";

function Item({title, price, thumbnail, stock}) {
    
    function addItem(amount, stock){
        if (amount <= stock)
        console.log(`${amount} ${title} en el carrito`);
    }

    return(
        <div className={styles.Item}>
            <div className={styles.Item__imgContainer}>
                <img src={thumbnail} alt={title} className={styles.Item__img}/>
            </div>
            <span className={styles.Item__price}>${price.toLocaleString()}</span>
            <h6 className={styles.Item__title}>{title}</h6>
            <ItemCount stock={stock} initial={1} onAdd={addItem}/>
        </div>
    );
}

export default Item;