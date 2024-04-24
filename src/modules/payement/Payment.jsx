import React, { useEffect, useState } from "react";
import PaymentDeliveryAddress from "./PaymentDeliveryAddress";
import PaymentReviewItem from "./PaymentReviewItem";
import PaymentMethod from "./PaymentMethod";
import styles from "./styles/Payment.module.css";
import { Link } from "react-router-dom";
import { useStateValue } from "../../hooks/useStateValue";
import { CHECKOUT_ROUTE } from "../../constant/routesApp";
import { getBasketSize } from "../../utils/reducer";
import { Skeleton } from "@mui/material";
const Payment = () => {
  const [{ basket, user }, dispatch] = useStateValue();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <div className={styles.payment}>
      {!loading ? (
        <>
          <h1>
            Checkout (
            <Link to={CHECKOUT_ROUTE} className={styles.payment__link}>
              {getBasketSize(basket)} items
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
        </>
      ) : (
        <PaymentSkeleton />
      )}
    </div>
  );
};

const PaymentSkeleton = () => {
  return (
    <>
      <h1 className={styles.payment__link}>
        <Skeleton
          variant="rectangular"
          width={200}
          height={54}
          sx={{ margin: "auto" }}
        />
      </h1>
      <div className={styles.payment__container}>
        <div className={styles.payment__section}>
          <Skeleton
            variant="rectangular"
            width={200}
            height={21}
            sx={{ flex: "0.2", marginRight: "20px" }}
          />
          <Skeleton
            variant="rectangular"
            width={200}
            height={21}
            sx={{ flex: "0.8" }}
          />
        </div>
        <div className={styles.payment__section}>
          <Skeleton
            variant="rectangular"
            width={200}
            height={21}
            sx={{ flex: "0.2", marginRight: "20px" }}
          />
          <Skeleton
            variant="rectangular"
            width={200}
            height={180}
            sx={{ flex: "0.8" }}
          />
        </div>
        <div className={styles.payment__section}>
          <Skeleton
            variant="rectangular"
            width={200}
            height={21}
            sx={{ flex: "0.2", marginRight: "20px" }}
          />
          <Skeleton
            variant="rectangular"
            width={200}
            height={160}
            sx={{ flex: "0.8" }}
          />
        </div>
      </div>
    </>
  );
};

export default Payment;
