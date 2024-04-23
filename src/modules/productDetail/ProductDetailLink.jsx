import React from "react";
import PropTypes from "prop-types";
import styles from "./styles/ProductDetaill.module.css";
import { Link } from "react-router-dom";
import { PRODUCT_DETAIL_ROUTE, PRODUCT_ROUTE } from "../../constant/routesApp";
const ProductDetailLink = ({ productDetail = {} }) => {
  if (!productDetail) {
    return;
  }
  return (
    <div className={styles.productDetailLink}>
      <Link to={PRODUCT_ROUTE} className={styles.productDetailLink__text}>
        Product
      </Link>
      <span className={styles.productDetailLink__textTag}>&gt;</span>
      <Link
        to={`${PRODUCT_ROUTE}/${productDetail?.category}`}
        className={styles.productDetailLink__text}
      >
        {productDetail?.category}
      </Link>
      <span className={styles.productDetailLink__textTag}>&gt;</span>
      <Link
        to={`${PRODUCT_DETAIL_ROUTE}/${productDetail?.id}`}
        className={`${styles.productDetailLink__text} ${styles.active}`}
      >
        {productDetail?.title}
      </Link>
    </div>
  );
};

ProductDetailLink.propTypes = {
  productDetail: PropTypes.object,
};
export default ProductDetailLink;
