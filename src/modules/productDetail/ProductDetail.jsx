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
    </div>
  );
};

export default ProductDetail;
