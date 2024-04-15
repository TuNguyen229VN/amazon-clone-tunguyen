import React from "react";
import styles from "./styles/InputQuantity.module.css";
import PropTypes from "prop-types";
const InputQuantity = ({ quantity, onChange, max, children, ...props }) => {
  return (
    <div className={styles.input__wrap}>
      <p>Quantity:</p>
      <input
        type="number"
        onChange={onChange}
        value={quantity}
        max={max}
        min={0}
        title={quantity}
        {...props}
      />
      {children}
    </div>
  );
};
InputQuantity.propTypes = {
  quantity: PropTypes.number,
  onChange: PropTypes.func,
  max: PropTypes.number,
  children: PropTypes.node,
};
export default InputQuantity;
