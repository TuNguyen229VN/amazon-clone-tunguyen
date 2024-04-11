import React from "react";
import styles from "./styles/Header.module.css";
import Logo from "../assets/logo.png";
import SearchIcon from "@mui/icons-material/Search";
import { ShoppingBasket } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useStateValue } from "../hooks/useStateValue";
import { auth } from "../firebase/firebase-config";
import { signOut } from "firebase/auth";

const Header = () => {
  const [{ basket, user }, dispatch] = useStateValue();

  const handleAuthentication = () => {
    if (user) {
      signOut(auth);
      localStorage.removeItem("userInfo");
    }
  };

  return (
    <header className={styles.header}>
      <Link to={"/"}>
        <h1 className={styles.headerTitle}>Amazon</h1>
        <img src={Logo} alt="logo" className={styles.header__logo} />
      </Link>

      <div className={styles.header__search}>
        <input
          type="text"
          className={styles.header__searchInput}
          placeholder="Search Amazon"
        />
        <SearchIcon className={styles.header__searchIcon} />
      </div>

      <div className={styles.header__nav}>
        <Link to={!user && "/login"}>
          <div onClick={handleAuthentication} className={styles.header__option}>
            <span
              className={`${styles.header__optionLineOne} ${styles["--accountName"]}`}
              title={!user ? "guest" : user?.email}
            >
              Hello {!user ? "guest" : user?.email}
            </span>
            <span className={styles.header__optionLineTwo}>
              {user ? "Sign out" : "Sign in"}
            </span>
          </div>
        </Link>
        <Link to="/order">
          <div className={styles.header__option}>
            <span className={styles.header__optionLineOne}>Returns</span>
            <span className={styles.header__optionLineTwo}>& Orders</span>
          </div>
        </Link>
        <div className={styles.header__option}>
          <span className={styles.header__optionLineOne}>Your</span>
          <span className={styles.header__optionLineTwo}>Prime</span>
        </div>
      </div>

      <Link to={"/checkout"}>
        <div className={styles.header__optionBasket}>
          <ShoppingBasket />
          <span
            className={`${styles.header__optionLineTwo} ${styles.header__basketCount}`}
          >
            {basket?.length ?? 0}
          </span>
        </div>
      </Link>
    </header>
  );
};

export default Header;
