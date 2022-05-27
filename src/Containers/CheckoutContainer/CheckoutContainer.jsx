import { useState } from "react";
import { Link } from "react-router-dom";
import { addDoc, collection, getFirestore } from "firebase/firestore";

import { useCartContext } from "context/CartContext";
import { useAuthContext } from "context/AuthContext";

import Summary from "components/Summary/Summary";
import EmptyCart from "components/EmptyCart/EmptyCart";
import Button from "components/Button/Button";
import Login from "components/Login/Login";

import styles from "./styles.module.css";

function CheckoutContainer() {
  const { cartList, totalPrice } = useCartContext();
  const { user } = useAuthContext();
  const [id, setId] = useState("");

  const sendOrder = async (e) => {
    let total = totalPrice();
    let orderHardc = {
      buyer: { email: user.email, name: user.displayName },
      items: { cartList },
      date: new Date().toLocaleDateString(),
      total: total,
    };
    const db = getFirestore();
    const ordersCollection = collection(db, "orders");
    addDoc(ordersCollection, orderHardc)
      .then((response) => setId(response.id))
      .catch((err) => console.log(err));
  };

  return (
    <div className={styles.Checkout}>
      {cartList.length > 0 ? (
        <div>
          <div>
            <div className={styles.Checkout__content}>
              <div className={styles.Checkout__UserData}>
                {user ? <></> : <Login redirect={false} />}
              </div>
              <Summary
                checkout
                children={
                  <>
                    {!user && (
                      <>
                        <p className={styles.Checkout__logInRequest}>
                          Inicie sesión para continuar
                        </p>
                      </>
                    )}
                    {!id ? (
                      <>
                        {user && (
                          <p className={styles.Checkout__userIdentifier}>
                            Comprar como {user.email}
                          </p>
                        )}
                        <Button
                          message="Finalizar compra"
                          onClick={sendOrder}
                          primary
                          disabl={user ? false : true}
                        />
                      </>
                    ) : (
                      <>
                        <Link to="/">
                          <Button message={"Volver a inicio"} />
                        </Link>
                        <p className={styles.Checkout__orderId}>Pedido: {id}</p>
                        <h5>Gracias por tu compra</h5>
                        <img
                          src="https://i.postimg.cc/Kjyf7McJ/icons8-pagado.gif"
                          alt="purchase"
                          width="50px"
                        />
                      </>
                    )}
                  </>
                }
              />
            </div>
          </div>
        </div>
      ) : (
        <EmptyCart />
      )}
    </div>
  );
}

export default CheckoutContainer;
