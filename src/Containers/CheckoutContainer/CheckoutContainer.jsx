import { useCartContext } from "context/CartContext";
import styles from "./styles.module.css";
import Summary from "components/Summary/Summary";
import EmptyCart from "components/Cart/EmptyCart/EmptyCart";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import Register from "components/Register/Register";
import Button from "components/Button/Button";
import { useState } from "react";

function CheckoutContainer() {
  const { cartList, userData, isUserData, totalPrice } = useCartContext();
  const [id, setId] = useState("");

  const sendOrder = async (e) => {
    let total = totalPrice();
    let orderHardc = {
      buyer: userData,
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
            <div className={styles.Checkout__content}>
              <Register/> 
              <div className={styles.registerForm}>
              </div>
              <Summary checkout/>
              
            </div>
            { isUserData ? <Button message="Realizar compra" onClick={sendOrder} /> : <></>}
            <br/>
            {id ? <p>Gracias por tu compra. Pedido: {id}</p> : <></>}
          </div>
          :
          <EmptyCart/>
      }
    </div>
  );
}

export default CheckoutContainer;
