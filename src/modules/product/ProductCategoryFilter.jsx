import React, { useState } from "react";
import styles from "./styles/ProductHome.module.css";
import Flickity from "react-flickity-component";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { Link } from "react-router-dom";
import { thumbnailCategoryData } from "../../data_av/thumbnailCategoryData";
import { replaceDashToSpace } from "../../utils/replaceDashToSpace";
import { PRODUCT_ROUTE } from "../../constant/routesApp";

const flickityOptions = {
  contain: true,
  draggable: false,
  prevNextButtons: false,
  imagesLoaded: true,
  percentPosition: false,
  wrapAround: true,
  cellAlign: 'left',
  initialIndex: 1,
  groupCells: 2
};
const ProductCategoryFilter = () => {
  const [flkty, setFlkty] = useState(null);
  const handleNext = () => {
    flkty.next();
  };
  const handlePrevious = () => {
    flkty.previous();
  };

  return (
    <div className={styles.productCategoryFilter}>
      <Flickity
        flickityRef={(c) => setFlkty(c)}
        className={styles.productCategoryFilter__flickity} // default ''
        options={flickityOptions} // takes flickity options {}
      >
        {thumbnailCategoryData &&
          thumbnailCategoryData.map((item, index) => (
            <Link to={`${PRODUCT_ROUTE}/${Object.keys(item)[0]}`} key={index} className={styles.productCategoryFilter__link}>
              <div className={styles.productCategoryFilter__img}>
                <img src={Object.values(item)} alt="banner" />
              </div>
              <p className={styles.productCategoryFilter__text}>
                {replaceDashToSpace(Object.keys(item)[0])}
              </p>
            </Link>
          ))}
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

export default ProductCategoryFilter;
