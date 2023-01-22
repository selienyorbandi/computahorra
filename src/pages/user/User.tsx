import { useAuthSignOut, useAuthUser } from "@react-query-firebase/auth";
import { useFirestoreQuery } from "@react-query-firebase/firestore";
import { collection, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/button/Button";
import Loader from "../../components/loader/Loader";
import { auth, firestore } from "../../firebase/firebase";
import UserHeader from "./components/user-header/UserHeader";
import UserMenu from "./components/user-menu/UserMenu";
import UserData from "./sections/datos/UserData";
import UserOrders from "./sections/pedidos/UserOrders";
import UserSuscriptions from "./sections/suscripciones/UserSuscriptions";
import styles from "./styles.module.css";

function User() {
  const user = useAuthUser(["user"], auth);
  const [userOption, setUserOption] = useState<"datos" | "pedidos" | "suscripciones" | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user.data) {
      navigate("/login");
    }
  }, [user]);

  const refGetUser = query(
    collection(firestore, "users"),
    where("uid", "==", user.data ? user.data.uid : "")
  );
  const queryUserData = useFirestoreQuery(["users", user.data ? user.data.uid : ""], refGetUser, {
    subscribe: true,
  });

  const logOutMutation = useAuthSignOut(auth);
  const handleLogOut = () => {
    logOutMutation.mutate();
  };

  const SectionsByUserOption = () => {
    if (userOption === "datos" && user.data && queryUserData.data && queryUserData.data.docs.length)
      return (
        <UserData
          userData={queryUserData.data.docs[0].data()}
          docId={queryUserData.data?.docs[0].id}
        />
      );
    if (userOption === "datos" && user.data && !queryUserData.data?.docs.length) {
      return <UserData userData={undefined} docId={""} />;
    }
    if (userOption === "pedidos") return <UserOrders />;
    if (userOption === "suscripciones") return <UserSuscriptions />;
    return (
      <>
        <UserMenu dispatch={setUserOption} />
        <Button message="Cerrar sesión" type="danger" onClick={() => handleLogOut()} />
      </>
    );
  };

  const handleName = () => {
    if (queryUserData && queryUserData.data && queryUserData.data.docs.length) {
      const userName = queryUserData.data.docs[0].data().name;
      const userSurname = queryUserData.data.docs[0].data().surname;
      if (userName && userSurname) return `${userName + " " + userSurname}`;
      if (userName && !userSurname) return userName;
    }
    if (user.data?.displayName) return user.data?.displayName;
    return "Usuario";
  };

  return (
    <section className={styles.User}>
      {user.isSuccess && queryUserData.isSuccess ? (
        <>
          <UserHeader
            name={handleName()}
            hasBackBtn={userOption !== null}
            resetOption={setUserOption}
          />
          {<SectionsByUserOption />}
        </>
      ) : (
        <></>
      )}
      {user.isLoading ? <Loader /> : <></>}
    </section>
  );
}
export default User;
