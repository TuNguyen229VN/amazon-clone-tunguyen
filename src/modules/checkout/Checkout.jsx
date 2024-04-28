import React, { useEffect, useState } from "react";
import styles from "./styles/Checkout.module.css";
import Subtotal from "./Subtotal";
import CheckoutProduct from "./CheckoutProduct";
import { useStateValue } from "../../hooks/useStateValue";
import CurrencyFormat from "react-currency-format";
import { getBasketTotal } from "../../utils/reducer";
import { Skeleton, useMediaQuery } from "@mui/material";
import { useTranslation } from "react-i18next";
const Checkout = () => {
  const [t, i18n] = useTranslation("global");
  const [{ basket, user }, dispatch] = useStateValue();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(false);
  }, []);

  return (
    <div className={styles.checkout}>
      {!loading ? (
        <div className={styles.checkout__left}>
          <div className="">
            <h2 className={styles.checkout__title}>
              {Object.keys(basket).length > 0
                ? t("order.Shopping Cart")
                : t("order.Your Amazon Cart is empty")}
            </h2>
            <p className={styles.checkout__selectAll}>
              {t("order.Select all items")}
            </p>
            <p className={styles.checkout__priceTitle}>{t("order.Price")}</p>
            {Object.keys(basket).length > 0 &&
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
          </div>
          <div className={styles.checkout__totalBottom}>
            <CurrencyFormat
              renderText={(value) => (
                <>
                  <p>
                    {t("order.Subtotal")} ({Object.keys(basket).length ?? 0}{" "}
                    {t("order.items")}):
                    <strong> {value}</strong>
                  </p>
                </>
              )}
              decimalScale={2}
              value={getBasketTotal(basket)}
              displayType={"text"}
              thousandSeparator={true}
              prefix={"$"}
            />
          </div>
        </div>
      ) : (
        <CheckoutLeftSkeleton />
      )}
      <div className={styles.checkout__right}>
        <Subtotal loading={loading}></Subtotal>
      </div>
    </div>
  );
};

const CheckoutLeftSkeleton = () => {
  const is1200Screen = useMediaQuery("(max-width: 1200px)");
  const is1024Screen = useMediaQuery("(max-width: 1024px)");
  const is768Screen = useMediaQuery("(max-width: 768px)");
  const is480Screen = useMediaQuery("(max-width: 480px)");
  return (
    <div className={styles.checkout__left}>
      <div className="">
        <Skeleton
          variant="rectangular"
          width={200}
          height={36}
          sx={{ marginBottom: "5px" }}
        />
        <Skeleton variant="rectangular" width={100} height={27} />
        <Skeleton
          variant="rectangular"
          width={50}
          height={27}
          sx={{ marginBlock: "5px", marginLeft: "auto" }}
        />
        {Array(2)
          .fill()
          .map((_, index) => (
            <div key={index} className={styles.OrderItemSkeleton__Wrap}>
              <Skeleton
                variant="rectangular"
                height={is1200Screen ? "200px" : "180px"}
                width={is768Screen ? "100%" : is1200Screen ? "200px" : "180px"}
                sx={{ flexShrink: "0" }}
              />
              <div className={styles.OrderItemSkeleton__WrapLeft}>
                <div className={styles.OrderItemSkeleton__Text}>
                  <Skeleton
                    variant="rectangular"
                    height={
                      is480Screen
                        ? "16px"
                        : is768Screen
                        ? "18px"
                        : is1024Screen
                        ? "20px"
                        : "22px"
                    }
                    width={
                      is480Screen ? "100%" : is1024Screen ? "200px" : "140px"
                    }
                    sx={{ marginBottom: "10px" }}
                  />
                  <Skeleton
                    variant="rectangular"
                    height={
                      is480Screen
                        ? "16px"
                        : is768Screen
                        ? "18px"
                        : is1024Screen
                        ? "20px"
                        : "22px"
                    }
                    width={
                      is480Screen ? "100%" : is1024Screen ? "200px" : "140px"
                    }
                    sx={{ marginBottom: "10px" }}
                  />
                  <Skeleton
                    variant="rectangular"
                    height={
                      is480Screen
                        ? "16px"
                        : is768Screen
                        ? "18px"
                        : is1024Screen
                        ? "20px"
                        : "22px"
                    }
                    width={
                      is480Screen ? "100%" : is1024Screen ? "200px" : "140px"
                    }
                    sx={{ marginBottom: "10px" }}
                  />
                </div>
                <Skeleton
                  variant="rectangular"
                  height={
                    is480Screen
                      ? "16px"
                      : is768Screen
                      ? "18px"
                      : is1024Screen
                      ? "20px"
                      : "22px"
                  }
                  width={100}
                />
              </div>
            </div>
          ))}
      </div>
      <div className={styles.checkout__totalBottom}>
        <Skeleton
          variant="rectangular"
          height={
            is480Screen
              ? "16px"
              : is768Screen
              ? "18px"
              : is1024Screen
              ? "20px"
              : "22px"
          }
          width={is480Screen ? "100%" : "187px"}
        />
      </div>
    </div>
  );
};
export default Checkout;
