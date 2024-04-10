import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import styles from "./styles/InputSearch.module.css";
import PropTypes from "prop-types";
const InputSearch = ({
  placeholder = "",
  className = "",
  onChange = () => {},
  ...props
}) => {
  return (
    <div className={styles.inputSearch__block}>
      <SearchIcon className={styles.inputSearch__icon} fontSize="small"/>
      <input
        type="text"
        placeholder={placeholder}
        className={`${styles.inputSearch} ${className}`}
        onChange={onChange}
        autoComplete="on"
        {...props}
      />
    </div>
  );
};

InputSearch.propTypes = {
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  className: PropTypes.string,
};
export default InputSearch;
