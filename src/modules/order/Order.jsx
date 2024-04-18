import React, { useEffect, useState } from "react";
import styles from "./styles/Order.module.css";
import { db } from "../../firebase/firebase-config";
import {
  collection,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useStateValue } from "../../hooks/useStateValue";
import OrderItem from "./OrderItem";
import { ButtonPrimary } from "../../components/button";
import { InputSearch } from "../../components/input";
import { Link } from "react-router-dom";
import { PRODUCT_ROUTE } from "../../constant/routesApp";
import { dataSelectSortOrder } from "../../data_av/dataSelectSort";
import { SelectBox } from "../../components/selecbox";
import useDebounce from "../../hooks/useDebounce";
import Spinner from "../../components/loading/Spinner";

const NUMBER_LIMIT_INCREASE = 5;
const Order = () => {
  const [{ user, basket }, dispatch] = useStateValue();
  const [order, setOrder] = useState([]);
  const [sortDate, setSortDate] = useState("desc");
  const [debouncedValue, setDebouncedValue] = useDebounce("", 500);
  const [searchResults, setSearchResults] = useState([]);
  const [numberLimit, setNumberLimit] = useState(4);
  useEffect(() => {
    let newSearchResults = [];
    order.forEach((item) => {
      let searchProduct = item.data?.basket?.find((basketItem) =>
        basketItem.title.toLowerCase().includes(debouncedValue.toLowerCase())
      );
      if (searchProduct) {
        newSearchResults.push(item);
      }
    });
    setSearchResults(newSearchResults);
  }, [debouncedValue, order, numberLimit]);

  useEffect(() => {
    if (user?.auth) {
      const ordersQuery = query(
        collection(db, "users", user?.auth?.uid, "orders"),
        orderBy("created", sortDate),
        limit(numberLimit)
      );
      const unsubscribe = onSnapshot(ordersQuery, (querySnapshot) => {
        const ordersData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc?.data(),
        }));
        setOrder(ordersData);
      });
    } else {
      setOrder([]);
    }
  }, [user?.auth, sortDate, numberLimit]);

  const handleSearch = (e) => {
    setDebouncedValue(e.target.value);
  };

  const handleLoadMore = () => {
    setNumberLimit(numberLimit + NUMBER_LIMIT_INCREASE);
  };
  return (
    <div className={styles.orders}>
      <div className={styles.orders__title}>
        <h1>Your Orders</h1>
        <div className={styles.orders__search}>
          <InputSearch
            placeholder="Search for purchased products"
            onChange={handleSearch}
          />
          <ButtonPrimary
            text="Search Orders"
            className={styles.orders__buttonSearch}
          />
        </div>
      </div>
      <div className={styles.orders__selectBox}>
        <SelectBox
          dataSelect={dataSelectSortOrder}
          setSortValue={setSortDate}
        />
      </div>
      <div className={styles.orders__order}>
        {searchResults.length > 0 &&
          searchResults.map((item, index) => (
            <OrderItem order={item} key={index} />
          ))}
        {(order.length <= 0 || searchResults.length <= 0) && (
          <p className={styles.order__dont}>
            Looks like you didn&apos;t place an order.{" "}
            <Link to={PRODUCT_ROUTE}>View more prodcuts.</Link>
          </p>
        )}
      </div>
      {searchResults.length > 0 && order.length >= numberLimit && (
        <p onClick={handleLoadMore} className={styles.loadmore}>Load more</p>
      )}
    </div>
  );
};

export default Order;
