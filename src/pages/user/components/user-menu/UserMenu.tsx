import UserMenuItem from "./user-menu-item/UserMenuItem";
import styles from "./styles.module.css";

function UserMenu({
  dispatch,
}: {
  dispatch: React.Dispatch<React.SetStateAction<"datos" | "pedidos" | "suscripciones" | null>>;
}) {
  return (
    <nav>
      <ul className={styles.UserMenu}>
        <UserMenuItem name="datos" dispatch={dispatch} />
        <hr />
        <UserMenuItem name="pedidos" dispatch={dispatch} />
        <hr />
        <UserMenuItem name="suscripciones" dispatch={dispatch} />
      </ul>
    </nav>
  );
}
export default UserMenu;
