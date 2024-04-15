import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import CheckoutProduct from "../checkout/CheckoutProduct";
import CurrencyFormat from "react-currency-format";
import styles from "./styles/Order.module.css";

const OrderItem = ({ order = [] }) => {
  return (
    <div className={styles.order}>
      <div className={styles.order__top}>
        <div className={styles.oder__topTitle}>
          <div className={styles.order__topTitleItem}>
            <h2>Order Placed</h2>
            <p>
              {moment.unix(order?.data.created).format("MMMM Do YYYY, h:mma")}
            </p>
          </div>
          <CurrencyFormat
            renderText={(value) => (
              <>
                <h3 className={styles.order__total}>
                  Total <p>{value}</p>
                </h3>
              </>
            )}
            decimalScale={2}
            value={order.data.amount / 100}
            displayType={"text"}
            thousandSeparator={true}
            prefix={"$"}
          />
        </div>
        <p className={styles.order__id}>
          Order
          <small>#{order.id}</small>
        </p>
      </div>
      {order?.data.basket?.map((item, index) => (
        <CheckoutProduct
          key={index}
          id={item.id}
          title={item.title}
          image={item.image}
          price={item.price}
          rating={item.rating}
          quantity={item.quantity}
          hideButton
          className={styles.order__checkoutProduct}
        />
      ))}
    </div>
  );
};

OrderItem.propTypes = {
  order: PropTypes.object,
};
export default OrderItem;
