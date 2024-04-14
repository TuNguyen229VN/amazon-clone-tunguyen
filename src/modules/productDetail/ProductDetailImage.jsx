import React, { useState } from "react";
import styles from "./styles/ProductDetaill.module.css";
import PropTypes from "prop-types";
const ProductDetailImage = ({ productDetail = {} }) => {
  const [numberMainImage, setNumberMainImage] = useState(0);
  if (Object.keys(productDetail).length <= 0) {
    return;
  }
  return (
    <div className={styles.productDetailImage}>
      <div className={styles.productDetailImage__list}>
        {Object.keys(productDetail).length > 0 &&
          productDetail?.images.map((item, index) => {
            return (
              <img
                src={item}
                alt={`img${index}`}
                key={index}
                className={styles.productDetailImage__item}
              />
            );
          })}
      </div>
      <div className={styles.productDetailImage__mainImage}>
        <img
          src={productDetail.images[numberMainImage]}
          alt={`img${numberMainImage}`}
        />
      </div>
    </div>
  );
};

ProductDetailImage.propTypes = {
  productDetail: PropTypes.object,
};

export default ProductDetailImage;
