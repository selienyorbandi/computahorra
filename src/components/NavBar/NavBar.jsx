import { useState } from "react";
import logo from "../../assets/img/brandLogo.png";
import styles from "./styles.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faBagShopping, faCaretDown, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import CategoriesNavBar from "./CategoriesNavBar/CategoriesNavBar";
import SearchBar from "./SearchBar/SearchBar";
import CartWidget from "./CartWidget/CartWidget";

function NavBar(){
    const [openMenu, setOpenMenu] = useState(false);
    const [openCategories, setOpenCategories] = useState(false);
    
    return(
        <nav className={styles.Navigation}>
            <div className={styles.Navigation__NavBarCnt}>
                <div className={styles.Navigation__NavBar}>
                    <div className={styles.NavBar__btnMenu} onClick={handleMenuClick}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                    <div className={styles.NavBar__brandLogo}>
                        <img src={logo} alt="Computahorra logo" width="132" height="44"/>
                    </div>
                    <SearchBar/>
                    <div className={styles.NavBar__icons}>
                        <span><FontAwesomeIcon icon={faMagnifyingGlass} /></span>
                        <span><FontAwesomeIcon icon={faUser} /></span>
                        <CartWidget totalItems={0}/>
                    </div>
                </div>
            </div>
                <ul className={styles.NavBar__list}>
                    <li onClick={handleCategoriesClick}>Categorías&nbsp;<FontAwesomeIcon icon={faCaretDown}/>
                    {openCategories ? <CategoriesNavBar/> : null}
                    </li>
                    <li>Armá tu pc</li>
                    <li>Centro de ayuda</li>
                    <li>Nosotros</li>
                    <li>Contacto</li>
                </ul>
            {openMenu ? 
                <ul className={styles.NavBar__menu}>
                    <li>Mi perfil <FontAwesomeIcon icon={faUser}/></li>
                    <li>Mis compras <FontAwesomeIcon icon={faBagShopping}/></li>
                    <li onClick={handleCategoriesClick}>Categorías <FontAwesomeIcon icon={faCaretDown}/>
                    {openCategories ? <CategoriesNavBar/> : null}
                    </li>
                    <li>Armá tu pc</li>
                    <li>Centro de ayuda</li>
                    <li>Nosotros</li>
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