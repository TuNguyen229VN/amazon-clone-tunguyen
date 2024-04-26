import React, { useEffect, useState } from "react";
import styles from "./styles/InputSearchHeader.module.css";
import axios from "axios";
import { API_PRODUCT } from "../../constant/constanst";
import { STATUS_SUCCESS } from "../../constant/status";
import useDebounce from "../../hooks/useDebounce";
import { replaceSpaceToUnderScore } from "../../utils/replaceDashToSpace";
import { PRODUCT_ROUTE } from "../../constant/routesApp";
import { Link, useNavigate } from "react-router-dom";
import { Highlighted } from "../highlightText";
import SearchIcon from "@mui/icons-material/Search";
import PropTypes from "prop-types";

const InputSearchHeader = ({
  openBackground = false,
  setOpenBackground,
  className = "",
}) => {
  const navigate = useNavigate();
  const [debouncedValue, setDebouncedValue] = useDebounce("", 500);
  const [searchValue, setSearchValue] = useState("");
  const [searchList, setSearchList] = useState([]);

  useEffect(() => {
    if (!openBackground) {
      setSearchList([]);
    }
  }, [openBackground]);

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
    <div className={`${styles.search} ${className}`}>
      <input
        type="text"
        className={styles.search__input}
        placeholder="Search Amazon"
        onChange={handleSearch}
        onKeyPress={handleKeyPress}
        onKeyDown={handleKeyDown}
        onClick={() => setOpenBackground(true)}
        value={searchValue?.title ? searchValue.title : searchValue}
      />
      {searchList?.length > 0 ? (
        <div className={styles.search__suggest}>
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
                highlight={searchValue?.title ? searchValue.title : searchValue}
              />
            </Link>
          ))}
        </div>
      ) : null}
      <SearchIcon
        className={styles.search__icon}
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
  );
};

InputSearchHeader.propTypes = {
  openBackground: PropTypes.bool,
  setOpenBackground: PropTypes.func,
  className: PropTypes.string,
};
export default InputSearchHeader;
