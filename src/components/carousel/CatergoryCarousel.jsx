import React from "react";
import styles from "./styles/CategoryCarousel.module.css";
import PropTypes from "prop-types";
import { categoryData } from "../../data_av/categoryData";
import { Link } from "react-router-dom";
import { PRODUCT_ROUTE } from "../../constant/routesApp";
import { Skeleton, useMediaQuery } from "@mui/material";
import { useTranslation } from "react-i18next";

const CatergoryCarousel = ({
  sizeCategory = 0,
  nameCatagory = [],
  linkCatagory = [],
  startImgCategory = 0,
  endImgCategory = 0,
  className = "",
  loading,
}) => {
  const [t, i18n] = useTranslation("global");
  return (
    <div className={`${styles.categoryCarousel} ${className}`}>
      {loading ? (
        <CatergoryCarouselSkeleton sizeCategory={sizeCategory} />
      ) : (
        Array(sizeCategory)
          .fill()
          .map((_, index) => (
            <div className={styles.categoryCarousel__item} key={index}>
              <Link
                to={`${PRODUCT_ROUTE}${
                  linkCatagory.length > 0 ? `/${linkCatagory[index]}` : ``
                }`}
              >
                <h3
                  className={styles.categoryCarousel__title}
                  title={nameCatagory[index]}
                >
                  {t(`home.${nameCatagory[index]}`)}
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
                  {t("home.seemore")}
                </span>
              </Link>
            </div>
          ))
      )}
    </div>
  );
};

const CatergoryCarouselSkeleton = ({ sizeCategory = 0 }) => {
  const is768Screen = useMediaQuery("(max-width: 768px)");
  const is480Screen = useMediaQuery("(max-width: 480px)");
  return (
    <>
      {Array(sizeCategory)
        .fill()
        .map((_, index) => (
          <div className={styles.categoryCarousel__item} key={index}>
            <Skeleton
              variant="rectangular"
              height={is480Screen ? "18px" : is768Screen ? "21px" : "25px"}
              sx={{ marginBottom: "10px" }}
            />
            <Skeleton
              variant="rectangular"
              height={is768Screen ? "200px" : "300px"}
              width={is768Screen ? "100%" : "300px"}
            />
            <Skeleton
              variant="rectangular"
              height={is480Screen ? "14px" : "16px"}
              sx={{ marginTop: is768Screen ? "10px" : "20px" }}
            />
          </div>
        ))}
    </>
  );
};
CatergoryCarousel.propTypes = {
  sizeCategory: PropTypes.number,
  nameCatagory: PropTypes.array,
  linkCatagory: PropTypes.array,
  startImgCategory: PropTypes.number,
  endImgCategory: PropTypes.number,
  className: PropTypes.string,
  loading: PropTypes.bool,
};

CatergoryCarouselSkeleton.propTypes = {
  sizeCategory: PropTypes.number,
};
export default CatergoryCarousel;
