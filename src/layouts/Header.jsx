import React, { useEffect, useState } from "react";
import styles from "./styles/Header.module.css";
import Logo from "/assets/logo.png";
import SearchIcon from "@mui/icons-material/Search";
import { ShoppingBasket } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { useStateValue } from "../hooks/useStateValue";
import { auth } from "../firebase/firebase-config";
import MenuIcon from "@mui/icons-material/Menu";
import { signOut } from "firebase/auth";
import {
  CHECKOUT_ROUTE,
  HOME_ROUTE,
  LOGIN_ROUTE,
  ORDER_ROUTE,
  PRODUCT_ROUTE,
} from "../constant/routesApp";
import { getBasketSize } from "../utils/reducer";
import axios from "axios";
import { API_PRODUCT } from "../constant/constanst";
import { STATUS_SUCCESS } from "../constant/status";
import useDebounce from "../hooks/useDebounce";
import { replaceSpaceToUnderScore } from "../utils/replaceDashToSpace";
import { Highlighted } from "../components/highlightText";
import PropTypes from "prop-types";
import HeaderReponsive from "./HeaderReponsive";

const Header = ({ openBackground, setOpenBackground }) => {
  const navigate = useNavigate();
  const [openHeader, setOpenHeader] = useState(false);
  const [{ basket, user }, dispatch] = useStateValue();
  const [searchValue, setSearchValue] = useState("");
  const [debouncedValue, setDebouncedValue] = useDebounce("", 500);
  const [searchList, setSearchList] = useState([]);
  const handleAuthentication = () => {
    if (user?.auth) {
      signOut(auth);
      localStorage.removeItem("userInfo");
    }
  };

  useEffect(() => {
    const getProductBySearch = async () => {
      try {
        const res = await axios.get(
          `${API_PRODUCT}/search?q=${debouncedValue}`
        );
        if (res.status === STATUS_SUCCESS) {
          setSearchList(res.data.products);
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (searchValue !== "" && openBackground) {
      getProductBySearch();
    }
  }, [debouncedValue, searchValue, openBackground]);

  const handleSearch = (e) => {
    if (e.target.value === "") {
      setSearchList([]);
    } else {
      setOpenBackground(true);
    }
    setSearchValue(e.target.value);
    setDebouncedValue(searchValue);
  };

  const handleKeyDown = (event) => {
    // Handle keyboard navigation and selection
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault(); // Prevent scrolling
      const currentIdx = searchList.findIndex(
        (item) => item.title === searchValue?.title
      );
      let nextIdx;
      if (event.key === "ArrowDown") {
        nextIdx = Math.min(currentIdx + 1, searchList.length - 1);
      } else {
        nextIdx = Math.max(currentIdx - 1, 0);
      }

      const nextElement = document.querySelector(
        `.${replaceSpaceToUnderScore(searchList[nextIdx].title)}`
      );
      if (nextElement) {
        // Add/remove active class to elements
        document
          .querySelectorAll(`.${styles.header__suggest} a`)
          .forEach((item) => {
            item.classList.remove(`${styles.active}`);
          });
        nextElement.classList.add(`${styles.active}`);

        // Cuộn xuống phần tử được chọn
        nextElement.scrollIntoView({ behavior: "smooth", block: "nearest" });

        // Cập nhật giá trị search
        setSearchValue(searchList[nextIdx]);
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      setDebouncedValue("");
      setSearchList([]);
      setOpenBackground(false);
      navigate(`${PRODUCT_ROUTE}/?search=${e.target.value}`);
    }
  };

  return (
    <header className={styles.header}>
      <Link to={HOME_ROUTE}>
        <h1 className={styles.headerTitle}>Amazon</h1>
        <img src={Logo} alt="logo" className={styles.header__logo} />
      </Link>
      <div className={styles.header__search}>
        <input
          type="text"
          className={styles.header__searchInput}
          placeholder="Search Amazon"
          onChange={handleSearch}
          onKeyPress={handleKeyPress}
          onKeyDown={handleKeyDown}
          onClick={() => setOpenBackground(true)}
          value={searchValue?.title ? searchValue.title : searchValue}
        />
        {searchList?.length > 0 ? (
          <div className={styles.header__suggest}>
            {searchList.map((item) => (
              <Link
                to={`${PRODUCT_ROUTE}/?search=${item.title}`}
                onClick={() => {
                  setOpenBackground(false);
                  setSearchValue(item.title);
                  setDebouncedValue(item.title);
                  setSearchList([]);
                }}
                key={item.id}
                className={`${replaceSpaceToUnderScore(item.title)} ${
                  styles.header__suggestItem
                }`}
              >
                <Highlighted
                  text={item.title}
                  highlight={
                    searchValue?.title ? searchValue.title : searchValue
                  }
                />
              </Link>
            ))}
          </div>
        ) : null}
        <SearchIcon
          className={styles.header__searchIcon}
          onClick={() => {
            setDebouncedValue("");
            setSearchList([]);
            setOpenBackground(false);
            navigate(
              `${PRODUCT_ROUTE}/?search=${
                searchValue?.title ? searchValue.title : searchValue
              }`
            );
          }}
        />
      </div>

      <div className={styles.header__nav}>
        <Link
          to={!user?.auth && LOGIN_ROUTE}
          onClick={() => setOpenBackground(false)}
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
        <Link to={ORDER_ROUTE} onClick={() => setOpenBackground(false)}>
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

      <Link to={CHECKOUT_ROUTE} onClick={() => setOpenBackground(false)}>
        <div className={styles.header__optionBasket}>
          <ShoppingBasket  className={styles.iconBasket}/>
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
    </header>
  );
};

Header.propTypes = {
  openBackground: PropTypes.bool,
  setOpenBackground: PropTypes.func,
};
export default Header;
