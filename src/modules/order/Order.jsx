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
import { Skeleton } from "@mui/material";

const NUMBER_LIMIT_INCREASE = 5;
const Order = () => {
  const [{ user, basket }, dispatch] = useStateValue();
  const [order, setOrder] = useState([]);
  const [sortDate, setSortDate] = useState("desc");
  const [debouncedValue, setDebouncedValue] = useDebounce("", 500);
  const [searchResults, setSearchResults] = useState([]);
  const [numberLimit, setNumberLimit] = useState(4);
  const [loading, setLoading] = useState(true);
  const [loadingTop, setLoadingTop] = useState(true);
  useEffect(() => {
    setLoading(true);
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
    setLoading(false);
  }, [debouncedValue, order, numberLimit]);

  useEffect(() => {
    setLoading(true);
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
        setLoading(false);
        setLoadingTop(false);
      });
    } else {
      setOrder([]);
      setLoading(false);
      setLoadingTop(false);
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
        {!loadingTop ? (
          <h1>Your Orders</h1>
        ) : (
          <Skeleton variant="rectangular" width={179} height={38} />
        )}
        <div className={styles.orders__search}>
          {!loadingTop ? (
            <>
              <InputSearch
                placeholder="Search for purchased products"
                onChange={handleSearch}
              />
              <ButtonPrimary
                text="Search Orders"
                className={styles.orders__buttonSearch}
              />
            </>
          ) : (
            <>
              <Skeleton variant="rectangular" height={28} width={325} />
              <Skeleton variant="rounded" height={28} width={100} />
            </>
          )}
        </div>
      </div>
      <div className={styles.orders__selectBox}>
        <SelectBox
          loading={loadingTop}
          dataSelect={dataSelectSortOrder}
          setSortValue={setSortDate}
        />
      </div>
      <div className={styles.orders__order}>
        {!loading &&
          searchResults.length > 0 &&
          searchResults.map((item, index) => (
            <OrderItem order={item} key={index} />
          ))}
        {loading && <OrderItemSkeleton />}
        {!loading && (order.length <= 0 || searchResults.length <= 0) && (
          <p className={styles.order__dont}>
            Looks like you didn&apos;t place an order.{" "}
            <Link to={PRODUCT_ROUTE}>View more prodcuts.</Link>
          </p>
        )}
      </div>
      {!loading && searchResults.length > 0 && order.length >= numberLimit && (
        <p onClick={handleLoadMore} className={styles.loadmore}>
          Load more
        </p>
      )}
    </div>
  );
};

const OrderItemSkeleton = () => {
  return (
    <div className={styles.order}>
      <div className={styles.order__top}>
        <div className={styles.oder__topTitle}>
          <Skeleton variant="rectangular" height={43} width={210} />
          <Skeleton variant="rectangular" height={43} width={210} />
          <Skeleton variant="rectangular" height={43} width={210} />
        </div>
        <Skeleton variant="rectangular" height={23} width={210} />
      </div>
      {Array(3)
        .fill()
        .map((_, index) => (
          <div key={index} className={styles.OrderItemSkeleton__Wrap}>
            <div className={styles.OrderItemSkeleton__WrapLeft}>
              <Skeleton variant="rectangular" height={180} width={180} />
              <div className={styles.OrderItemSkeleton__Text}>
                <Skeleton
                  variant="rectangular"
                  height={22}
                  width={120}
                  sx={{ marginBottom: "10px" }}
                />
                <Skeleton
                  variant="rectangular"
                  height={22}
                  width={140}
                  sx={{ marginBottom: "10px" }}
                />
                <Skeleton
                  variant="rectangular"
                  height={22}
                  width={140}
                  sx={{ marginBottom: "10px" }}
                />
              </div>
            </div>
            <Skeleton variant="rectangular" height={22} width={100} />
          </div>
        ))}
    </div>
  );
};
export default Order;
