import React, { useState } from "react";
import styles from "./styles/ButtonToTop.module.css";
import { useTranslation } from "react-i18next";
const ButtonToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [t, i18n] = useTranslation("global");

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  window.addEventListener("scroll", toggleVisibility);

  return (
    <div className={styles.buttonToTop}>
      {isVisible && <button onClick={scrollToTop}>{t(`home.backToTop`)}</button>}
    </div>
  );
};

export default ButtonToTop;
