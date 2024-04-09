import React from "react";
import styles from "../../styles/Checkout.module.css";
import Ad from "../../assets/ad.jpg";
import Subtotal from "./Subtotal";
import CheckoutProduct from "./CheckoutProduct";
import { useStateValue } from "../../hooks/useStateValue";
const Checkout = () => {
  const [{ basket, user }, dispatch] = useStateValue();
  return (
    <div className={styles.checkout}>
      <div className={styles.checkout__left}>
        <img src={Ad} alt="product-image" className={styles.checkout__ad} />

        <div className="">
          <h3>Hello, {user?.email}</h3>
          <h2 className={styles.checkout__title}>
            {basket?.length > 0
              ? "Your shopping Basket"
              : "Your Amazon Cart is empty"}
          </h2>
          {basket?.length > 0 &&
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
      </div>

      <div className={styles.checkout__right}>
        <Subtotal></Subtotal>
      </div>
    </div>
  );
};

export default Checkout;
