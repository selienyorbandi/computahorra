import Login from "components/Login/Login";
import UserProfile from "components/UserProfile/UserProfile";
import { useAuthContext } from "context/AuthContext";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { useEffect } from "react";
import styles from "./styles.module.css";

function UserContainer() {
  const { user, setUserData } = useAuthContext();

  useEffect(() => {
    if (user) {
      const db = getFirestore();
      const queryDb = doc(db,"users", user.uid);
      getDoc(queryDb)
        .then(response => setUserData({id: response.id, ...response.data()}))
        .catch(err => console.log(err));
    }
  }, [setUserData, user]);

  return (
    <div className={styles.UserContainer}>
      
      {user ? <UserProfile/> : <Login/>}
    </div>
  );

}

export default UserContainer;