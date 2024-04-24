import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { LOGIN_ROUTE, ORDER_ROUTE, PRODUCT_ROUTE } from "../constant/routesApp";
import styles from "./styles/HeaderReponsive.module.css";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

const HeaderReponsive = ({
  user,
  setOpenBackground,
  handleAuthentication,
  openHeader,
  setOpenHeader,
}) => {
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
            title={!user?.auth ? "guest" : user?.auth?.email}
          >
            Hello {!user?.auth ? "guest" : user?.auth?.email}
          </span>
          <span className={styles.header__optionLineTwo}>
            {user?.auth ? "Sign out" : "Sign in"}
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
          <span className={styles.header__optionLineOne}>Returns </span>
          <span className={styles.header__optionLineTwo}>& Orders</span>
        </div>
      </Link>
      <ul className={styles.headerBottom}>
        <li className={styles.headerBottom__item}>
          <Link
            to={PRODUCT_ROUTE}
            className={styles.headerBottom__title}
            onClick={() => setOpenHeader(false)}
          >
            All
          </Link>
        </li>
        <li className={styles.headerBottom__item}>
          <Link
            to={`${PRODUCT_ROUTE}/skincare`}
            className={styles.headerBottom__title}
            onClick={() => setOpenHeader(false)}
          >
            Today&apos;s Deals
          </Link>
        </li>
        <li className={styles.headerBottom__item}>
          <Link
            to={`${PRODUCT_ROUTE}/mens-shirts`}
            className={styles.headerBottom__title}
            onClick={() => setOpenHeader(false)}
          >
            Customer Service
          </Link>
        </li>
        <li className={styles.headerBottom__item}>
          <Link
            to={`${PRODUCT_ROUTE}/sunglasses`}
            className={styles.headerBottom__title}
            onClick={() => setOpenHeader(false)}
          >
            Reigstry
          </Link>
        </li>
        <li className={styles.headerBottom__item}>
          <Link
            to={`${PRODUCT_ROUTE}/lighting`}
            className={styles.headerBottom__title}
            onClick={() => setOpenHeader(false)}
          >
            Gift Cards
          </Link>
        </li>
        <li className={styles.headerBottom__item}>
          <Link
            to={`${PRODUCT_ROUTE}/motorcycle`}
            className={styles.headerBottom__title}
            onClick={() => setOpenHeader(false)}
          >
            Sell
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
