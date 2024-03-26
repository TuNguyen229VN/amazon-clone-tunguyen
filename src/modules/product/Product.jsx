import React from "react";
import "../../styles/Product.css";
import StarIcon from '@mui/icons-material/Star';

import { ButtonPrimary } from "../../components/button";
import PropTypes from "prop-types";
import { useStateValue } from "../../hooks/useStateValue";

const Product = ({id, title = "", image = "", price = 0, rating = 0 }) => {
  const [state, dispatch] = useStateValue();
  const addToBasket = () => {
    // dispatch the item into the data layer
    dispatch({
      type: "ADD_TO_BASKET",
      item: {
        id: id,
        title: title,
        image: image,
        price: price,
        rating: rating,
      },
    });
  };

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
              <StarIcon key={index} />
            ))}
        </div>
      </div>
      <img src={image} alt="product item" />
      <ButtonPrimary text="Add to Basket" onClick={addToBasket} />
    </div>
  );
};

Product.propTypes = {
  id:PropTypes.string,
  title: PropTypes.string,
  image: PropTypes.string,
  price: PropTypes.number,
  rating: PropTypes.number,
};
export default Product;
