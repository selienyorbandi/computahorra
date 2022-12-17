import { IItem } from "../../../models/item.interface";
import Item from "../item/Item";
import styles from "./styles.module.css";

function ItemList({ items }: { items: IItem[] }) {
  return (
    <ul className={styles.ItemList}>
      {items.map((item, key) => (
        <Item item={item} key={`item:${item.id}${key}`} />
      ))}
    </ul>
  );
}

export default ItemList;
