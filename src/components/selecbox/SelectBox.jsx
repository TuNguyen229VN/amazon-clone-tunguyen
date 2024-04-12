import React from "react";
import styles from "./styles/SelectBox.module.css";
import PropTypes from "prop-types";
import { replaceDashToSpace } from "../../utils/replaceDashToSpace";
const SelectBox = ({ dataSelect }) => {
  return (
    <select className={styles.selectBox}>
      {dataSelect.length > 0 &&
        dataSelect.map((item, index) => (
          <option key={index} value={item} className={styles.selectBox__item}>
            Sort by: {replaceDashToSpace(item)}
          </option>
        ))}
    </select>
  );
};

SelectBox.propTypes = {
  dataSelect: PropTypes.array.isRequired,
};
export default SelectBox;
