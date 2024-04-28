import React, { useEffect, useState } from "react";
import styles from "./styles/ProductDetaill.module.css";
import PropTypes from "prop-types";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ButtonPrimary from "../../components/button/ButtonPrimary";
import { useStateValue } from "../../hooks/useStateValue";
import { Checkbox, FormControlLabel } from "@mui/material";
import { getUserProfile } from "../../utils/getUserProfile";
import { useTranslation } from "react-i18next";
const ProductDetailAction = ({ productDetail = {} }) => {
  const [t, i18n] = useTranslation("global");
  const [{ user }, dispatch] = useStateValue();
  const [address, setAddress] = useState(user?.userProfile?.userAddress);
  useEffect(() => {
    getUserProfile(user.auth, dispatch);
  }, []);

  useEffect(() => {
    setAddress(user?.userProfile?.userAddress);
  }, [user?.userProfile?.userAddress]);

  const addToBasket = () => {
    // dispatch the item into the data layer
    dispatch({
      type: "ADD_TO_BASKET",
      item: {
        id: productDetail.id,
        title: productDetail.title,
        image: productDetail.images[0],
        price: productDetail.price,
        rating: productDetail.rating,
        stock: productDetail.stock,
      },
    });
  };
  return (
    <div className={styles.productDetailAction}>
      <div className={styles.productDetailAction__price}>
        <small>$</small>
        <p>{productDetail.price}</p>
      </div>
      <div className={styles.productDetailAction__location}>
        {user?.userProfile && (
          <>
            <LocationOnIcon fontSize="small" />
            <p
              title={`${address?.houseNumber}, ${address?.ward.ward_name}, ${address?.district.district_name}, ${address?.city.province_name}`}
            >
              {address?.houseNumber}, {address?.ward.ward_name},{" "}
              {address?.district.district_name}, {address?.city.province_name}
            </p>
          </>
        )}
      </div>
      <ButtonPrimary
        text={t("product.Add to Basket")}
        onClick={addToBasket}
        className={styles.productDetailAction__button}
      />
      <div className={styles.productDetailAction__desc}>
        <p className={styles.productDetailAction__descLeft}>{t("product.Ships from")}</p>
        <p className={styles.productDetailAction__descRight}>{t("product.Amazon.com")}</p>
      </div>
      <div className={styles.productDetailAction__desc}>
        <p className={styles.productDetailAction__descLeft}>{t("product.Sold by")}</p>
        <p className={styles.productDetailAction__descRight}>{t("product.Amazon.com")}</p>
      </div>
      <div className={styles.productDetailAction__desc}>
        <p className={styles.productDetailAction__descLeft}>{t("product.Return")}</p>
        <p className={styles.productDetailAction__descRight}>
          {t("product.Eligible for Return, Refund or Replacement")}
        </p>
      </div>
      <div className={styles.productDetailAction__desc}>
        <p className={styles.productDetailAction__descLeft}>{t("product.Payment")}</p>
        <p className={styles.productDetailAction__descRight}>
          {t("product.Secure transaction lorem")}
        </p>
      </div>
      <div className={styles.productDetailAction__desc}>
        <p className={styles.productDetailAction__descLeft}>{t("product.Customer Service")}</p>
        <p className={styles.productDetailAction__descRight}>{t("product.Amazon.com")}</p>
      </div>
      <div className={styles.productDetailAction__desc}>
        <p className={styles.productDetailAction__descLeft}>{t("product.Packaging")}</p>
        <p className={styles.productDetailAction__descRight}>
          {t("product.Ships in product packaging")}
        </p>
      </div>
      <FormControlLabel
        control={<Checkbox />}
        label={t("product.Add a gift receipt for easy returns")}
        className={styles.productDetailAction__label}
      />
    </div>
  );
};
ProductDetailAction.propTypes = {
  productDetail: PropTypes.object,
};
export default ProductDetailAction;
