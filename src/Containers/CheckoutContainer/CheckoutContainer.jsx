import { useCartContext } from "context/CartContext";
import styles from "./styles.module.css";
import Summary from "components/Summary/Summary";
import EmptyCart from "components/Cart/EmptyCart/EmptyCart";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import Button from "components/Button/Button";
import { useState } from "react";
import Login from "components/Login/Login";
import { useAuthContext } from "context/AuthContext";

function CheckoutContainer() {
  const { cartList, totalPrice } = useCartContext();
  const { user } = useAuthContext();
  const [id, setId] = useState("");

  const sendOrder = async (e) => {
    let total = totalPrice();
    let orderHardc = {
      buyer: {email: user.email, name: user.displayName},
      items: {cartList},
      date: new Date().toLocaleDateString(),
      total: total
    };
    const db = getFirestore();
    const ordersCollection = collection(db, "orders");
    addDoc(ordersCollection, orderHardc)
      .then( response => setId(response.id))
      .catch(err => console.log(err));
  };
  
  return (
    <div className={styles.Checkout}>
      {
        cartList.length > 0? 
          <div>
            <div>
              <div className={styles.Checkout__content}>
                <div className={styles.Checkout__UserData}>
                  {user ? <></> : <Login redirect={false}/>}
                </div> 
                <Summary checkout children={<Button message="Realizar compra" onClick={sendOrder} primary disabl={user ? false : true}/>}/>
              </div>
              <div className={styles.Checkout}>
                {
                  id ? <h4>Gracias por tu compra. Pedido: {id}</h4> : <></>
                }
              </div>
            </div>
          </div>
          :
          <EmptyCart/>
      }
    </div>
  );
}

export default CheckoutContainer;
