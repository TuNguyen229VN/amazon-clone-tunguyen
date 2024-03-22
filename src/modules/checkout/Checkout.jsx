import React from "react";
import "../../styles/Checkout.css";
import Ad from "../../assets/ad.jpg";
import Subtotal from "./Subtotal";
const Checkout = () => {
  return (
    <div className="checkout">
      <div className="checkout__left">
        <img src={Ad} alt="product-image" className="checkout__ad" />

        <div className="">
          <div className="checkout__title">Your shopping Basket</div>
        </div>
      </div>

      <div className="checkout__right">
        <Subtotal></Subtotal>
      </div>
    </div>
  );
};

export default Checkout;
