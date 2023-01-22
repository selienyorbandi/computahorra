import { useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { search } from "ss-search";
import Loader from "../../components/loader/Loader";
import { IItem } from "../../models/item.interface";
import styles from "./styles.module.css";
import ItemList from "../../components/items/item-list/ItemList";
import NotFoundItems from "../../components/not-found/not-found-items/NotFoundItems";

function Search() {
  const { keywords } = useParams();
  const [searchResults, setSearchResults] = useState<IItem[]>([]);

  const { isLoading } = useQuery(
    "searchItems",
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
        <NotFoundItems />
      )}
    </section>
  );
}
export default Search;
