import React from "react";
import styles from "./styles/SelectBox.module.css";
import PropTypes from "prop-types";
import { replaceDashToSpace } from "../../utils/replaceDashToSpace";
import { Skeleton } from "@mui/material";
import { useTranslation } from "react-i18next";
const SelectBox = ({ dataSelect, setSortValue, loading }) => {
  const [t, i18n] = useTranslation("global");
  const handleChange = (e) => {
    if (e.target) {
      setSortValue(e.target.value);
    }
  };
  return !loading ? (
    <select className={styles.selectBox} onChange={handleChange}>
      {dataSelect.length > 0 &&
        dataSelect.map((item, index) => (
          <option
            key={index}
            value={Object.keys(item)[0]}
            className={styles.selectBox__item}
          >
            {t("product.sortby")} {t(`product.${replaceDashToSpace(Object.values(item)[0])}`)}
          </option>
        ))}
    </select>
  ) : (
    <SelectBoxSkeleton />
  );
};

const SelectBoxSkeleton = () => {
  return (
    <Skeleton
      variant="rounded"
      width={170}
      height={24}
      sx={{ marginLeft: "auto" }}
    />
  );
};

SelectBox.propTypes = {
  dataSelect: PropTypes.array.isRequired,
  setSortValue: PropTypes.func,
  loading: PropTypes.bool,
};
export default SelectBox;
