import styles from "./styles.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleUp, faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

function ItemCount({stock, initial, onAdd}){
    const [amount, setAmount] = useState(initial);

    function increaseAmount(){
        if(amount < stock) {
            setAmount(amount+1);
        }
    }

    function decreaseAmount(){
        if(amount > 1) {
            setAmount(amount-1);
        }
    }
    
    return(
        <div className={styles.ItemCount}>
            <button className={styles.ItemCount__addCart} onClick={()=> onAdd(amount, stock)}>Añadir al carrito</button>
            <div className={styles.ItemCount__count}>
                <span className={styles.ItemCount__display}>{amount}</span>
                <div className={styles.ItemCount__controllers}>
                    <span onClick={increaseAmount}><FontAwesomeIcon icon={faAngleUp} size="xs"/></span><span onClick={decreaseAmount}><FontAwesomeIcon icon={faAngleDown} size="xs"/></span>
                </div>
            </div>
        </div>
    );
}

export default ItemCount;