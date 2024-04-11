import React, { useState } from "react";
import styles from "./styles/ButtonToTop.module.css"
const ButtonToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

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
      {isVisible && <button onClick={scrollToTop}>Back to Top</button>}
    </div>
  );
};

export default ButtonToTop;
