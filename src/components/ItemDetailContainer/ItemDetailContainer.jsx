import { useState, useEffect } from "react";
import { getItems } from "../../helpers/getItems";
import ItemDetail from "./ItemDetail/ItemDetail";

function ItemDetailContainer({id}) {
  
  const [item, setItem] = useState({});

  useEffect(() => {
    setTimeout(()=>{
      getItems
      .then(response => response.find(item => item.id === id)) //.json()
      .then(result => setItem(result))
      .catch(err => console.log(err));
    },400)
  }, [id]);

  return (
    <article>
      <ItemDetail item={item}/>
    </article>
  )
}

export default ItemDetailContainer