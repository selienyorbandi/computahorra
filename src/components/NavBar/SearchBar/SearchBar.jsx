import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

import styles from "./styles.module.css";

function SearchBar() {
  const navigate = useNavigate();

  const handleSubmit = () => {
    const keywords = document.getElementById("searchKeywords");
    navigate(`/search/${keywords.value}`);
  };

  return (
    <form className={styles.SearchBar} onSubmit={handleSubmit}>
      <input type="textarea" placeholder="Buscar" id="searchKeywords" />
      <button type="submit" aria-label="Buscar">
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </button>
    </form>
  );
}

export default SearchBar;
