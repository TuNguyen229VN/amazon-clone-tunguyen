import React from "react";
import styles from "./styles/InputQuantity.module.css";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
const InputQuantity = ({ quantity, onChange, max, children, ...props }) => {
  const [t, i18n] = useTranslation("global");
  return (
    <div className={styles.input__wrap}>
      <p>{t("product.Quantity")}</p>
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
