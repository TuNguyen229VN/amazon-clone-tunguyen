import React from "react";
import styles from "./styles/SelectBox.module.css";
import PropTypes from "prop-types";
import { replaceDashToSpace } from "../../utils/replaceDashToSpace";
const SelectBox = ({ dataSelect, setSortValue }) => {
  const handleChange = (e) => {
    if (e.target) {
      setSortValue(e.target.value);
    }
  };
  return (
    <select className={styles.selectBox} onChange={handleChange}>
      {dataSelect.length > 0 &&
        dataSelect.map((item, index) => (
          <option
            key={index}
            value={Object.keys(item)[0]}
            className={styles.selectBox__item}
          >
            Sort by: {replaceDashToSpace(Object.values(item)[0])}
          </option>
        ))}
    </select>
  );
};

SelectBox.propTypes = {
  dataSelect: PropTypes.array.isRequired,
  setSortValue: PropTypes.func,
};
export default SelectBox;
