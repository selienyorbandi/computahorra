import Item from "../Item/Item";

function ItemList({items}){
    return(
        <>
            {items.map(item => <Item title={item.name} key={item.id} price={item.price} thumbnail={item.img} stock={item.stock} />)}
        </>
    );
}

export default ItemList;