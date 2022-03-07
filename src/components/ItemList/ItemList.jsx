import Item from "../Item/Item";

function ItemList({items}){
    return(
        <>
            {items.map(item => <Item title={item.title} key={item.id} price={item.price} thumbnail={item.img} stock={item.stock} />)}
        </>
    );
}

export default ItemList;