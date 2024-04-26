import React from "react";
import styles from "./styles/ProductDetaill.module.css";
import StarIcon from "@mui/icons-material/Star";
import PropTypes from "prop-types";
import { replaceDashToSpace } from "../../utils/replaceDashToSpace";
import { Link } from "react-router-dom";
import { PRODUCT_ROUTE } from "../../constant/routesApp";
const ProductDetailText = ({ productDetail = {} }) => {
  return (
    <div className={styles.productDetailText}>
      <p
        className={styles.productDetailText__title}
        title={productDetail.title}
      >
        {productDetail.title}
      </p>
      <div className={styles.productDetailText__rating}>
        {productDetail.rating}{" "}
        {Array(Math.ceil(productDetail.rating))
          .fill()
          .map((_, index) => (
            <StarIcon key={index} />
          ))}
      </div>
      <div className={styles.productDetailText__price}>
        <small>$</small>
        {productDetail.price}
      </div>
      <p className={styles.productDetailText__details}>Product details</p>
      <div>
        <div className={styles.productDetailText__detailsItem}>
          <strong>Category</strong>{" "}
          <Link to={`${PRODUCT_ROUTE}/${productDetail.category}`}>
            {replaceDashToSpace(productDetail.category)}
          </Link>
        </div>
        <div className={styles.productDetailText__detailsItem}>
          <strong>Brand</strong> <p>{productDetail.brand}</p>
        </div>
      </div>
      <p className={styles.productDetailText__about}>About this item</p>
      <li className={styles.productDetail__description}>
        {productDetail.description}
      </li>
    </div>
  );
};
ProductDetailText.propTypes = {
  productDetail: PropTypes.object,
};

export default ProductDetailText;
