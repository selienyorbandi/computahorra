import Item from "../Item/Item";
import styles from "./styles.module.css";
import Itempic from "../../assets/Temp/Placa_de_Video_Zotac_GeForce_RTX_3080_10GB_GDDR6X_Trinity_LHR.jpg";

function ItemListContainer(){
    return(
        <div className={styles.ItemListContainer}>
            <Item title="Placa de Video Zotac GeForce RTX 3080 10GB GDDR6X Trinity LHR" price={290000} img={Itempic}/>
        </div>
    );
}

export default ItemListContainer;