import React, { useEffect, useState } from "react";
import styles from "./styles/ListItemCarousel.module.css";
import PropTypes from "prop-types";
import Flickity from "react-flickity-component";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import axios from "axios";
import { API_URL_PRODUCTS_IN_SPECIFIC_CATEGORY } from "../../constant/constanst";
import { Link } from "react-router-dom";
import { STATUS_SUCCESS } from "../../constant/status";

const flickityOptions = {
  contain: true,
  prevNextButtons: false,
  autoPlay: 8000,
  pauseAutoPlayOnHover: true,
  imagesLoaded: true,
  percentPosition: false,
  wrapAround: false,
};
const ListItemCarousel = ({ title = "", nameProduct = "" }) => {
  const [flkty, setFlkty] = useState(null);
  const [productData, setproductData] = useState([]);
  const handleNext = () => {
    flkty.next();
  };
  const handlePrevious = () => {
    flkty.previous();
  };

  const getProduct = async () => {
    try {
      const response = await axios.get(
        `${API_URL_PRODUCTS_IN_SPECIFIC_CATEGORY}${nameProduct}`
        // "https://fakestoreapi.com/products"
      );
      if (response.status === STATUS_SUCCESS) {
        setproductData(response.data?.products);
      }
    } catch (error) {
      return;
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <div className={styles.listItem}>
      <h4 className={styles.listItem__title}>{title}</h4>
      <Flickity
        flickityRef={(c) => setFlkty(c)}
        className={styles.listItem__flickity} // default ''
        options={flickityOptions} // takes flickity options {}
      >
        {productData &&
          productData.map((item, index) => (
            <Link key={index}>
              <img
                src={item.thumbnail}
                alt="banner"
                className={styles.listItem__img}
              />
            </Link>
          ))}
      </Flickity>
      <ArrowBackIosNewIcon
        fontSize="large"
        className={`${styles.listItem__button} ${styles["--back"]}`}
        onClick={handlePrevious}
      />
      <ArrowForwardIosIcon
        fontSize="large"
        className={`${styles.listItem__button} ${styles["--forward"]}`}
        onClick={handleNext}
      />
    </div>
  );
};

ListItemCarousel.propTypes = {
  title: PropTypes.string,
  nameProduct: PropTypes.string,
};
export default ListItemCarousel;
