import React, { useEffect, useState } from "react";
import styles from "./styles/ProductHome.module.css";
import axios from "axios";
import { API_PRODUCT } from "../../constant/constanst";
import { Link, useParams } from "react-router-dom";
import { STATUS_SUCCESS } from "../../constant/status";
import { PRODUCT_DETAIL_ROUTE } from "../../constant/routesApp";
import PropTypes from "prop-types";
const ProductList = ({ products = [] }) => {
  return (
    <div className={styles.productList}>
      {products.length > 0 &&
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
          </Link>
        ))}
    </div>
  );
};

ProductList.propTypes = {
  products: PropTypes.array,
};
export default ProductList;
