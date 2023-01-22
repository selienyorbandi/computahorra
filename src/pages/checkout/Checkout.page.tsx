/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";
import { adaptCartItemsToMPItems } from "../../adapters/mercadoPagoItems.adapter";
import Summary from "../../components/summary/Summary";
import { useCartContext } from "../../context/CartContext";
import { ICartContext } from "../../models/cartcontext.interface";
import EmptyCart from "../cart/components/empty-cart/EmptyCart";
import { Link } from "react-router-dom";
import Button from "../../components/button/Button";
import styles from "./styles.module.css";

declare const MercadoPago: any;

function Checkout() {
  const { cartList } = useCartContext() as ICartContext;

  const preferenceBody = {
    items: adaptCartItemsToMPItems(cartList),
    payer: {
      email: "",
      name: "",
      surname: "",
      phone: {},
      identification: {},
      address: {},
    },
    notification_url: import.meta.env.VITE_PAYMENT_WEBHOOK,
  };

  const createPreference = (mp: any) => {
    fetch("https://api.mercadopago.com/checkout/preferences", {
      body: JSON.stringify(preferenceBody),
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_MERCADOPAGO_ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
      method: "POST",
    })
      .then(res => res.json())
      .then(result => {
        mp.checkout({
          preference: {
            id: result.id,
          },
          render: {
            container: ".mercadopagoBtn",
            label: "Pagar",
          },
          theme: {
            elementsColor: "#6c2f9a",
            headerColor: "#6c2f9a",
          },
        });
      });
  };

  useEffect(() => {
    if (cartList.length) {
      const mp = new MercadoPago(import.meta.env.VITE_MERCADOPAGO_PUBLIC_KEY, {
        locale: "es-AR",
      });
      createPreference(mp);
    }
  }, [cartList]);

  return (
    <section className={styles.Checkout}>
      {cartList.length ? (
        <Summary checkout={true} cart={false}>
          <div className={styles.Checkout__Btns}>
            <div className="mercadopagoBtn"></div>
            <Link to="/">
              <Button message="Agregar productos" type="secondary" />
            </Link>
          </div>
        </Summary>
      ) : (
        <EmptyCart />
      )}
    </section>
  );
}

export default Checkout;
