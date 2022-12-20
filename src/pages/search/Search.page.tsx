import { useState } from "react";
import { useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";
import { search } from "ss-search";
import Button from "../../components/button/Button";
import Loader from "../../components/loader/Loader";
import { IItem } from "../../models/item.interface";
import styles from "./styles.module.css";
import ItemList from "../../components/items/item-list/ItemList";
import notFoundImg from "../../assets/img/not-found.gif";

function Search() {
  const { keywords } = useParams();
  const [searchResults, setSearchResults] = useState<IItem[]>([]);

  const { isLoading } = useQuery(
    "repoData",
    () => fetch("https://api.npoint.io/f2c827eee89e5f676ceb").then(res => res.json()),
    {
      onSuccess(data) {
        if (keywords) {
          const results = search(data, ["title", "brandId", "categoryId"], keywords);
          if (results && results.length) {
            setSearchResults(results as IItem[]);
          }
        }
      },
      staleTime: 30 * 20 * 1000,
    }
  );

  return (
    <section className={styles.Search}>
      {isLoading ? (
        <Loader />
      ) : searchResults.length ? (
        <>
          <header>
            <h1>{keywords ? keywords[0].toUpperCase() + keywords.slice(1) : " "}</h1>
          </header>
          <ItemList items={searchResults} /> : <></>
        </>
      ) : (
        <div className={styles.Search__doesntExist}>
          <img src={notFoundImg} alt="Producto no encontrado" width="250px" height="140px" />
          <h1>No se ha encontrado ningún resultado</h1>
          <Link to="/">
            <Button message="Volver al inicio" type="primary" />
          </Link>
        </div>
      )}
    </section>
  );
}
export default Search;
