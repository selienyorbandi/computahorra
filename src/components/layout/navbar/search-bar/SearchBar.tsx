import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

import styles from "./styles.module.css";
import { FormEvent, useState } from "react";

function SearchBar() {
  const navigate = useNavigate();
  const [searchKeywords, setSearchKeywords] = useState<string>("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate(`/search/${searchKeywords}`);
  };

  return (
    <form className={styles.SearchBar} onSubmit={e => handleSubmit(e)}>
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
