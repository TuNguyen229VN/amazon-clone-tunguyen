import React from "react";
import PropTypes from "prop-types";
const ButtonAddToBasket = ({ text }) => {
  return <button>{text}</button>;
};

ButtonAddToBasket.propTypes = {
  text: PropTypes.string.isRequired,
};
export default ButtonAddToBasket;
