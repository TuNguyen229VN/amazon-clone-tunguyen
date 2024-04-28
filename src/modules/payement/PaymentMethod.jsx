import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useEffect, useId, useState } from "react";
import CurrencyFormat from "react-currency-format";
import { useStateValue } from "../../hooks/useStateValue";
import { getBasketTotal } from "../../utils/reducer";
import { useNavigate } from "react-router-dom";
import axios from "../../axios/axios";
import { db } from "../../firebase/firebase-config";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import styles from "./styles/Payment.module.css";
import { ORDER_ROUTE } from "../../constant/routesApp";
import { Spinner } from "../../components/loading";
import { useTranslation } from "react-i18next";

const PaymentMethod = () => {
  const [t, i18n] = useTranslation("global");
  const navigate = useNavigate();
  const [{ user, basket }, dispatch] = useStateValue();
  const stripe = useStripe();
  const elements = useElements();

  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState("");
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState(true);
  useEffect(() => {
    // generate the special stripe secret whic allows us to charge a customer

    const getClientSecret = async () => {
      const response = await axios({
        method: "post",
        url: `/payments/create?total=${getBasketTotal(basket) * 100}`,
      });
      setClientSecret(response.data.clientSecret);
    };
    getClientSecret();
  }, [basket]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (basket.length <= 0) {
      setError("Don't have item to pay");
      return;
    }
    if (!user?.userProfile?.userAddress) {
      setError("Please add your address");
      return;
    }
    if (disabled) {
      setError("Please enter number visa");
      return;
    }
    setError("");
    setProcessing(true);
    const payload = await stripe
      .confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      })
      .then(({ paymentIntent }) => {
        const userDocRef = doc(db, "users", user?.auth?.uid);
        const ordersCollectionRef = collection(userDocRef, "orders");
        const orderDocRef = doc(ordersCollectionRef, paymentIntent.id);
        setDoc(orderDocRef, {
          basket: basket,
          amount: paymentIntent.amount,
          created: paymentIntent.created,
          address: user?.userProfile.userAddress,
        });

        setSucceeded(true);
        setError(null);
        setProcessing(false);
        dispatch({ type: "EMPTY_BASKET" });
        navigate(ORDER_ROUTE);
      });
  };

  const handleChange = (e) => {
    setDisabled(e.empty);
    setError(e.error ? e.error.message : "");
  };
  return (
    <>
      <div className={styles.payment__title}>
        <h3>{t("order.Payment Method")}</h3>
      </div>
      <div className={styles.payment__details}>
        <form onSubmit={handleSubmit}>
          <CardElement onChange={handleChange} />

          <div className={styles.payment__priceContainer}>
            <CurrencyFormat
              renderText={(value) => (
                <>
                  <h3>{t("order.Order Total")} {value}</h3>
                </>
              )}
              decimalScale={2}
              value={getBasketTotal(basket)}
              displayType={"text"}
              thousandSeparator={true}
              prefix={"$"}
            />
            {basket?.length > 0 && (
              <button
                disabled={processing || succeeded}
                className={`${styles.buttonPayment} ${
                  processing && styles.disabled
                }`}
              >
                <span>{processing ? <Spinner /> : t("order.Buy Now")}</span>
              </button>
            )}
          </div>
          {/* Error */}
          {error && <div className={styles.paymentError}>*{t(`order.${error}`)}*</div>}
        </form>
      </div>
    </>
  );
};

export default PaymentMethod;
