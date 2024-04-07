import React, { useEffect, useState } from "react";
import "../../styles/Order.css";
import { db } from "../../firebase/firebase-config";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useStateValue } from "../../hooks/useStateValue";
import OrderItem from "./OrderItem";
const Order = () => {
  const [{ user, basket }, dispatch] = useStateValue();
  const [order, setOrder] = useState([]);
  useEffect(() => {
    if (user) {
      const ordersQuery = query(
        collection(db, "users", user?.uid, "orders"),
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
    <div className="orders">
      <h1>Your Orders</h1>
      <div className="orders__order">
        {order?.map((item, index) => (
          <>
            <OrderItem order={item} key={index} />
          </>
        ))}
      </div>
    </div>
  );
};

export default Order;
