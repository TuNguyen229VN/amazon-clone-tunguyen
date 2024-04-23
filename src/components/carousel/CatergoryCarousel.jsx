import React from "react";
import styles from "./styles/CategoryCarousel.module.css";
import PropTypes from "prop-types";
import { categoryData } from "../../data_av/categoryData";
import { Link } from "react-router-dom";
import { PRODUCT_ROUTE } from "../../constant/routesApp";
import { Skeleton } from "@mui/material";

const CatergoryCarousel = ({
  sizeCategory = 0,
  nameCatagory = [],
  startImgCategory = 0,
  endImgCategory = 0,
  className = "",
  loading,
}) => {
  return (
    <div className={`${styles.categoryCarousel} ${className}`}>
      {loading ? (
        <CatergoryCarouselSkeleton sizeCategory={sizeCategory} />
      ) : (
        Array(sizeCategory)
          .fill()
          .map((_, index) => (
            <div className={styles.categoryCarousel__item} key={index}>
              <Link to={PRODUCT_ROUTE}>
                <h3 className={styles.categoryCarousel__title}>
                  {nameCatagory[index]}
                </h3>
                <div className={styles.test}>
                  <img
                    src={
                      categoryData.slice(startImgCategory, endImgCategory)[
                        index
                      ]
                    }
                    alt="categoryImg"
                    className={styles.categoryCarousel__img}
                  />
                </div>
                <span
                  to={PRODUCT_ROUTE}
                  className={styles.categoryCarousel__seeMore}
                >
                  See more
                </span>
              </Link>
            </div>
          ))
      )}
    </div>
  );
};

const CatergoryCarouselSkeleton = ({ sizeCategory = 0 }) => {
  return (
    <>
      {Array(sizeCategory)
        .fill()
        .map((_, index) => (
          <div className={styles.categoryCarousel__item} key={index}>
            <Skeleton
              variant="rectangular"
              height={25} 
              sx={{ marginBottom: "10px" }}
            />
            <Skeleton variant="rectangular" height={300} width={310}/>
            <Skeleton
              variant="rectangular"
              height={25}
              sx={{ marginTop: "20px" }}
            />
          </div>
        ))}
    </>
  );
};
CatergoryCarousel.propTypes = {
  sizeCategory: PropTypes.number,
  nameCatagory: PropTypes.array,
  startImgCategory: PropTypes.number,
  endImgCategory: PropTypes.number,
  className: PropTypes.string,
  loading: PropTypes.bool,
};

CatergoryCarouselSkeleton.propTypes = {
  sizeCategory: PropTypes.number,
};
export default CatergoryCarousel;
