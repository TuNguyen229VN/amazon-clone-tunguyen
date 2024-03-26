import React from "react";
import "../../styles/CheckoutProduct.css";
import PropTypes from "prop-types";
import StarIcon from "@mui/icons-material/Star";
import { ButtonPrimary } from "../../components/button";
import { useStateValue } from "../../hooks/useStateValue";

const CheckoutProduct = ({
  id,
  title = "",
  image = "",
  price = 0,
  rating = 0,
}) => {
  const [{ basket }, dispatch] = useStateValue();
  const removeFromBasket = () => {
    // remove the item from the basket
    dispatch({
      type: "REMOVE_FROM_BASKET",
      id: id,
    });
  };
  return (
    <div className="checkoutProduct">
      <img
        src={image}
        alt="checkoutProduct-image"
        className="checkoutProduct__image"
      />
      <div className="checkoutProduct__info">
        <p className="checkoutProduct__title">{title}</p>
        <p className="checkoutProduct__price">
          <small>$</small>
          <strong>{price}</strong>
        </p>
        <div className="checkoutProduct__rating">
          {Array(rating)
            .fill()
            .map((_, index) => (
              <StarIcon key={index} />
            ))}
        </div>
        <ButtonPrimary
          text="Remove from basket"
          onClick={removeFromBasket}
        ></ButtonPrimary>
      </div>
    </div>
  );
};

CheckoutProduct.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  image: PropTypes.string,
  price: PropTypes.number,
  rating: PropTypes.number,
};
export default CheckoutProduct;
