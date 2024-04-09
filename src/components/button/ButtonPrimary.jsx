import React from "react";
import PropTypes from "prop-types";
import styles from "../../styles/ButtonComponet.module.css";
const ButtonPrimary = ({
  text = "",
  onClick = () => {},
  className = "",
  ...props
}) => {
  return (
    <button
      onClick={onClick}
      className={`${styles.button__primary} ${className}`}
      {...props}
    >
      {text}
    </button>
  );
};

ButtonPrimary.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  className: PropTypes.string,
};
export default ButtonPrimary;
