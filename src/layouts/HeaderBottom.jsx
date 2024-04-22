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
        <Link to={PRODUCT_ROUTE} className={styles.headerBottom__title}>All</Link>
      </li>
      <li className={styles.headerBottom__item}>
        <span className={styles.headerBottom__title}>Today&apos;s Deals</span>
      </li>
      <li className={styles.headerBottom__item}>
        <span className={styles.headerBottom__title}>Customer Service</span>
      </li>
      <li className={styles.headerBottom__item}>
        <span className={styles.headerBottom__title}>Reigstry</span>
      </li>
      <li className={styles.headerBottom__item}>
        <span className={styles.headerBottom__title}>Gift Cards</span>
      </li>
      <li className={styles.headerBottom__item}>
        <span className={styles.headerBottom__title}>Sell</span>
      </li>
    </ul>
  );
};

export default HeaderBottom;
