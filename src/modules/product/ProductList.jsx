import React, { useEffect, useState } from "react";
import styles from "./styles/ProductHome.module.css";
import axios from "axios";
import { API_PRODUCT } from "../../constant/constanst";
import { Link, useParams } from "react-router-dom";
import { STATUS_SUCCESS } from "../../constant/status";
import { PRODUCT_DETAIL_ROUTE } from "../../constant/routesApp";
import PropTypes from "prop-types";
const ProductList = ({
  products = [],
  loading = true,
  setLoading,
  sortValue,
}) => {
  const sortList = () => {
    if (products?.length > 0) {
      switch (sortValue) {
        case "charactDesc":
          return products.sort((a, b) => a?.title.localeCompare(b?.title));
        case "charactAsc":
          return products.sort((a, b) => b?.title.localeCompare(a?.title));
        case "priceDesc":
          return products.sort((a, b) => b?.price - a?.price);

        case "priceAsc":
          return products.sort((a, b) => a?.price - b?.price);

        default:
          return products;
      }
    }
  };
  sortList();
  return (
    <div className={styles.productList}>
      {!loading &&
        products?.length > 0 &&
        products.map((item) => (
          <Link
            to={`${PRODUCT_DETAIL_ROUTE}/${item.id}`}
            className={styles.productList__item}
            key={item.id}
          >
            <img
              className={styles.productList__image}
              src={item.thumbnail}
              alt={item.id}
            />
            <p className={styles.productList__title}>{item.title}</p>
            <p className={styles.productList__price}>${item.price}</p>
          </Link>
        ))}
      {!loading && products.length <= 0 && (
        <p className={`${styles.productList__item} ${styles["--notfound"]}`}>
          The product you are looking for is not available
        </p>
      )}
    </div>
  );
};

ProductList.propTypes = {
  products: PropTypes.array,
  loading: PropTypes.bool,
  setLoading: PropTypes.func,
  sortValue: PropTypes.string,
};
export default ProductList;
