import { NavLink } from "react-router-dom";
import { ICategory } from "../../../../models/category.interface";
import styles from "./styles.module.css";

function CategoriesDropdown({ categories }: { categories: ICategory[] }) {
  return (
    <div className={styles.NavBar_categories}>
      <div className={styles.NavBar_categories__baloon}>
        {categories.map(category => (
          <NavLink key={category.id} to={`/categoria/${category.id}`}>
            <p key={category.id} className={styles.NavBar__categoriesDropdown}>
              {category.name}
            </p>
          </NavLink>
        ))}
      </div>
    </div>
  );
}
export default CategoriesDropdown;
