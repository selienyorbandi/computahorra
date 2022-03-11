import styles from "./styles.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleUp, faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import Button from "components/Button/Button";

function ItemCount({stock, initial, onAdd, message, size, primary, expanded}){
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
            <Button message={message} onClick={()=> onAdd(amount, stock)} primary={primary} size={size}/>
            {expanded ? stock > 0 ? <div className={styles.ItemCount__stock}>¡Stock disponible!</div> : <div className={`${styles.ItemCount__stock} ${styles.ItemCount__stock_red}`}>Sin stock</div> : <></>}
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