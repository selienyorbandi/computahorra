import { faAnglesRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import React from "react";
import styles from "./styles.module.css";

function FilterBar({categories, brands}) {
  const [queryParams, setQueryParams] = useSearchParams();
  
  function addQParam(setQueryParams, key, value) {
    setQueryParams({
      [key]: value
    });
  }

  return (
    <div className={styles.FilterBar}>
      <h3>Categoría</h3>
      <ul>
        {categories.map(category => <Link key={category.id} to={`/category/${category.id}`}><p key={category.id} >{category.name}</p></Link>)}
      </ul>
      <h3>Marca</h3>
      <ul>
        {brands.map(brand => <li key={brand.id} onClick={()=>addQParam(setQueryParams, "brand", brand.id)} >{brand.name}</li>)}
      </ul>
      <h3>Precio</h3> 
      <div>
        <ul className={styles.FilterBar__price__common}>
          <li>Hasta $15.000</li>
          <li>Entre $40.000 y $100.000</li>
          <li>Más de $100.000</li>
        </ul>
        <div className={styles.FilterBar__price}>
          <input type="number" placeholder="Mínimo" min={0}/>
          <input type="number" placeholder="Máximo"/>
          <FontAwesomeIcon icon={faAnglesRight}/>
        </div>
      </div>
    </div>
  );
}

export default FilterBar;