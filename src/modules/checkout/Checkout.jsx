import React, { useEffect, useState } from "react";
import styles from "./styles/Checkout.module.css";
import Subtotal from "./Subtotal";
import CheckoutProduct from "./CheckoutProduct";
import { useStateValue } from "../../hooks/useStateValue";
import CurrencyFormat from "react-currency-format";
import { getBasketTotal } from "../../utils/reducer";
import { Skeleton } from "@mui/material";
const Checkout = () => {
  const [{ basket, user }, dispatch] = useStateValue();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false)

  }, [])

  return (
    <div className={styles.checkout}>
      {!loading ? (
        <div className={styles.checkout__left}>
          <div className="">
            <h2 className={styles.checkout__title}>
              {Object.keys(basket).length > 0
                ? "Shopping Cart"
                : "Your Amazon Cart is empty"}
            </h2>
            <p className={styles.checkout__selectAll}>Select all items</p>
            <p className={styles.checkout__priceTitle}>Price</p>
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
                    Subtotal ({Object.keys(basket).length ?? 0} items):
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
            <div className={styles.OrderItemSkeleton__WrapLeft}>
              <Skeleton variant="rectangular" height={180} width={180} />
              <div className={styles.OrderItemSkeleton__Text}>
                <Skeleton
                  variant="rectangular"
                  height={22}
                  width={120}
                  sx={{ marginBottom: "10px" }}
                />
                <Skeleton
                  variant="rectangular"
                  height={22}
                  width={140}
                  sx={{ marginBottom: "10px" }}
                />
                <Skeleton
                  variant="rectangular"
                  height={22}
                  width={140}
                  sx={{ marginBottom: "10px" }}
                />
              </div>
            </div>
            <Skeleton variant="rectangular" height={22} width={100} />
          </div>
        ))}
      </div>
      <div className={styles.checkout__totalBottom}>
      <Skeleton variant="rectangular" height={22} width={187} />
      </div>
    </div>
  );
};
export default Checkout;
