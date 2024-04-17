import React, { useEffect, useState } from "react";
import styles from "./styles/Order.module.css";
import { db } from "../../firebase/firebase-config";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useStateValue } from "../../hooks/useStateValue";
import OrderItem from "./OrderItem";
import { ButtonPrimary } from "../../components/button";
import { InputSearch } from "../../components/input";
import { Link } from "react-router-dom";
import { PRODUCT_ROUTE } from "../../constant/routesApp";
import { dataSelectSortOrder } from "../../data_av/dataSelectSort";
import { SelectBox } from "../../components/selecbox";

const Order = () => {
  const [{ user, basket }, dispatch] = useStateValue();
  const [order, setOrder] = useState([]);
  useEffect(() => {
    if (user?.auth) {
      const ordersQuery = query(
        collection(db, "users", user?.auth?.uid, "orders"),
        orderBy("created", "desc")
      );

      const unsubscribe = onSnapshot(ordersQuery, (querySnapshot) => {
        const ordersData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }));
        setOrder(ordersData);
      });
    } else {
      setOrder([]);
    }
  }, []);

  return (
    <div className={styles.orders}>
      <div className={styles.orders__title}>
        <h1>Your Orders</h1>
        <div className={styles.orders__search}>
          <InputSearch placeholder="Search all orders" />
          <ButtonPrimary
            text="Search Orders"
            className={styles.orders__buttonSearch}
          />
        </div>
      </div>
      <div className={styles.orders__selectBox}>
        <SelectBox dataSelect={dataSelectSortOrder} />
      </div>
      <div className={styles.orders__order}>
        {order.length > 0 &&
          order?.map((item, index) => <OrderItem order={item} key={index} />)}

        {order.length <= 0 && (
          <p className={styles.order__dont}>
            Looks like you didn&apos;t place an order.{" "}
            <Link to={PRODUCT_ROUTE}>View more prodcuts.</Link>
          </p>
        )}
      </div>
    </div>
  );
};

export default Order;
