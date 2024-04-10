import React from "react";
import { useStateValue } from "../../hooks/useStateValue";
import styles from "./styles/Payment.module.css";
const PaymentDeliveryAddress = () => {
  const [{ basket, user }, dispatch] = useStateValue();
  return (
    <>
      <div className={styles.payment__title}>
        <h3>Delivery Address</h3>
      </div>
      <div className={styles.payment__address}>
        <p>{user?.email}</p>
        <p>123 React Lane</p>
        <p>Binh Thanh ward, HCM city</p>
      </div>
    </>
  );
};

export default PaymentDeliveryAddress;
