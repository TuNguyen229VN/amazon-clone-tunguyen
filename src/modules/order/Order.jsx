import React, { useEffect, useState } from "react";
import styles from "./styles/Order.module.css";
import { db } from "../../firebase/firebase-config";
import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
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
import { Skeleton, useMediaQuery } from "@mui/material";
import { useTranslation } from "react-i18next";

const NUMBER_LIMIT_INCREASE = 5;
const Order = () => {
  const [t, i18n] = useTranslation("global");
  const [{ user, basket }, dispatch] = useStateValue();
  const [order, setOrder] = useState([]);
  const [sortDate, setSortDate] = useState("desc");
  const [debouncedValue, setDebouncedValue] = useDebounce("", 500);
  const [searchResults, setSearchResults] = useState([]);
  const [numberLimit, setNumberLimit] = useState(4);
  const [loading, setLoading] = useState(true);
  const [loadingTop, setLoadingTop] = useState(true);

  useEffect(() => {
    document.title = "Amazon | Orders";
    window.scrollTo(0, 0);
  }, []);

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

  const is1024Screen = useMediaQuery("(max-width: 1024px)");
  const is768Screen = useMediaQuery("(max-width: 768px)");
  const is480Screen = useMediaQuery("(max-width: 480px)");

  return (
    <div className={styles.orders}>
      <div className={styles.orders__title}>
        {!loadingTop ? (
          <h1>{t("order.Your Orders")}</h1>
        ) : (
          <Skeleton
            variant="rectangular"
            width={
              is480Screen
                ? "140pxpx"
                : is768Screen
                ? "150px"
                : is1024Screen
                ? "160px"
                : "179px"
            }
            height={
              is480Screen
                ? "28px"
                : is768Screen
                ? "33px"
                : is1024Screen
                ? "35px"
                : "38px"
            }
          />
        )}
        <div className={styles.orders__search}>
          {!loadingTop ? (
            <>
              <InputSearch
                placeholder={t("order.Search for purchased products")}
                onChange={handleSearch}
                className={styles.orders__inputSearch}
              />
              <ButtonPrimary
                text={t("order.Search Orders")}
                className={styles.orders__buttonSearch}
              />
            </>
          ) : (
            <>
              <Skeleton
                variant="rectangular"
                height={is1024Screen ? "38px" : "28px"}
                width={is1024Screen ? "100%" : "325px"}
              />
              <Skeleton
                variant="rounded"
                height={28}
                width={is1024Screen ? "0px" : "100px"}
              />
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
           {t("order.Looks like you didn't place an order.")}
            <Link to={PRODUCT_ROUTE}>{t("order.View more prodcuts.")}</Link>
          </p>
        )}
      </div>
      {!loading && searchResults.length > 0 && order.length >= numberLimit && (
        <p onClick={handleLoadMore} className={styles.loadmore}>
          {t("order.Load More")}
        </p>
      )}
    </div>
  );
};

const OrderItemSkeleton = () => {
  const is1200Screen = useMediaQuery("(max-width: 1200px)");
  const is1024Screen = useMediaQuery("(max-width: 1024px)");
  const is768Screen = useMediaQuery("(max-width: 768px)");
  const is480Screen = useMediaQuery("(max-width: 480px)");
  return (
    <div className={styles.order}>
      <div className={styles.order__top}>
        <div className={styles.oder__topTitle}>
          <Skeleton
            variant="rectangular"
            height={
              is480Screen
                ? "16px"
                : is768Screen
                ? "18px"
                : is1024Screen
                ? "20px"
                : "22px"
            }
            width={is480Screen ? "100%" : is1024Screen ? "200px" : "210px"}
          />
          <Skeleton
            variant="rectangular"
            height={
              is480Screen
                ? "16px"
                : is768Screen
                ? "18px"
                : is1024Screen
                ? "20px"
                : "22px"
            }
            width={is480Screen ? "100%" : is1024Screen ? "200px" : "210px"}
          />
          <Skeleton
            variant="rectangular"
            height={
              is480Screen
                ? "16px"
                : is768Screen
                ? "18px"
                : is1024Screen
                ? "20px"
                : "22px"
            }
            width={is480Screen ? "100%" : is1024Screen ? "350px" : "210px"}
          />
        </div>
        <Skeleton
          variant="rectangular"
          height={
            is480Screen
              ? "16px"
              : is768Screen
              ? "18px"
              : is1024Screen
              ? "20px"
              : "22px"
          }
          width={is480Screen ? "100%" : is1024Screen ? "350px" : "210px"}
          sx={{ marginTop: is1200Screen ? "10px" : "0px" }}
        />
      </div>
      {Array(3)
        .fill()
        .map((_, index) => (
          <div key={index} className={styles.OrderItemSkeleton__Wrap}>
            <Skeleton
              variant="rectangular"
              height={is1200Screen ? "200px" : "180px"}
              width={is768Screen ? "100%" : is1200Screen ? "200px" : "180px"}
              sx={{ flexShrink: "0" }}
            />
            <div className={styles.OrderItemSkeleton__WrapLeft}>
              <div className={styles.OrderItemSkeleton__Text}>
                <Skeleton
                  variant="rectangular"
                  height={
                    is480Screen
                      ? "16px"
                      : is768Screen
                      ? "18px"
                      : is1024Screen
                      ? "20px"
                      : "22px"
                  }
                  width={
                    is480Screen ? "100%" : is1024Screen ? "200px" : "140px"
                  }
                  sx={{ marginBottom: "10px" }}
                />
                <Skeleton
                  variant="rectangular"
                  height={
                    is480Screen
                      ? "16px"
                      : is768Screen
                      ? "18px"
                      : is1024Screen
                      ? "20px"
                      : "22px"
                  }
                  width={
                    is480Screen ? "100%" : is1024Screen ? "200px" : "140px"
                  }
                  sx={{ marginBottom: "10px" }}
                />
                <Skeleton
                  variant="rectangular"
                  height={
                    is480Screen
                      ? "16px"
                      : is768Screen
                      ? "18px"
                      : is1024Screen
                      ? "20px"
                      : "22px"
                  }
                  width={
                    is480Screen ? "100%" : is1024Screen ? "200px" : "140px"
                  }
                  sx={{ marginBottom: "10px" }}
                />
              </div>
              <Skeleton
                variant="rectangular"
                height={
                  is480Screen
                    ? "16px"
                    : is768Screen
                    ? "18px"
                    : is1024Screen
                    ? "20px"
                    : "22px"
                }
                width={100}
              />
            </div>
          </div>
        ))}
    </div>
  );
};
export default Order;
