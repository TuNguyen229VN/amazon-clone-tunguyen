import React from "react";
import styles from "./styles/Checkout.module.css";
import Subtotal from "./Subtotal";
import CheckoutProduct from "./CheckoutProduct";
import { useStateValue } from "../../hooks/useStateValue";
import CurrencyFormat from "react-currency-format";
import { getBasketTotal } from "../../utils/reducer";
const Checkout = () => {
  const [{ basket, user }, dispatch] = useStateValue();
  return (
    <div className={styles.checkout}>
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

      <div className={styles.checkout__right}>
        <Subtotal></Subtotal>
      </div>
    </div>
  );
};

export default Checkout;
