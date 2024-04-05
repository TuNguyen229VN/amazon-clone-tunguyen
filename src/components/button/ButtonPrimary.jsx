import React from "react";
import PropTypes from "prop-types";
import "../../styles/ButtonComponet.css";
const ButtonPrimary = ({ text = "", onClick = () => {}, ...props }) => {
  return (
    <button onClick={onClick} {...props} className="button__primary">
      {text}
    </button>
  );
};

ButtonPrimary.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};
export default ButtonPrimary;
