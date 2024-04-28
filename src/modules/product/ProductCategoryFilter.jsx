import React, { useState } from "react";
import styles from "./styles/ProductHome.module.css";
import Flickity from "react-flickity-component";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { Link } from "react-router-dom";
import { thumbnailCategoryData } from "../../data_av/thumbnailCategoryData";
import { replaceDashToSpace } from "../../utils/replaceDashToSpace";
import { PRODUCT_ROUTE } from "../../constant/routesApp";
import { useEffect } from "react";
import PropTypes from "prop-types";
import { Skeleton, useMediaQuery } from "@mui/material";
import { useTranslation } from "react-i18next";

const MAX__CELL = 1200;
const flickityOptions = {
  contain: true,
  draggable: false,
  prevNextButtons: false,
  imagesLoaded: true,
  percentPosition: false,
  cellAlign: "left",
  initialIndex: 0,
  groupCells: 2,
};
const ProductCategoryFilter = ({ loading = false }) => {
  const [t, i18n] = useTranslation("global");
  const [flkty, setFlkty] = useState(null);
  const [checkout, setCheckout] = useState(true);
  useEffect(() => {
    if (flkty) {
      let target = flkty.selectedCell.target;
      if (target == flkty.cells[0].target) {
        document
          .querySelector(`.${styles["--back"]}`)
          .classList.add(styles.active);
      } else if (target >= MAX__CELL) {
        document
          .querySelector(`.${styles["--forward"]}`)
          .classList.add(styles.active);
      } else {
        document
          .querySelector(`.${styles["--forward"]}`)
          .classList.remove(styles.active);
        document
          .querySelector(`.${styles["--back"]}`)
          .classList.remove(styles.active);
      }
    }
  }, [flkty, checkout]);

  const handleNext = () => {
    flkty.next();
    setCheckout(!checkout);
  };
  const handlePrevious = () => {
    flkty.previous();
    setCheckout(!checkout);
  };

  return (
    <div className={styles.productCategoryFilter}>
      <Flickity
        flickityRef={(c) => setFlkty(c)}
        className={styles.productCategoryFilter__flickity} // default ''
        options={flickityOptions} // takes flickity options {}
      >
        {!loading &&
          thumbnailCategoryData &&
          thumbnailCategoryData.map((item, index) => (
            <Link
              to={`${PRODUCT_ROUTE}/${Object.keys(item)[0]}`}
              key={index}
              className={styles.productCategoryFilter__link}
            >
              <div className={styles.productCategoryFilter__img}>
                <img src={Object.values(item)} alt="banner" />
              </div>
              <p className={styles.productCategoryFilter__text}>
                {t(`product.${replaceDashToSpace(Object.keys(item)[0])}`)}
              </p>
            </Link>
          ))}
        {loading &&
          Array(12)
            .fill()
            .map((_, index) => <ProductCategoryFilterSkeleton key={index} />)}
      </Flickity>
      <ArrowBackIosNewIcon
        fontSize="large"
        className={`${styles.productCategoryFilter__button} ${styles["--back"]}`}
        onClick={handlePrevious}
      />
      <ArrowForwardIosIcon
        fontSize="large"
        className={`${styles.productCategoryFilter__button} ${styles["--forward"]}`}
        onClick={handleNext}
      />
    </div>
  );
};

const ProductCategoryFilterSkeleton = () => {
  const is768Screen = useMediaQuery("(max-width: 768px)");
  const is480Screen = useMediaQuery("(max-width: 480px)");
  return (
    <div className={styles.productCategoryFilter__link}>
      <Skeleton
        variant="circular"
        width={is480Screen ? "60px" : is768Screen ? "70px" : "90px"}
        height={is480Screen ? "60px" : is768Screen ? "70px" : "90px"}
      ></Skeleton>
      <Skeleton
        variant="rectangular"
        width={58}
        height={is480Screen ? "16px" : is768Screen ? "17px" : "18px"}
      ></Skeleton>
    </div>
  );
};
ProductCategoryFilter.propTypes = {
  loading: PropTypes.bool,
};
export default ProductCategoryFilter;
