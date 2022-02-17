import styles from "./styles.module.css";

function CategoriesNavBar(){
    return(
        <div className={styles.NavBar_categories}>
            <div></div>
            <p className={styles.NavBar__categoriesDropdown}>Computadoras</p>
            <p className={styles.NavBar__categoriesDropdown}>Notebooks</p>
            <p className={styles.NavBar__categoriesDropdown}>Componentes de pc</p>
            <p className={styles.NavBar__categoriesDropdown}>Periféricos</p>
            <p className={styles.NavBar__categoriesDropdown}>Accesorios</p>
            <p className={styles.NavBar__categoriesDropdown}>Monitores</p>
        </div>
    );
}

export default CategoriesNavBar;
