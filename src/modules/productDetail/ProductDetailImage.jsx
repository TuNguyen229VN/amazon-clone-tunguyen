import React, { useEffect, useRef, useState } from "react";
import styles from "./styles/ProductDetaill.module.css";
import PropTypes from "prop-types";
import { Gallery, Item } from "react-photoswipe-gallery";
import "photoswipe/dist/photoswipe.css";
import ReactImageMagnify from "react-image-magnify";

const ProductDetailImage = ({ productDetail = {} }) => {
  const [numberMainImage, setNumberMainImage] = useState(0);
  if (Object.keys(productDetail).length <= 0) {
    return;
  }

  const handSelectImage = (index) => {
    setNumberMainImage(parseInt(index));
  };
  return (
    <div className={styles.productDetailImage}>
      <div className={styles.productDetailImage__list}>
        {Object.keys(productDetail).length > 0 &&
          productDetail?.images.map((item, index) => {
            return (
              <img
                src={item}
                alt={`img${index}`}
                key={index}
                className={`${styles.productDetailImage__item} ${
                  index === numberMainImage ? `${styles.active}` : ""
                }`}
                onClick={() => handSelectImage(index)}
              />
            );
          })}
      </div>

      <GalleryImage
        productDetail={productDetail}
        numberMainImage={numberMainImage}
        setNumberMainImage={setNumberMainImage}
      ></GalleryImage>
    </div>
  );
};

const GalleryImage = ({
  productDetail = {},
  numberMainImage = 0,
  setNumberMainImage,
}) => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    // Function to handle resize event
    function handleResize() {
      setScreenWidth(window.innerWidth);
    }

    // Add event listener for resize event
    window.addEventListener("resize", handleResize);

    // Cleanup: remove event listener when component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const containerRef = useRef(null);
  return (
    <div className={styles.productDetailImage__gallery} ref={containerRef}>
      <Gallery>
        {Object.keys(productDetail).length > 0 &&
          productDetail?.images.map((item, index) => (
            <Item
              key={index}
              original={
                productDetail?.images[
                  (index + numberMainImage) % productDetail?.images.length
                ]
              }
              thumbnail={
                productDetail?.images[
                  (index + numberMainImage) % productDetail?.images.length
                ]
              }
              width="1024"
              height="768"
            >
              {({ ref, open }) => (
                <div
                  className={`${styles.productDetailImage__mainImage} ${
                    numberMainImage !== index && `${styles.active}`
                  }`}
                  ref={ref}
                  onClick={open}
                >
                  <ReactImageMagnify
                    {...{
                      smallImage: {
                        alt: "Wristwatch by Ted Baker London",
                        isFluidWidth: true,
                        width: 600,
                        height: 600,
                        src: productDetail.images[numberMainImage],
                      },
                      largeImage: {
                        src: productDetail.images[numberMainImage],
                        width: 1200,
                        height: 800,
                      },
                      shouldUsePositiveSpaceLens: true,
                      isEnlargedImagePortalEnabledForTouch: true,
                      enlargedImagePosition:
                        screenWidth < 1201 ? "over" : "beside",
                    }}
                  />
                </div>
              )}
            </Item>
          ))}
      </Gallery>
    </div>
  );
};

ProductDetailImage.propTypes = {
  productDetail: PropTypes.object,
};

GalleryImage.propTypes = {
  productDetail: PropTypes.object,
  numberMainImage: PropTypes.number,
  setNumberMainImage: PropTypes.func,
};
export default ProductDetailImage;
