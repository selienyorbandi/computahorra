import Item from "components/Item/Item";

function ItemList({items}){
  return(
    <>
      {items.map(item => <Item title={item.title} key={item.id} price={item.price} thumbnail={item.thumbnail} stock={item.stock} id={item.id}/>)}
    </>
  );
}

export default ItemList;