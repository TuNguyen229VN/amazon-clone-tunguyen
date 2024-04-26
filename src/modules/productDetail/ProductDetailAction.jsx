import React, { useEffect, useState } from "react";
import styles from "./styles/ProductDetaill.module.css";
import PropTypes from "prop-types";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ButtonPrimary from "../../components/button/ButtonPrimary";
import { useStateValue } from "../../hooks/useStateValue";
import { Checkbox, FormControlLabel } from "@mui/material";
import { getUserProfile } from "../../utils/getUserProfile";
const ProductDetailAction = ({ productDetail = {} }) => {
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
        text="Add to Basket"
        onClick={addToBasket}
        className={styles.productDetailAction__button}
      />
      <div className={styles.productDetailAction__desc}>
        <p className={styles.productDetailAction__descLeft}>Ships from</p>
        <p className={styles.productDetailAction__descRight}>Amazon.com</p>
      </div>
      <div className={styles.productDetailAction__desc}>
        <p className={styles.productDetailAction__descLeft}>Sold by</p>
        <p className={styles.productDetailAction__descRight}>Amazon.com</p>
      </div>
      <div className={styles.productDetailAction__desc}>
        <p className={styles.productDetailAction__descLeft}>Return</p>
        <p className={styles.productDetailAction__descRight}>
          Eligible for Return, Refund or Replacement
        </p>
      </div>
      <div className={styles.productDetailAction__desc}>
        <p className={styles.productDetailAction__descLeft}>Payment</p>
        <p className={styles.productDetailAction__descRight}>
          Secure transaction lorem
        </p>
      </div>
      <div className={styles.productDetailAction__desc}>
        <p className={styles.productDetailAction__descLeft}>Customer Service</p>
        <p className={styles.productDetailAction__descRight}>Amazon.com</p>
      </div>
      <div className={styles.productDetailAction__desc}>
        <p className={styles.productDetailAction__descLeft}>Packaging</p>
        <p className={styles.productDetailAction__descRight}>
          Ships in product packaging
        </p>
      </div>
      <FormControlLabel
        control={<Checkbox />}
        label={"Add a gift receipt for easy returns"}
        className={styles.productDetailAction__label}
      />
    </div>
  );
};
ProductDetailAction.propTypes = {
  productDetail: PropTypes.object,
};
export default ProductDetailAction;
