import React, { useEffect, useState } from "react";
import styles from "./styles/ProductHome.module.css";
import axios from "axios";
import { API_PRODUCT } from "../../constant/constanst";
import { Link, useParams } from "react-router-dom";
import { STATUS_SUCCESS } from "../../constant/status";
import { PRODUCT_DETAIL_ROUTE } from "../../constant/routesApp";
import StarIcon from "@mui/icons-material/Star";
import PropTypes from "prop-types";
import { Skeleton } from "@mui/material";
const ProductList = ({
  products = [],
  loading = true,
  setLoading,
  sortValue,
  selectedCategories,
  selectPrice,
  selectRating,
}) => {
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
            The category you are filtering is not available on this page
            <p className={styles.productList__notice}>
              *You can choose another page or cancel the filter
            </p>
          </div>
        </>
      )}

      {!loading && products.length <= 0 && (
        <p className={`${styles.productList__item} ${styles["--notfound"]}`}>
          The product you are looking for is not available
        </p>
      )}
      {loading && <ProductListSkeleton />}
    </div>
  );
};

const ProductListSkeleton = () => {
  return Array(12)
    .fill()
    .map((_, index) => (
      <div className={styles.productList__item} key={index}>
        <Skeleton
          variant="rectangular"
          width={226}
          height={226}
          sx={{ margin: "0 auto" }}
        />
        <Skeleton
          variant="rectangular"
          height={35}
          sx={{ marginBlock: "20px" }}
        />
        <div className={styles.productList__wrap}>
          <Skeleton variant="rectangular" width={40} height={18} />
          <Skeleton variant="rectangular" width={40} height={18} />
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
