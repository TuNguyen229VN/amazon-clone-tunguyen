import React, { useEffect, useState } from "react";
import styles from "./styles/ProductHome.module.css";
import { Link } from "react-router-dom";
import { PRODUCT_ROUTE } from "../../constant/routesApp";
import { Checkbox, FormControlLabel, Skeleton } from "@mui/material";
import { thumbnailCategoryData } from "../../data_av/thumbnailCategoryData";
import { replaceDashToSpace } from "../../utils/replaceDashToSpace";
import StarIcon from "@mui/icons-material/Star";
import PropTypes from "prop-types";

const ProductFilterLeft = ({
  selectedCategories,
  setSelectedCategories,
  selectPrice,
  setSelectPrice,
  selectRating,
  setSelectRating,
  loading,
}) => {
  const handleCheckboxChange = (category) => {
    let updatedCategories;
    if (category === "all") {
      // Nếu người dùng chọn "all", chỉ cần đặt lại selectedCategories thành ["all"]
      updatedCategories = ["all"];
    } else {
      // Loại bỏ "all" nếu category mới được chọn không phải là "all"
      updatedCategories =
        selectedCategories.includes("all") && category !== "all"
          ? [category]
          : selectedCategories.includes(category)
          ? selectedCategories.filter((item) => item !== category)
          : [...selectedCategories, category];
    }
    if (updatedCategories.length <= 0) {
      updatedCategories = ["all"];
    }
    setSelectedCategories(updatedCategories);
  };

  const handleSelectPrice = (index) => {
    setSelectPrice(index);
  };

  const handleSelectRating = (index) => {
    setSelectRating(index);
  };

  return (
    <div className={styles.productFilterLeft}>
      {!loading ? (
        <>
          <div className={styles.productFilterLeft__block}>
            <Link
              to={`${PRODUCT_ROUTE}`}
              className={styles.productFilterLeft__link}
              title="All deals"
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
                    control={
                      <Checkbox
                        checked={selectedCategories.includes(
                          Object.keys(item)[0]
                        )}
                        onChange={() =>
                          handleCheckboxChange(Object.keys(item)[0])
                        }
                      />
                    }
                    label={replaceDashToSpace(Object.keys(item)[0])}
                    key={index}
                    title={replaceDashToSpace(Object.keys(item)[0])}
                    className={styles.productFilterLeft__label}
                  />
                ))}
            </div>
          </div>
          <div className={styles.productFilterLeft__block}>
            <p className={styles.productFilterLeft__title}>Price</p>
            <div className={styles.productFilterLeft__action}>
              <p
                className={`${styles.productFilterLeft__price} ${
                  !selectPrice && `${styles.priceActive}`
                }`}
                title="All deals"
                onClick={() => handleSelectPrice()}
              >
                All deals
              </p>
              <p
                className={`${styles.productFilterLeft__price} ${
                  selectPrice === 5 && `${styles.priceActive}`
                }`}
                title="5% off or more"
                onClick={() => handleSelectPrice(5)}
              >
                5% off or more
              </p>
              <p
                className={`${styles.productFilterLeft__price} ${
                  selectPrice === 10 && `${styles.priceActive}`
                }`}
                title="10% off or more"
                onClick={() => handleSelectPrice(10)}
              >
                10% off or more
              </p>
              <p
                className={`${styles.productFilterLeft__price} ${
                  selectPrice === 20 && `${styles.priceActive}`
                }`}
                title="20% off or more"
                onClick={() => handleSelectPrice(20)}
              >
                20% off or more
              </p>
              <p
                className={`${styles.productFilterLeft__price} ${
                  selectPrice === 50 && `${styles.priceActive}`
                }`}
                title="50% off or more"
                onClick={() => handleSelectPrice(50)}
              >
                50% off or more
              </p>
            </div>
          </div>
          <div className={styles.productFilterLeft__block}>
            <p className={styles.productFilterLeft__title}>
              Average Customer Review
            </p>
            <div className={styles.productFilterLeft__action}>
              <div
                className={`${styles.productFilterLeft__rate} ${
                  selectRating === 4 && `${styles.rateActive}`
                }`}
                onClick={() => handleSelectRating(4)}
              >
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
              <div
                className={`${styles.productFilterLeft__rate} ${
                  selectRating === 3 && `${styles.rateActive}`
                }`}
                onClick={() => handleSelectRating(3)}
              >
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
              <div
                className={`${styles.productFilterLeft__rate} ${
                  selectRating === 2 && `${styles.rateActive}`
                }`}
                onClick={() => handleSelectRating(2)}
              >
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
              <div
                className={`${styles.productFilterLeft__rate} ${
                  selectRating === 1 && `${styles.rateActive}`
                }`}
                onClick={() => handleSelectRating(1)}
              >
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
        </>
      ) : (
        <ProductFilterLeftSkeleton />
      )}
    </div>
  );
};

const ProductFilterLeftSkeleton = () => {
  return (
    <>
      <div className={styles.productFilterLeft__block}>
        <Skeleton variant="rectangular" height={16} width={100} />
      </div>
      <div className={styles.productFilterLeft__block}>
        <Skeleton
          variant="rectangular"
          height={21}
          width={100}
          sx={{ marginBottom: "10px" }}
        />
        <div className={styles.productFilterLeft__action}>
          {Array(8)
            .fill()
            .map((_, index) => (
              <Skeleton
                variant="rectangular"
                key={index}
                height={30}
                width={193}
                sx={{ marginBottom: "10px" }}
              />
            ))}
        </div>
      </div>
      <div className={styles.productFilterLeft__block}>
        <Skeleton
          variant="rectangular"
          height={21}
          width={100}
          sx={{ marginBottom: "10px" }}
        />
        <div className={styles.productFilterLeft__action}>
          {Array(4)
            .fill()
            .map((_, index) => (
              <Skeleton
                variant="rectangular"
                key={index}
                height={30}
                width={193}
                sx={{ marginBottom: "10px" }}
              />
            ))}
        </div>
      </div>
      <div className={styles.productFilterLeft__block}>
        <Skeleton
          variant="rectangular"
          height={21}
          width={100}
          sx={{ marginBottom: "10px" }}
        />
        <div className={styles.productFilterLeft__action}>
          {Array(4)
            .fill()
            .map((_, index) => (
              <Skeleton
                variant="rectangular"
                key={index}
                height={30}
                width={193}
                sx={{ marginBottom: "10px" }}
              />
            ))}
        </div>
      </div>
    </>
  );
};
ProductFilterLeft.propTypes = {
  selectedCategories: PropTypes.array,
  setSelectedCategories: PropTypes.func,
  selectPrice: PropTypes.number,
  setSelectPrice: PropTypes.func,
  selectRating: PropTypes.number,
  setSelectRating: PropTypes.func,
  loading: PropTypes.bool,
};
export default ProductFilterLeft;
