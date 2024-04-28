import React, { useEffect, useState } from "react";
import styles from "./styles/ProductHome.module.css";
import axios from "axios";
import { API_PRODUCT } from "../../constant/constanst";
import { Link, useParams } from "react-router-dom";
import { STATUS_SUCCESS } from "../../constant/status";
import { PRODUCT_DETAIL_ROUTE } from "../../constant/routesApp";
import StarIcon from "@mui/icons-material/Star";
import PropTypes from "prop-types";
import { Skeleton, useMediaQuery } from "@mui/material";
import { useTranslation } from "react-i18next";
const ProductList = ({
  products = [],
  loading = true,
  setLoading,
  sortValue,
  selectedCategories,
  selectPrice,
  selectRating,
}) => {
  const [t, i18n] = useTranslation("global");
  const [productFilterLeft, setProductFilterLeft] = useState(products);
  const sortList = () => {
    if (products?.length > 0 && productFilterLeft?.length > 0) {
      switch (sortValue) {
        case "charactDesc":
          return productFilterLeft.sort((a, b) =>
            a?.title.localeCompare(b?.title)
          );
        case "charactAsc":
          return productFilterLeft.sort((a, b) =>
            b?.title.localeCompare(a?.title)
          );
        case "priceDesc":
          return productFilterLeft.sort((a, b) => b?.price - a?.price);

        case "priceAsc":
          return productFilterLeft.sort((a, b) => a?.price - b?.price);

        default:
          return productFilterLeft;
      }
    }
  };
  sortList();

  useEffect(() => {
    setLoading(true);
    if (products?.length > 0) {
      let filteredArray = products.filter((item) => {
        if (selectedCategories[0] === "all") {
          return products;
        }
        return selectedCategories.includes(item.category);
      });

      if (selectRating) {
        filteredArray = filteredArray.filter(
          (item) => item.rating > selectRating
        );
      }
      if (selectPrice) {
        filteredArray = filteredArray.filter(
          (item) => item.discountPercentage > selectPrice
        );
      }
      setProductFilterLeft(filteredArray);
    }
    setLoading(false);
  }, [selectedCategories, products, selectRating, selectPrice, setLoading]);

  return (
    <div className={styles.productList}>
      {!loading &&
        productFilterLeft?.length > 0 &&
        productFilterLeft.map((item) => (
          <Link
            to={`${PRODUCT_DETAIL_ROUTE}/${item.id}`}
            className={styles.productList__item}
            key={item.id}
          >
            <img
              className={styles.productList__image}
              src={item.thumbnail}
              alt={item.id}
            />
            <p className={styles.productList__title}>{item.title}</p>
            <div className={styles.productList__wrap}>
              <p className={styles.productList__price}>${item.price} </p>
              <div className={styles.productList__rating}>
                <StarIcon className={styles.productFilterLeft__rating} />
                {item.rating}
              </div>
            </div>
          </Link>
        ))}
      {!loading && products.length > 0 && productFilterLeft.length <= 0 && (
        <>
          <div
            className={`${styles.productList__item} ${styles["--notfound"]}`}
          >
            {t(
              "product.The category you are filtering is not available on this page"
            )}
            <p className={styles.productList__notice}>
              {t("product.*You can choose another page or cancel the filter")}
            </p>
          </div>
        </>
      )}

      {!loading && products.length <= 0 && (
        <p className={`${styles.productList__item} ${styles["--notfound"]}`}>
          {t("product.The product you are looking for is not available")}
        </p>
      )}
      {loading && <ProductListSkeleton />}
    </div>
  );
};

const ProductListSkeleton = () => {
  const is1200Screen = useMediaQuery("(max-width: 1200px)");
  const is1024Screen = useMediaQuery("(max-width: 1024px)");
  const is768Screen = useMediaQuery("(max-width: 768px)");
  const is480Screen = useMediaQuery("(max-width: 480px)");
  return Array(12)
    .fill()
    .map((_, index) => (
      <div className={styles.productList__item} key={index}>
        <Skeleton
          variant="rectangular"
          width={is1200Screen ? "100%" : "226px"}
          height={is1200Screen ? "200px" : "226px"}
          sx={{ margin: "0 auto" }}
        />
        <Skeleton
          variant="rectangular"
          height={35}
          sx={{ marginBlock: is1200Screen ? "10px" : "20px" }}
        />
        <div className={styles.productList__wrap}>
          <Skeleton
            variant="rectangular"
            width={is768Screen ? "30px" : "40px"}
            height={
              is480Screen
                ? "15px"
                : is768Screen
                ? "16px"
                : is1024Screen
                ? "17px"
                : "18px"
            }
          />
          <Skeleton
            variant="rectangular"
            width={is768Screen ? "30px" : "40px"}
            height={
              is480Screen
                ? "15px"
                : is768Screen
                ? "16px"
                : is1024Screen
                ? "17px"
                : "18px"
            }
          />
        </div>
      </div>
    ));
};
ProductList.propTypes = {
  products: PropTypes.array,
  loading: PropTypes.bool,
  setLoading: PropTypes.func,
  sortValue: PropTypes.string,
  selectedCategories: PropTypes.array,
  selectPrice: PropTypes.number,
  selectRating: PropTypes.number,
};
export default ProductList;
