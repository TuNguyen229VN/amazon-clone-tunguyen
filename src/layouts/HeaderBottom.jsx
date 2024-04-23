import React from "react";
import styles from "./styles/HeaderBottom.module.css";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import { PRODUCT_ROUTE } from "../constant/routesApp";
const HeaderBottom = () => {
  return (
    <ul className={styles.headerBottom}>
      <li className={styles.headerBottom__item}>
        <MenuIcon />
        <Link to={PRODUCT_ROUTE} className={styles.headerBottom__title}>
          All
        </Link>
      </li>
      <li className={styles.headerBottom__item}>
        <Link
          to={`${PRODUCT_ROUTE}/skincare`}
          className={styles.headerBottom__title}
        >
          Today&apos;s Deals
        </Link>
      </li>
      <li className={styles.headerBottom__item}>
        <Link
          to={`${PRODUCT_ROUTE}/mens-shirts`}
          className={styles.headerBottom__title}
        >
          Customer Service
        </Link>
      </li>
      <li className={styles.headerBottom__item}>
        <Link
          to={`${PRODUCT_ROUTE}/sunglasses`}
          className={styles.headerBottom__title}
        >
          Reigstry
        </Link>
      </li>
      <li className={styles.headerBottom__item}>
        <Link
          to={`${PRODUCT_ROUTE}/lighting`}
          className={styles.headerBottom__title}
        >
          Gift Cards
        </Link>
      </li>
      <li className={styles.headerBottom__item}>
        <Link
          to={`${PRODUCT_ROUTE}/motorcycle`}
          className={styles.headerBottom__title}
        >
          Sell
        </Link>
      </li>
    </ul>
  );
};

export default HeaderBottom;
