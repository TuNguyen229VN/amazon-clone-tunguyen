import React from "react";
import styles from "./styles/HeaderBottom.module.css";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import { PRODUCT_ROUTE } from "../constant/routesApp";
import { useTranslation } from "react-i18next";
const HeaderBottom = () => {
  const [t, i18n] = useTranslation("global");

  return (
    <ul className={styles.headerBottom}>
      <li className={styles.headerBottom__item}>
        <MenuIcon />
        <Link to={PRODUCT_ROUTE} className={styles.headerBottom__title}>
         {t("header.all")}
        </Link>
      </li>
      <li className={styles.headerBottom__item}>
        <Link
          to={`${PRODUCT_ROUTE}/skincare`}
          className={styles.headerBottom__title}
        >
          {t("header.todayDeals")}
        </Link>
      </li>
      <li className={styles.headerBottom__item}>
        <Link
          to={`${PRODUCT_ROUTE}/mens-shirts`}
          className={styles.headerBottom__title}
        >
         {t("header.customerService")}
        </Link>
      </li>
      <li className={styles.headerBottom__item}>
        <Link
          to={`${PRODUCT_ROUTE}/sunglasses`}
          className={styles.headerBottom__title}
        >
           {t("header.registry")}
        </Link>
      </li>
      <li className={styles.headerBottom__item}>
        <Link
          to={`${PRODUCT_ROUTE}/lighting`}
          className={styles.headerBottom__title}
        >
          {t("header.giftCards")}
        </Link>
      </li>
      <li className={styles.headerBottom__item}>
        <Link
          to={`${PRODUCT_ROUTE}/motorcycle`}
          className={styles.headerBottom__title}
        >
          {t("header.sell")}
        </Link>
      </li>
    </ul>
  );
};

export default HeaderBottom;
