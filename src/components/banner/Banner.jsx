import React, { useState } from "react";
import Flickity from "react-flickity-component";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import styles from "./styles/Banner.module.css";
import PropTypes from "prop-types";
const flickityOptions = {
  contain: true,
  prevNextButtons: false,
  autoPlay: 8000,
  pauseAutoPlayOnHover: true,
  imagesLoaded: true,
  percentPosition: false,
  wrapAround: true,
};
const Banner = ({ bannerData = [], className = "", ...props }) => {
  const [flkty, setFlkty] = useState(null);
  const handleNext = () => {
    flkty.next();
  };
  const handlePrevious = () => {
    flkty.previous();
  };

  return (
    <div className={styles.banner}>
      <Flickity
        flickityRef={(c) => setFlkty(c)}
        className={styles.banner__flickity} // default ''
        elementType={"div"} // default 'div'
        options={flickityOptions} // takes flickity options {}
        disableImagesLoaded={false} // default false
        reloadOnUpdate // default false
        static // default false
      >
        {bannerData.map((item, index) => (
          <img
            src={item}
            alt="banner"
            className={className}
            {...props}
            key={index}
          />
        ))}
      </Flickity>
      <ArrowBackIosNewIcon
        fontSize="large"
        className={`${styles.banner__button} ${styles["--back"]}`}
        onClick={handlePrevious}
      />
      <ArrowForwardIosIcon
        fontSize="large"
        className={`${styles.banner__button} ${styles["--forward"]}`}
        onClick={handleNext}
      />
    </div>
  );
};

Banner.propTypes = {
  bannerData: PropTypes.array,
  className: PropTypes.string,
};
export default Banner;
