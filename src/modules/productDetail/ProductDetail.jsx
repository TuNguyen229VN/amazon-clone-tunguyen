import React, { useEffect, useState } from "react";
import styles from "./styles/ProductDetaill.module.css";
import ProductDetailImage from "./ProductDetailImage";
import ProductDetailText from "./ProductDetailText";
import ProductDetailAction from "./ProductDetailAction";
import { useParams } from "react-router-dom";
import axios from "axios";
import { STATUS_SUCCESS } from "../../constant/status";
import { API_PRODUCT } from "../../constant/constanst";
import ProductDetailLink from "./ProductDetailLink";
import { Skeleton } from "@mui/material";
const ProductDetail = () => {
  const { slug } = useParams();
  const [productDetail, setProductDetail] = useState({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const getProductDetail = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${API_PRODUCT}/${slug}`);
        if (res.status === STATUS_SUCCESS) {
          setProductDetail(res.data);
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
        return;
      }
    };
    getProductDetail();
  }, [slug]);

  return (
    <div className={styles.productDetail}>
      {!loading && Object.keys(productDetail).length > 0 && (
        <>
          <ProductDetailLink productDetail={productDetail} />
          <div className={styles.productDetail__wrap}>
            <ProductDetailImage productDetail={productDetail} />
            <ProductDetailText productDetail={productDetail} />
            <ProductDetailAction productDetail={productDetail} />
          </div>
        </>
      )}
      {!loading && Object.keys(productDetail).length <= 0 && (
        <p className={styles.productDetail__error}>
          The product you are looking for is not available
        </p>
      )}
      {loading && <ProductDetailSkeleton />}
    </div>
  );
};

const ProductDetailSkeleton = () => {
  return (
    <>
      <div className={styles.productDetailLink}>
        <Skeleton variant="text" width={42} />
        <Skeleton variant="text" width={12} />
        <Skeleton variant="text" width={42} />
        <Skeleton variant="text" width={12} />
        <Skeleton variant="text" width={42} />
      </div>
      <div className={styles.productDetail__wrap}>
        <div className={styles.productDetailImage}>
          <div className={styles.productDetailImage__list}>
            {Array(4)
              .fill()
              .map((_, index) => (
                <Skeleton
                  key={index}
                  variant="rounded"
                  width={40}
                  height={60}
                />
              ))}
          </div>
          <div className={styles.productDetailImage__gallery}>
            <Skeleton variant="rectangular" width={550} height={500} />
          </div>
        </div>
        <div className={styles.productDetailText}>
          <Skeleton variant="rectangular" width={250} height={28} />
          <div className={styles.productDetailText__rating}>
            <Skeleton variant="rectangular" width={200} height={24} />
          </div>
          <div className={styles.productDetailText__price}>
            <Skeleton variant="rectangular" width={100} height={33} />
          </div>
          <Skeleton
            variant="rectangular"
            width={200}
            height={21}
            sx={{ marginBlock: "20px" }}
          />
          <div className={styles.productDetailText__detailsItem}>
            <Skeleton variant="rectangular" width={100} height={16} />
            <Skeleton variant="rectangular" width={100} height={16} />
          </div>
          <div className={styles.productDetailText__detailsItem}>
            <Skeleton variant="rectangular" width={100} height={16} />
            <Skeleton variant="rectangular" width={100} height={16} />
          </div>
          <div className={styles.productDetailText__rating}></div>
          <Skeleton
            variant="rectangular"
            width={200}
            height={21}
            sx={{ marginBlock: "20px" }}
          />
          <Skeleton
            variant="rectangular"
            width={500}
            height={16}
            sx={{ marginBlock: "10px" }}
          />
          <Skeleton variant="rectangular" width={500} height={16} />
        </div>
        <div className={styles.productDetailAction}>
          <div className={styles.productDetailAction__price}>
            <Skeleton variant="rectangular" width={50} height={33} />
          </div>
          <div className={styles.productDetailAction__location}>
            <Skeleton
              variant="rectangular"
              width={200}
              height={28}
              sx={{ marginBlock: "5px" }}
            />
          </div>
          <Skeleton
            variant="rounded"
            width={200}
            height={28}
            sx={{ marginBottom: "20px" }}
          />
          {Array(6)
            .fill()
            .map((_, index) => (
              <div className={styles.productDetailAction__desc} key={index}>
                <Skeleton variant="rectangular" width={200} height={14} />
                <Skeleton variant="rectangular" width={200} height={14} />
              </div>
            ))}
            <Skeleton variant="rectangular" width={200} height={42} />
        </div>
      </div>
    </>
  );
};
export default ProductDetail;
