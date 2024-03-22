import React from "react";
import PropTypes from "prop-types";
import "../../styles/ButtonComponet.css";
const ButtonPrimary = ({ text="", onClick = () => {} }) => {
  return <button onClick={onClick}>{text}</button>;
};

ButtonPrimary.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};
export default ButtonPrimary;
