import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { LOGIN_ROUTE, ORDER_ROUTE, PRODUCT_ROUTE } from "../constant/routesApp";
import styles from "./styles/HeaderReponsive.module.css";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import ChangeLanguageComponent from "../components/changeLanguage/ChangeLanguageComponent";
import { useTranslation } from "react-i18next";

const HeaderReponsive = ({
  user,
  setOpenBackground,
  handleAuthentication,
  openHeader,
  setOpenHeader,
}) => {
  const [t, i18n] = useTranslation("global");
  return (
    <div
      className={`${styles.headerReponsive} ${
        openHeader && `${styles.active}`
      }`}
    >
      <CloseIcon
        className={styles.headerReponsive__close}
        onClick={() => setOpenHeader(false)}
      ></CloseIcon>
      <Link
        to={!user?.auth && LOGIN_ROUTE}
        onClick={() => {
          setOpenBackground(false);
          setOpenHeader(false);
        }}
      >
        <div onClick={handleAuthentication} className={styles.header__option}>
          <span
            className={`${styles.header__optionLineOne} ${styles["--accountName"]}`}
            title={!user?.auth ? t("header.guest") : user?.auth?.email}
          >
            {t("header.hello")}{" "}
            {!user?.auth ? t("header.guest") : user?.auth?.email}
          </span>
          <span className={styles.header__optionLineTwo}>
            {user?.auth ? t("header.signout") : t("header.signin")}
          </span>
        </div>
      </Link>
      <Link
        to={ORDER_ROUTE}
        onClick={() => {
          setOpenBackground(false);
          setOpenHeader(false);
        }}
      >
        <div className={styles.header__option2}>
          <span className={styles.header__optionLineOne}>
            {" "}
            {t("header.returns")}{" "}
          </span>
          <span className={styles.header__optionLineTwo}>
            {t("header.orders")}
          </span>
        </div>
      </Link>
      <ul className={styles.headerBottom}>
        <li className={styles.headerBottom__item}>
          <ChangeLanguageComponent
            className={styles.headerBottom__changeLanguage}
          />
        </li>
        <li className={styles.headerBottom__item}>
          <Link
            to={PRODUCT_ROUTE}
            className={styles.headerBottom__title}
            onClick={() => setOpenHeader(false)}
          >
            {t("header.all")}
          </Link>
        </li>
        <li className={styles.headerBottom__item}>
          <Link
            to={`${PRODUCT_ROUTE}/skincare`}
            className={styles.headerBottom__title}
            onClick={() => setOpenHeader(false)}
          >
            {t("header.todayDeals")}
          </Link>
        </li>
        <li className={styles.headerBottom__item}>
          <Link
            to={`${PRODUCT_ROUTE}/mens-shirts`}
            className={styles.headerBottom__title}
            onClick={() => setOpenHeader(false)}
          >
            {t("header.customerService")}
          </Link>
        </li>
        <li className={styles.headerBottom__item}>
          <Link
            to={`${PRODUCT_ROUTE}/sunglasses`}
            className={styles.headerBottom__title}
            onClick={() => setOpenHeader(false)}
          >
            {t("header.registry")}
          </Link>
        </li>
        <li className={styles.headerBottom__item}>
          <Link
            to={`${PRODUCT_ROUTE}/lighting`}
            className={styles.headerBottom__title}
            onClick={() => setOpenHeader(false)}
          >
            {t("header.giftCards")}
          </Link>
        </li>
        <li className={styles.headerBottom__item}>
          <Link
            to={`${PRODUCT_ROUTE}/motorcycle`}
            className={styles.headerBottom__title}
            onClick={() => setOpenHeader(false)}
          >
            {t("header.sell")}
          </Link>
        </li>
      </ul>
    </div>
  );
};
HeaderReponsive.propTypes = {
  user: PropTypes.object,
  setOpenBackground: PropTypes.func,
  handleAuthentication: PropTypes.func,
  openHeader: PropTypes.bool,
  setOpenHeader: PropTypes.func,
};

export default HeaderReponsive;
