import React from "react";
import PaymentDeliveryAddress from "./PaymentDeliveryAddress";
import PaymentReviewItem from "./PaymentReviewItem";
import PaymentMethod from "./PaymentMethod";
import "../../styles/Payment.css";
import { Link } from "react-router-dom";
import { useStateValue } from "../../hooks/useStateValue";
const Payment = () => {
  const [{ basket, user }, dispatch] = useStateValue();
  return (
    <div className="payment">
      <h1>
        Checkout (<Link to={"/checkout"} className="payment__link">{basket?.length} items</Link>)
      </h1>

      <div className="payment__container">
        <div className="payment__section">
          <PaymentDeliveryAddress />
        </div>
        <div className="payment__section">
          <PaymentReviewItem />
        </div>
        <div className="payment__section">
          <PaymentMethod />
        </div>
      </div>
    </div>
  );
};

export default Payment;
