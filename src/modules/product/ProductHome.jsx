import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./styles/ProductHome.module.css";
import ProductCategoryFilter from "./ProductCategoryFilter";
import ProductFilterLeft from "./ProductFilterLeft";
import ProductList from "./ProductList";
import SelectBox from "../../components/selecbox/SelectBox";
import { dataSelectSort } from "../../data_av/dataSelectSort";
import ProducPaging from "./ProducPaging";
import axios from "axios";
import { API_PRODUCT } from "../../constant/constanst";
import { STATUS_SUCCESS } from "../../constant/status";

const LIMIT = 20;
const ProductHome = () => {
  const { slug } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [skip, setSkip] = useState(0);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(0);
  const [filter, setFilter] = useState("");
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    if (slug && slug !== "all") {
      setFilter(slug);
      if (filter !== slug) {
        setCurrentPage(1);
        setSkip(0);
      }
    } else if (slug === "all") {
      if (filter) {
        setCurrentPage(1);
        setSkip(0);
      }
      setFilter("");
    }

    const getProduct = async () => {
      try {
        const res = await axios.get(
          `${API_PRODUCT}${
            slug && slug != "all" ? `/category/${filter}` : "/"
          }?limit=${LIMIT}&skip=${LIMIT * skip}`
        );
        if (res.status === STATUS_SUCCESS) {
          setProducts(res.data.products);
          setCount(res.data?.total);
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
        return;
      }
    };
    getProduct();
  }, [count, currentPage, filter, slug, skip]);

  return (
    <div className={styles.productHome}>
      <h2 className={styles.productHome__title}>Today&apos;s Deals</h2>
      <ProductCategoryFilter />
      <div className={styles.productHome__blockSelect}>
        <SelectBox dataSelect={dataSelectSort} />
      </div>
      <div className={styles.productHome__content}>
        <ProductFilterLeft />
        <ProductList
          products={products}
          loading={loading}
          setLoading={setLoading}
        />
      </div>
      <ProducPaging
        products={products}
        count={count}
        setCount={setCount}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        setSkip={setSkip}
        skip={skip}
        loading={loading}
        setLoading={setLoading}
      />
    </div>
  );
};

export default ProductHome;
