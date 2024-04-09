import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import CheckoutProduct from "../checkout/CheckoutProduct";
import CurrencyFormat from "react-currency-format";
import styles from "../../styles/Order.module.css";

const OrderItem = ({ order = [] }) => {
  return (
    <div className={styles.order}>
      <h2>Order</h2>
      <p>{moment.unix(order?.data.created).format("MMMM Do YYYY, h:mma")}</p>
      <p className={styles.order__id}>
        <small>{order.id}</small>
      </p>
      {order?.data.basket?.map((item, index) => (
        <CheckoutProduct
          key={index}
          id={item.id}
          title={item.title}
          image={item.image}
          price={item.price}
          rating={item.rating}
          hideButton
        />
      ))}
      <CurrencyFormat
        renderText={(value) => (
          <>
            <h3 className={styles.order__total}>Order Total: {value}</h3>
          </>
        )}
        decimalScale={2}
        value={order.data.amount / 100}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"$"}
      />
    </div>
  );
};

OrderItem.propTypes = {
  order: PropTypes.object,
};
export default OrderItem;
