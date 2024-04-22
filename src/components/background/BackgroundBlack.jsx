import React from "react";
import styles from "./styles/BackgroundBlack.module.css";
import PropTypes from "prop-types";

const BackgroundBlack = ({ openBackground, setOpenBackground }) => {
  return (
    openBackground && (
      <div
        className={styles.backgroundBlack}
        onClick={() => setOpenBackground(false)}
      ></div>
    )
  );
};

BackgroundBlack.propTypes = {
  openBackground: PropTypes.bool,
  setOpenBackground: PropTypes.func,
};
export default BackgroundBlack;
