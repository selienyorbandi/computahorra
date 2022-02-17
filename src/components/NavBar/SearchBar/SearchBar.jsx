import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import styles from "./styles.module.css";

function SearchBar(){
    return(
        <div className={styles.SearchBar}>
            <input type="textarea" placeholder="Busque aquí lo que desee..."></input>
            <button type="submit"><FontAwesomeIcon icon={faMagnifyingGlass}/></button>
        </div>
    );
}
export default SearchBar;