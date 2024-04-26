import React from "react";
import { useStateValue } from "../../hooks/useStateValue";
import CheckoutProduct from "../checkout/CheckoutProduct";
import styles from "./styles/Payment.module.css";
import { Link } from "react-router-dom";
import { PRODUCT_ROUTE } from "../../constant/routesApp";

const PaymentReviewItem = () => {
  const [{ basket, user }, dispatch] = useStateValue();
  return (
    <>
      <div className={styles.payment__title}>
        <h3>Review items and delivery</h3>
      </div>
      <div className={styles.payment__items}>
        {basket?.length > 0 &&
          basket.map((item, index) => (
            <CheckoutProduct
              key={index}
              id={item.id}
              title={item.title}
              image={item.image}
              price={item.price}
              rating={item.rating}
              quantity={parseInt(item.quantity)}
              stock={item.stock}
            />
          ))}
        {basket?.length <= 0 && (
          <p className={styles.payment__empty}>
            Items Empty. <Link to={PRODUCT_ROUTE} className={styles.viewmore}>View more product</Link>
          </p>
        )}
      </div>
    </>
  );
};

export default PaymentReviewItem;
