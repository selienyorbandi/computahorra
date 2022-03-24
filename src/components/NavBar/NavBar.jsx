import { useState, useEffect } from "react";
import logo from "assets/img/brandLogo.png";
import styles from "./styles.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faBagShopping, faCaretDown, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import CategoriesNavBar from "./CategoriesNavBar/CategoriesNavBar";
import SearchBar from "./SearchBar/SearchBar";
import CartWidget from "./CartWidget/CartWidget";
import { NavLink } from "react-router-dom";
import { collection, getDocs, getFirestore } from "firebase/firestore";

function NavBar(){
  
  const [openMenu, setOpenMenu] = useState(false);
  const [openCategories, setOpenCategories] = useState(false);
  const [categories, setCategories] = useState([]);
    
  useEffect(() => {
    const db = getFirestore();
    const queryCollectionCategories = collection(db, "categories");
    getDocs(queryCollectionCategories)
      .then(response => response.docs.map(category => ({id: category, ...category.data()})))
      .then(result => setCategories(result))
      .catch(error => console.log(error));
  }, []);

  return(
    <nav className={styles.Navigation}>
      <div className={styles.Navigation__NavBarCnt}>
        <div className={styles.Navigation__NavBar}>
          <div className={styles.NavBar__btnMenu} onClick={handleMenuClick}>
            <span></span>
            <span></span>
            <span></span>
          </div>
          <NavLink to={"/"}> 
            <div className={styles.NavBar__brandLogo}>
              <img src={logo} alt="Computahorra logo" width="132" height="44"/>
            </div>
          </NavLink>
          <SearchBar/>
          <div className={styles.NavBar__icons}>
            <span><FontAwesomeIcon icon={faMagnifyingGlass} /></span>
            <span><FontAwesomeIcon icon={faUser} /></span>
            <CartWidget/>
          </div>
        </div>
      </div>
      <ul className={styles.NavBar__list}>
        <div className={styles.NavBar__list__content}>
          <NavLink to="/">Inicio</NavLink>
          <li onClick={handleCategoriesClick}>Categorías&nbsp;<FontAwesomeIcon icon={faCaretDown} className={styles.NavBar__categories}/>
            {openCategories ? <CategoriesNavBar categories={categories}/> : null}
          </li>
          <li>Armá tu pc</li>
          <NavLink to="/ayuda">Centro de ayuda</NavLink>
          <NavLink to="/nosotros">Nosotros</NavLink>
          <li>Contacto</li>
        </div>
      </ul>
      {openMenu ? 
        <ul className={styles.NavBar__menu}>
          <li>Mi perfil <FontAwesomeIcon icon={faUser}/></li>
          <li>Mis compras <FontAwesomeIcon icon={faBagShopping}/></li>
          <li onClick={handleCategoriesClick}>Categorías <FontAwesomeIcon icon={faCaretDown}/>
            {openCategories ? <CategoriesNavBar categories={categories}/> : null}
          </li>
          <NavLink to="/">Inicio</NavLink>
          <li>Armá tu pc</li>
          <NavLink to="/ayuda">Centro de ayuda</NavLink>
          <NavLink to="/nosotros">Nosotros</NavLink>
          <li>Contacto</li>
        </ul>
        : ""}
    </nav>
  );
        
  function handleMenuClick(){
    if (openMenu){
      setOpenMenu(false);
      setOpenCategories(false);
    } else {
      setOpenMenu(true);
    }
  }
  function handleCategoriesClick(){
    openCategories ? setOpenCategories(false) : setOpenCategories(true);
  }

}

export default NavBar;