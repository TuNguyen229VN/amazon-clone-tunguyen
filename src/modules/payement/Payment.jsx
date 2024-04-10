import React from "react";
import PaymentDeliveryAddress from "./PaymentDeliveryAddress";
import PaymentReviewItem from "./PaymentReviewItem";
import PaymentMethod from "./PaymentMethod";
import styles from "./styles/Payment.module.css";
import { Link } from "react-router-dom";
import { useStateValue } from "../../hooks/useStateValue";
const Payment = () => {
  const [{ basket, user }, dispatch] = useStateValue();
  return (
    <div className={styles.payment}>
      <h1>
        Checkout (
        <Link to={"/checkout"} className={styles.payment__link}>
          {basket?.length} items
        </Link>
        )
      </h1>

      <div className={styles.payment__container}>
        <div className={styles.payment__section}>
          <PaymentDeliveryAddress />
        </div>
        <div className={styles.payment__section}>
          <PaymentReviewItem />
        </div>
        <div className={styles.payment__section}>
          <PaymentMethod />
        </div>
      </div>
    </div>
  );
};

export default Payment;
