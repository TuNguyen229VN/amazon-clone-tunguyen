import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Flag_EN from "/assets/united-states.png";
import Flag_VI from "/assets/flag_vn.png";
import styles from "./styles/ChangeLanguage.module.css";
import PropTypes from "prop-types";
const ChangeLanguageComponent = ({ className }) => {
  const [showDiv, setshowDiv] = useState(false);
  const [t, i18n] = useTranslation("global");
  const ref = useRef(null);
  const handleChange = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("lng", lang);
    setshowDiv(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setshowDiv(false);
      }
    };

    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);
  return (
    <div ref={ref} className={`${styles.changeLanguage} ${className}`}>
      <div
        className={styles.changeLanguage__text}
        onClick={() => setshowDiv(!showDiv)}
      >
        <img
          src={t("header.img")}
          alt={t("header.lang")}
          className={styles.changeLanguage__img}
        />
        <p>
          {t("header.lang")} <KeyboardArrowDownIcon />
        </p>
      </div>
      {showDiv && (
        <div className={styles.changeLanguage__wrap}>
          <button
            onClick={() => {
              handleChange("en");
            }}
            className={styles.changeLanguage__button}
          >
            <img
              src={Flag_EN}
              alt="en"
              className={styles.changeLanguage__img}
            />
            EN
          </button>
          <button
            onClick={() => handleChange("vi")}
            className={styles.changeLanguage__button}
          >
            <img
              src={Flag_VI}
              alt="vi"
              className={styles.changeLanguage__img}
            />
            VI
          </button>
        </div>
      )}
    </div>
  );
};

ChangeLanguageComponent.propTypes = {
  className: PropTypes.string,
};
export default ChangeLanguageComponent;
