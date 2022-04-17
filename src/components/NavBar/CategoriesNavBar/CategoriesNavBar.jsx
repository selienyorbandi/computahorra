import { NavLink } from "react-router-dom";

import styles from "./styles.module.css";

function CategoriesNavBar({categories}){
  return(
    <div className={styles.NavBar_categories} >
      <div className={styles.NavBar_categories__baloon}>
        {categories.map(category => <NavLink key={category.id} to={`/category/${category.id}`}><p key={category.id} className={styles.NavBar__categoriesDropdown}>{category.name}</p></NavLink>)}
      </div>
    </div>
  );
}

export default CategoriesNavBar;

