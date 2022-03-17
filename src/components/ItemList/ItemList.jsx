
import Item from "components/Item/Item";

function ItemList({items}){
  return(
    <>
      {items.map(item => <Item item={item} key={item.id}/>)}
    </>
  );
}

export default ItemList;