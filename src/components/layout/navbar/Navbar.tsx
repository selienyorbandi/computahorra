import { useState, useRef } from "react";
import { NavLink } from "react-router-dom";
import { query, collection } from "firebase/firestore";
import { useFirestoreQueryData } from "@react-query-firebase/firestore";
import { firestore } from "../../../firebase/firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faBagShopping, faCaretDown } from "@fortawesome/free-solid-svg-icons";

import styles from "./styles.module.css";
import logo from "../../../assets/img/brandLogo.png";
import SearchBar from "./search-bar/SearchBar";
import UserWidget from "./user-widget/UserWidget";
import CartWidget from "./cart-widget/CartWidget";
import useOnClickOutside from "../../../hooks/useOnClickOutside";
import CategoriesDropdown from "./categories-dropdown/CategoriesDropdown";
import { ICategory } from "../../../models/category.interface";

function NavBar() {
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const [openCategories, setOpenCategories] = useState<boolean>(false);
  const categoriesMenuRef = useRef<HTMLDivElement>(null);
  const navMenuRef = useRef<HTMLDivElement>(null);

  const clickOutsideHandler = () => {
    setOpenMenu(false);
    setOpenCategories(false);
  };

  useOnClickOutside(navMenuRef, clickOutsideHandler);

  const handleMenuClick = () => {
    setOpenCategories(false);
    if (openMenu) {
      setOpenMenu(false);
    } else {
      setOpenMenu(true);
    }
  };
  const handleCategoriesClick = () => {
    openCategories ? setOpenCategories(false) : setOpenCategories(true);
  };

  const refGetCategories = query(collection(firestore, "categories"));
  const queryCategories = useFirestoreQueryData(
    ["categories"],
    refGetCategories,
    {
      subscribe: false,
      source: "cache",
    },
    {
      refetchOnWindowFocus: false,
      refetchInterval: 30 * 6 * 1000,
      refetchIntervalInBackground: false,
    }
  );

  const categories = () => {
    return queryCategories.data as ICategory[];
  };

  return (
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
              <img src={logo} alt="Logo de computahorra" width="132" height="44" />
            </div>
          </NavLink>
          <SearchBar />
          <div className={styles.NavBar__icons}>
            <UserWidget />
            <CartWidget />
          </div>
        </div>
      </div>
      <div className={styles.NavBar__list}>
        <ul className={styles.NavBar__list__content}>
          <li>
            <NavLink to="/">Inicio</NavLink>
          </li>
          <li onClick={handleCategoriesClick}>
            Categorías&nbsp;
            <FontAwesomeIcon icon={faCaretDown} className={styles.NavBar__categories} />
            {openCategories && queryCategories.data ? (
              <div ref={categoriesMenuRef}>
                <CategoriesDropdown categories={categories()} />
              </div>
            ) : (
              <></>
            )}
          </li>
          <li>
            <NavLink to="/ayuda">Centro de ayuda</NavLink>
          </li>
          <li>
            <NavLink to="/Contact">Contacto</NavLink>
          </li>
        </ul>
      </div>
      {openMenu ? (
        <ul className={styles.NavBar__menu}>
          <NavLink to={"/"}>
            <div className={styles.NavBar__menu__brandLogo}>
              <img src={logo} alt="Logo de computahorra" width="132" height="44" />
            </div>
            <hr />
          </NavLink>
          <NavLink to="/usuario">
            Mi perfil <FontAwesomeIcon icon={faUser} />
          </NavLink>
          <li>
            Mis compras <FontAwesomeIcon icon={faBagShopping} />
          </li>
          <li onClick={handleCategoriesClick}>
            Categorías <FontAwesomeIcon icon={faCaretDown} />
            {openCategories && queryCategories.data ? (
              <div ref={categoriesMenuRef}>
                <CategoriesDropdown categories={categories()} />
              </div>
            ) : (
              <></>
            )}
          </li>
          <NavLink to="/">Inicio</NavLink>
          <NavLink to="/ayuda">Centro de ayuda</NavLink>
          <NavLink to="/contacto">Contacto</NavLink>
        </ul>
      ) : (
        ""
      )}
    </nav>
  );
}

export default NavBar;
