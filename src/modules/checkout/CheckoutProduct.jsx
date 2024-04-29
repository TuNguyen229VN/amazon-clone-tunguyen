import React, { useState } from "react";
import styles from "./styles/CheckoutProduct.module.css";
import PropTypes from "prop-types";
import StarIcon from "@mui/icons-material/Star";
import { ButtonPrimary } from "../../components/button";
import { useStateValue } from "../../hooks/useStateValue";
import { Link } from "react-router-dom";
import { PRODUCT_DETAIL_ROUTE } from "../../constant/routesApp";
import { InputQuantity } from "../../components/input";
import { showToast } from "../../utils/showToast";
import { useTranslation } from "react-i18next";

const CheckoutProduct = ({
  id,
  title = "",
  image = "",
  price = 0,
  rating = 0,
  quantity = 0,
  stock = 0,
  hideButton = false,
  className = "",
}) => {
  const [t, i18n] = useTranslation("global");
  const [{ basket }, dispatch] = useStateValue();
  const [quantityInput, setQuantityInput] = useState(quantity);
  const [buttonSaveOpen, setButtonSaveOpen] = useState(false);
  const removeFromBasket = (e) => {
    e.preventDefault();
    // remove the item from the basket
    dispatch({
      type: "REMOVE_FROM_BASKET",
      id: id,
    });
  };

  const saveQuantity = () => {
    if (quantityInput <= 0) {
      showToast(`${t("toast.Quantity")} > 0 ${t("toast.or")} < ${stock}`);
      setQuantityInput(parseInt(quantity));
      return;
    } else if (quantityInput > stock) {
      showToast(`${t("toast.Quantity")} > 0 ${t("toast.or")} < ${stock}`);
      setQuantityInput(parseInt(stock));
      return;
    }
    dispatch({
      type: "CHANGE_QUANTITY_BASKET",
      id: id,
      quantity: quantityInput,
    });
    setButtonSaveOpen(false);
  };
  const changeQuantity = (e) => {
    if (e.target.type !== "number") {
      return;
    }
    e.preventDefault();
    setQuantityInput(e.target.value);
    setButtonSaveOpen(true);
  };

  const cancelQuantity = () => {
    setQuantityInput(quantity);
    setButtonSaveOpen(false);
  };
  return (
    <div className={`${styles.checkoutProduct} ${className}`}>
      <Link
        to={`${PRODUCT_DETAIL_ROUTE}/${id}`}
        target="_blank"
        className={styles.imageLink}
      >
        <img
          src={image}
          alt="checkoutProduct-image"
          className={styles.checkoutProduct__image}
        />
      </Link>
      <div className={styles.checkoutProduct__info}>
        <div className={styles.checkoutProduct__infoLeft}>
          <Link
            to={`${PRODUCT_DETAIL_ROUTE}/${id}`}
            target="_blank"
            className={styles.checkoutProduct__title}
          >
            {title}
          </Link>

          <div className={styles.checkoutProduct__rating}>
            {Array(Math.ceil(rating))
              .fill()
              .map((_, index) => (
                <StarIcon key={index} />
              ))}
          </div>
          <InputQuantity
            quantity={parseInt(quantityInput)}
            onChange={changeQuantity}
            disabled={!hideButton ? false : true}
            max={parseInt(stock)}
          >
            {buttonSaveOpen && !hideButton && (
              <>
                <ButtonPrimary
                  text={t("product.Save")}
                  className={styles.buttonSave}
                  onClick={saveQuantity}
                />
                <div className={styles.dash} />
                <ButtonPrimary
                  text={t("product.Cancel")}
                  className={styles.buttonCancel}
                  onClick={cancelQuantity}
                />
              </>
            )}
          </InputQuantity>
          {!hideButton && (
            <ButtonPrimary
              text={t("product.Remove from basket")}
              onClick={!hideButton && removeFromBasket}
            ></ButtonPrimary>
          )}
        </div>
        <p className={styles.checkoutProduct__price}>
          <strong>${price}</strong>
        </p>
      </div>
    </div>
  );
};

CheckoutProduct.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string,
  image: PropTypes.string,
  price: PropTypes.number,
  rating: PropTypes.number,
  hideButton: PropTypes.bool,
  className: PropTypes.string,
  quantity: PropTypes.number,
  stock: PropTypes.number,
};
export default CheckoutProduct;
