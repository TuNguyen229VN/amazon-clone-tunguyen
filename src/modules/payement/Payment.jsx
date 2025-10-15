import React, { useEffect, useState } from "react";
import PaymentDeliveryAddress from "./PaymentDeliveryAddress";
import PaymentReviewItem from "./PaymentReviewItem";
import PaymentMethod from "./PaymentMethod";
import styles from "./styles/Payment.module.css";
import { Link } from "react-router-dom";
import { useStateValue } from "../../hooks/useStateValue";
import { CHECKOUT_ROUTE } from "../../constant/routesApp";
import { getBasketSize } from "../../utils/reducer";
import { Skeleton, useMediaQuery } from "@mui/material";
import { useTranslation } from "react-i18next";
const Payment = () => {
  const [t, i18n] = useTranslation("global");
  const [{ basket, user }, dispatch] = useStateValue();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    document.title = "Amazon | Payment";
    window.scrollTo(0, 0);
    setLoading(false);
  }, []);

  return (
    <div className={styles.payment}>
      {!loading ? (
        <>
          <h1>
            {t("order.Checkout")} (
            <Link to={CHECKOUT_ROUTE} className={styles.payment__link}>
              {getBasketSize(basket)} {t("order.items")}
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
  const is1200Screen = useMediaQuery("(max-width: 1200px)");
  const is1024Screen = useMediaQuery("(max-width: 1024px)");
  const is768Screen = useMediaQuery("(max-width: 768px)");
  const is480Screen = useMediaQuery("(max-width: 480px)");
  return (
    <>
      <h1 className={styles.payment__link}>
        <Skeleton
          variant="rectangular"
          width={200}
          height={is480Screen ? 42 : is768Screen ? 44 : is1024Screen ? 49 : 54}
          sx={{ margin: "auto" }}
        />
      </h1>
      <div className={styles.payment__container}>
        <div className={styles.payment__section}>
          <Skeleton
            variant="rectangular"
            width={is1024Screen ? "100%" : 200}
            height={21}
            sx={{
              flex: is1024Screen ? null : "0.2",
              marginRight: is1024Screen ? null : "20px",
            }}
          />
          <Skeleton
            variant="rectangular"
            width={is1024Screen ? "100%" : 200}
            height={21}
            sx={{
              flex: is1024Screen ? null : "0.8",
            }}
          />
        </div>
        <div className={styles.payment__section}>
          <Skeleton
            variant="rectangular"
            width={is1024Screen ? "100%" : 200}
            height={21}
            sx={{
              flex: is1024Screen ? null : "0.2",
              marginRight: is1024Screen ? null : "20px",
            }}
          />
          <Skeleton
            variant="rectangular"
            width={is1024Screen ? "100%" : 200}
            height={180}
            sx={{ flex: is1024Screen ? null : "0.8" }}
          />
        </div>
        <div className={styles.payment__section}>
          <Skeleton
            variant="rectangular"
            width={is1024Screen ? "100%" : 200}
            height={21}
            sx={{
              flex: is1024Screen ? null : "0.2",
              marginRight: is1024Screen ? null : "20px",
            }}
          />
          <Skeleton
            variant="rectangular"
            width={is1024Screen ? "100%" : 200}
            height={160}
            sx={{ flex: is1024Screen ? null : "0.8" }}
          />
        </div>
      </div>
    </>
  );
};

export default Payment;
