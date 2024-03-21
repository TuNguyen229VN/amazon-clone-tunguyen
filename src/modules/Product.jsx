import React from "react";
import "../styles/Product.css";
import StarBorderIcon from "@mui/icons-material/StarBorder";

import { ButtonAddToBasket } from "../components/button";
import PropTypes from "prop-types";

const Product = ({ title = "", image = "", price = 0, rating = 0 }) => {
  return (
    <div className="product">
      <div className="product__info">
        <p>{title}</p>
        <p className="product__price">
          <small>$</small>
          <strong>{price}</strong>
        </p>
        <div className="product__rating">
          {Array(rating)
            .fill()
            .map((_, index) => (
              <StarBorderIcon key={index} />
            ))}
        </div>
      </div>
      <img src={image} alt="product item" />
      <ButtonAddToBasket text="Add to Basket" />
    </div>
  );
};

Product.propTypes = {
  title: PropTypes.string,
  image: PropTypes.string,
  price: PropTypes.number,
  rating: PropTypes.number,
};
export default Product;
