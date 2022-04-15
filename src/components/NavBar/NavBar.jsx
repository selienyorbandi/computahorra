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
import { useRef } from "react";
import UserWidget from "./UserWidget/UserWidget";

function NavBar(){
  
  const [openMenu, setOpenMenu] = useState(false);
  const [openCategories, setOpenCategories] = useState(false);
  const categoriesMenuRef = useRef();
  const navMenuRef = useRef();
  const [categories, setCategories] = useState([]);

  const handleMenuClick = () => {
    if (openMenu){
      setOpenMenu(false);
      setOpenCategories(false);
    } else {
      setOpenMenu(true);
    }
  };
  const handleCategoriesClick = () => {
    openCategories ? setOpenCategories(false) : setOpenCategories(true);
  };

  useEffect(() => {
    const db = getFirestore();
    const queryCollectionCategories = collection(db, "categories");
    getDocs(queryCollectionCategories)
      .then(response => response.docs.map(category => ({id: category, ...category.data()})))
      .then(result => setCategories(result))
      .catch(error => console.log(error));
  }, []);

  useEffect(() => {
    const checkIfClickedOutside = e => {
      if (openMenu && navMenuRef.current && !navMenuRef.current.contains(e.target)) {
        setOpenMenu(false);
      }
    };

    document.addEventListener("mousedown", checkIfClickedOutside);

    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [openMenu]);

  useEffect(() => {
    const checkIfClickedOutside = e => {
      if (openCategories && categoriesMenuRef.current && !categoriesMenuRef.current.contains(e.target)) {
        setOpenCategories(false);
      }
    };
    document.addEventListener("mousedown", checkIfClickedOutside);

    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [openCategories]);

  return(
    <nav className={styles.Navigation} ref={navMenuRef}>
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
            <UserWidget/>
            <CartWidget/>
          </div>
        </div>
      </div>
      <ul className={styles.NavBar__list}>
        <div className={styles.NavBar__list__content}>
          <NavLink to="/">Inicio</NavLink>
          <li onClick={handleCategoriesClick}>Categorías&nbsp;<FontAwesomeIcon icon={faCaretDown} className={styles.NavBar__categories}/>
            {openCategories ? <div ref={categoriesMenuRef}><CategoriesNavBar categories={categories}/></div> : <></>}
          </li>
          <NavLink to="/ayuda">Centro de ayuda</NavLink>
          <NavLink to="/nosotros">Nosotros</NavLink>
          <li>Contacto</li>
        </div>
      </ul>
      {openMenu ? 
        <ul className={styles.NavBar__menu}>
          <NavLink to="/user">Mi perfil <FontAwesomeIcon icon={faUser}/></NavLink>
          <li>Mis compras <FontAwesomeIcon icon={faBagShopping}/></li>
          <li onClick={handleCategoriesClick}>Categorías <FontAwesomeIcon icon={faCaretDown}/>
            {openCategories ? <div ref={categoriesMenuRef}><CategoriesNavBar  categories={categories}/></div>: <></>}
          </li>
          <NavLink to="/">Inicio</NavLink>
          <NavLink to="/ayuda">Centro de ayuda</NavLink>
          <NavLink to="/nosotros">Nosotros</NavLink>
          <li>Contacto</li>
        </ul>
        : ""}
    </nav>
  );

}

export default NavBar;