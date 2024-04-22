import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./styles/ProductHome.module.css";
import ProductCategoryFilter from "./ProductCategoryFilter";
import ProductFilterLeft from "./ProductFilterLeft";
import ProductList from "./ProductList";
import { dataSelectSort } from "../../data_av/dataSelectSort";
import ProducPaging from "./ProducPaging";
import axios from "axios";
import { API_PRODUCT } from "../../constant/constanst";
import { STATUS_SUCCESS } from "../../constant/status";
import { SelectBox } from "../../components/selecbox";
import { useStateValue } from "../../hooks/useStateValue";
import { replaceSpecialChars } from "../../utils/replaceDashToSpace";

const LIMIT = 20;
const ProductHome = () => {
  const { slug } = useParams();
  const search = new URLSearchParams(window.location.search).get("search");
  const [currentPage, setCurrentPage] = useState(1);
  const [skip, setSkip] = useState(0);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(0);
  const [filter, setFilter] = useState("");
  const [sortValue, setSortValue] = useState("charactDesc");
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
        const URL_SEARCH =
          search &&
          `${API_PRODUCT}/search?q=${replaceSpecialChars(
            search
          )}&limit=${LIMIT}&skip=${LIMIT * skip}`;
          console.log(URL_SEARCH)
        const URL_CATEGORY = `${API_PRODUCT}${
          slug && slug != "all" ? `/category/${slug}` : "/"
        }?limit=${LIMIT}&skip=${LIMIT * skip}`;

        const res = await axios.get(search ? URL_SEARCH : URL_CATEGORY);
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
  }, [count, currentPage, filter, slug, skip, search]);

  return (
    <div className={styles.productHome}>
      <h2 className={styles.productHome__title}>Today&apos;s Deals</h2>
      <ProductCategoryFilter />
      <div className={styles.productHome__blockSelect}>
        <SelectBox dataSelect={dataSelectSort} setSortValue={setSortValue} />
      </div>
      <div className={styles.productHome__content}>
        <ProductFilterLeft />
        <ProductList
          products={products}
          loading={loading}
          setLoading={setLoading}
          sortValue={sortValue}
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
