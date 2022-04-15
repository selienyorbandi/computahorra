import Login from "components/Login/Login";
import UserProfile from "components/UserProfile/UserProfile";
import { useAuthContext } from "context/AuthContext";
import styles from "./styles.module.css";

function UserContainer() {
  const { user } = useAuthContext();

  return (
    <div className={styles.UserContainer}>
      {user ? <UserProfile/> : <Login/>}
      {console.log(user)}
    </div>
  );

}

export default UserContainer;