import React from "react";
import styles from "../../styles/CheckoutProduct.module.css";
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
  hideButton = false,
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
    <div className={styles.checkoutProduct}>
      <img
        src={image}
        alt="checkoutProduct-image"
        className={styles.checkoutProduct__image}
      />
      <div className={styles.checkoutProduct__info}>
        <p className={styles.checkoutProduct__title}>{title}</p>
        <p className={styles.checkoutProduct__price}>
          <small>$</small>
          <strong>{price}</strong>
        </p>
        <div className={styles.checkoutProduct__rating}>
          {Array(rating)
            .fill()
            .map((_, index) => (
              <StarIcon key={index} />
            ))}
        </div>
        {!hideButton && (
          <ButtonPrimary
            text="Remove from basket"
            onClick={!hideButton && removeFromBasket}
          ></ButtonPrimary>
        )}
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
  hideButton: PropTypes.bool,
};
export default CheckoutProduct;
