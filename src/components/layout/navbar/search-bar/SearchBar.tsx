import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

import styles from "./styles.module.css";
import { useState } from "react";

function SearchBar() {
  const navigate = useNavigate();
  const [searchKeywords, setSearchKeywords] = useState<string>("");

  return (
    <form className={styles.SearchBar} onSubmit={() => navigate(`/search/${searchKeywords}`)}>
      <input
        type="textarea"
        placeholder="Buscar"
        onChange={e => setSearchKeywords(e.target.value)}
      />
      <button type="submit" aria-label="Buscar">
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </button>
    </form>
  );
}

export default SearchBar;
