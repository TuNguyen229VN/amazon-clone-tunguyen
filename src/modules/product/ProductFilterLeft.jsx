import React from "react";
import styles from "./styles/ProductHome.module.css";
import { Link } from "react-router-dom";
import { PRODUCT_ROUTE } from "../../constant/routesApp";
import { Checkbox, FormControlLabel } from "@mui/material";
import { thumbnailCategoryData } from "../../data_av/thumbnailCategoryData";
import { replaceDashToSpace } from "../../utils/replaceDashToSpace";
import StarIcon from "@mui/icons-material/Star";
const ProductFilterLeft = () => {
  return (
    <div className={styles.productFilterLeft}>
      <div className={styles.productFilterLeft__block}>
        <Link
          to={`${PRODUCT_ROUTE}`}
          className={styles.productFilterLeft__link}
        >
          All deals
        </Link>
      </div>
      <div className={styles.productFilterLeft__block}>
        <p className={styles.productFilterLeft__title}>Departments</p>
        <div className={styles.productFilterLeft__action}>
          {thumbnailCategoryData.length > 0 &&
            thumbnailCategoryData.map((item, index) => (
              <FormControlLabel
                control={<Checkbox />}
                label={replaceDashToSpace(Object.keys(item)[0])}
                key={index}
                className={styles.productFilterLeft__label}
              />
            ))}
        </div>
      </div>
      <div className={styles.productFilterLeft__block}>
        <p className={styles.productFilterLeft__title}>Price</p>
        <div className={styles.productFilterLeft__action}>
          <p className={styles.productFilterLeft__price}>All deals</p>
          <p className={styles.productFilterLeft__price}>10% off or more</p>
          <p className={styles.productFilterLeft__price}>25% off or more</p>
          <p className={styles.productFilterLeft__price}>50% off or more</p>
          <p className={styles.productFilterLeft__price}>70% off or more</p>
        </div>
      </div>
      <div className={styles.productFilterLeft__block}>
        <p className={styles.productFilterLeft__title}>
          Average Customer Review
        </p>
        <div className={styles.productFilterLeft__action}>
          <div className={styles.productFilterLeft__rate}>
            <div className={styles.rating}>
              {Array(4)
                .fill()
                .map((_, index) => (
                  <StarIcon
                    key={index}
                    className={styles.productFilterLeft__rating}
                  />
                ))}
            </div>
            & up
          </div>
          <div className={styles.productFilterLeft__rate}>
            <div className={styles.rating}>
              {Array(3)
                .fill()
                .map((_, index) => (
                  <StarIcon
                    key={index}
                    className={styles.productFilterLeft__rating}
                  />
                ))}
            </div>
            & up
          </div>
          <div className={styles.productFilterLeft__rate}>
            <div className={styles.rating}>
              {Array(2)
                .fill()
                .map((_, index) => (
                  <StarIcon
                    key={index}
                    className={styles.productFilterLeft__rating}
                  />
                ))}
            </div>
            & up
          </div>
          <div className={styles.productFilterLeft__rate}>
            <div className={styles.rating}>
              {Array(1)
                .fill()
                .map((_, index) => (
                  <StarIcon
                    key={index}
                    className={styles.productFilterLeft__rating}
                  />
                ))}
            </div>
            & up
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductFilterLeft;
