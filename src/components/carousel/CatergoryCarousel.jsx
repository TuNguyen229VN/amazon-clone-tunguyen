import React from "react";
import styles from "./styles/CategoryCarousel.module.css";
import PropTypes from "prop-types";
import { categoryData } from "../../data_av/categoryData";
import { Link } from "react-router-dom";
import { PRODUCT_ROUTE } from "../../constant/routesApp";

const CatergoryCarousel = ({
  sizeCategory = 0,
  nameCatagory = [],
  startImgCategory = 0,
  endImgCategory = 0,
  className = "",
}) => {
  return (
    <div className={`${styles.categoryCarousel} ${className}`}>
      {Array(sizeCategory)
        .fill()
        .map((_, index) => (
          <div className={styles.categoryCarousel__item} key={index}>
            <Link to={PRODUCT_ROUTE}>
              <h3 className={styles.categoryCarousel__title}>
                {nameCatagory[index]}
              </h3>
              <img
                src={
                  categoryData.slice(startImgCategory, endImgCategory)[index]
                }
                alt="categoryImg"
                className={styles.categoryCarousel__img}
              />
              <span
                to={"/product"}
                className={styles.categoryCarousel__seeMore}
              >
                See more
              </span>
            </Link>
          </div>
        ))}
    </div>
  );
};

CatergoryCarousel.propTypes = {
  sizeCategory: PropTypes.number,
  nameCatagory: PropTypes.array,
  startImgCategory: PropTypes.number,
  endImgCategory: PropTypes.number,
  className: PropTypes.string,
};
export default CatergoryCarousel;
