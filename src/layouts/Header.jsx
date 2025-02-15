import React, { useState } from "react";
import styles from "./styles/Header.module.css";
import Logo from "/assets/logo.png";
import { ShoppingBasket } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useStateValue } from "../hooks/useStateValue";
import { auth } from "../firebase/firebase-config";
import MenuIcon from "@mui/icons-material/Menu";
import { signOut } from "firebase/auth";

import {
  CHECKOUT_ROUTE,
  HOME_ROUTE,
  LOGIN_ROUTE,
  ORDER_ROUTE,
} from "../constant/routesApp";
import { getBasketSize } from "../utils/reducer";
import PropTypes from "prop-types";
import HeaderReponsive from "./HeaderReponsive";
import { InputSearchHeader } from "../components/input";
import ChangeLanguageComponent from "../components/changeLanguage/ChangeLanguageComponent";
import { useTranslation } from "react-i18next";

const Header = ({ openBackground, setOpenBackground }) => {
  const [openHeader, setOpenHeader] = useState(false);
  const [{ basket, user }, dispatch] = useStateValue();
  const handleAuthentication = () => {
    if (user?.auth) {
      signOut(auth);
      localStorage.removeItem("userInfo");
    }
  };
  const [t, i18n] = useTranslation("global");

  return (
    <header className={styles.header}>
      <Link to={HOME_ROUTE}>
        <h1 className={styles.headerTitle}>Amazon</h1>
        <img src={Logo} alt="logo" className={styles.header__logo} />
      </Link>
      <InputSearchHeader
        openBackground={openBackground}
        setOpenBackground={setOpenBackground}
        className={styles.header__search}
      />

      <div className={styles.header__nav}>
        <Link
          to={!user?.auth && LOGIN_ROUTE}
          onClick={() => setOpenBackground(false)}
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
        <Link to={ORDER_ROUTE} onClick={() => setOpenBackground(false)}>
          <div className={styles.header__option}>
            <span className={styles.header__optionLineOne}>
              {t("header.returns")}
            </span>
            <span className={styles.header__optionLineTwo}>
              {t("header.orders")}
            </span>
          </div>
        </Link>
        <div className={styles.header__option}>
          <span className={styles.header__optionLineOne}>
            {t("header.your")}
          </span>
          <span className={styles.header__optionLineTwo}>
            {t("header.prime")}
          </span>
        </div>
      </div>
      <div className={styles.header__optionReponsive}>
        <ChangeLanguageComponent className={styles.header__changeLanguage} />
        <Link to={CHECKOUT_ROUTE} onClick={() => setOpenBackground(false)}>
          <div className={styles.header__optionBasket}>
            <ShoppingBasket className={styles.iconBasket} />
            <span
              className={`${styles.header__optionLineTwo} ${styles.header__basketCount}`}
            >
              {getBasketSize(basket) ?? 0}
            </span>
          </div>
        </Link>
        <MenuIcon
          onClick={() => setOpenHeader(!openHeader)}
          className={styles.header__icon}
        />
        <HeaderReponsive
          openHeader={openHeader}
          user={user}
          setOpenBackground={setOpenBackground}
          handleAuthentication={handleAuthentication}
          setOpenHeader={setOpenHeader}
        />
      </div>
    </header>
  );
};

Header.propTypes = {
  openBackground: PropTypes.bool,
  setOpenBackground: PropTypes.func,
};
export default Header;
