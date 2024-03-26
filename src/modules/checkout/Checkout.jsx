import React from "react";
import "../../styles/Checkout.css";
import Ad from "../../assets/ad.jpg";
import Subtotal from "./Subtotal";
import CheckoutProduct from "./CheckoutProduct";
import { useStateValue } from "../../hooks/useStateValue";
const Checkout = () => {
  const [{ basket }, dispatch] = useStateValue();
  return (
    <div className="checkout">
      <div className="checkout__left">
        <img src={Ad} alt="product-image" className="checkout__ad" />

        <div className="">
          <div className="checkout__title">
            {basket?.length > 0
              ? "Your shopping Basket"
              : "Your Amazon Cart is empty"}
          </div>
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
          {basket?.length <= 0 && <p></p>}
        </div>
      </div>

      <div className="checkout__right">
        <Subtotal></Subtotal>
      </div>
    </div>
  );
};

export default Checkout;
