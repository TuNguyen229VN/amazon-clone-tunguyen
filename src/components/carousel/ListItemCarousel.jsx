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
import { PRODUCT_DETAIL_ROUTE } from "../../constant/routesApp";
import { Skeleton } from "@mui/material";

const flickityOptions = {
  contain: true,
  prevNextButtons: false,
  autoPlay: 8000,
  pauseAutoPlayOnHover: true,
  imagesLoaded: true,
  percentPosition: false,
  wrapAround: false,
  draggable: true,
};
const ListItemCarousel = ({
  title = "",
  nameProduct = "",
  loading = false,
  setLoading,
}) => {
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
      setLoading(true);
      const response = await axios.get(
        `${API_URL_PRODUCTS_IN_SPECIFIC_CATEGORY}/${nameProduct}`
        // "https://dummyjson.com/products"
      );
      if (response.status === STATUS_SUCCESS) {
        setproductData(response.data?.products);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      return;
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <div className={styles.listItem}>
      {!loading ? (
        <h4 className={styles.listItem__title} title={title}>
          {title}
        </h4>
      ) : (
        <Skeleton variant="rectangular" height={25} width={400} />
      )}

      <Flickity
        flickityRef={(c) => setFlkty(c)}
        className={styles.listItem__flickity} // default ''
        options={flickityOptions} // takes flickity options {}
      >
        {!loading &&
          productData.length &&
          productData.map((item, index) => (
            <Link key={index} to={`${PRODUCT_DETAIL_ROUTE}/${item.id}`}>
              <img
                src={item.thumbnail}
                alt="banner"
                className={styles.listItem__img}
              />
            </Link>
          ))}
        {loading &&
          Array(5)
            .fill()
            .map((_, index) => (
              <Skeleton
                key={index}
                variant="rectangular"
                height={200}
                width={250}
                sx={{ margin: "10px" }}
              />
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
  loading: PropTypes.bool,
  setLoading: PropTypes.func,
};
export default ListItemCarousel;
