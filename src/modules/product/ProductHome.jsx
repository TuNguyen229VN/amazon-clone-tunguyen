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
import { replaceSpecialChars } from "../../utils/replaceDashToSpace";
import { Skeleton, useMediaQuery } from "@mui/material";
import { useTranslation } from "react-i18next";

const LIMIT = 20;
const ProductHome = () => {
  const { slug } = useParams();
  const search = new URLSearchParams(window.location.search).get("search");
  const [currentPage, setCurrentPage] = useState(1);
  const [skip, setSkip] = useState(0);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingTop, setLoadingTop] = useState(true);
  const [count, setCount] = useState(0);
  const [filter, setFilter] = useState("");
  const [sortValue, setSortValue] = useState("charactDesc");
  const [selectedCategories, setSelectedCategories] = useState(["all"]);
  const [selectPrice, setSelectPrice] = useState();
  const [selectRating, setSelectRating] = useState();
  const is1024Screen = useMediaQuery("(max-width: 1024px)");
  const is768Screen = useMediaQuery("(max-width: 768px)");
  const is480Screen = useMediaQuery("(max-width: 480px)");
  const [t, i18n] = useTranslation("global");
  
  useEffect(() => {
    document.title = "Amazon | Deals";
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
        setLoading(true);
        const URL_SEARCH =
          search &&
          `${API_PRODUCT}/search?q=${replaceSpecialChars(
            search
          )}&limit=${LIMIT}&skip=${LIMIT * skip}`;
        const URL_CATEGORY = `${API_PRODUCT}${
          slug && slug != "all" ? `/category/${slug}` : "/"
        }?limit=${LIMIT}&skip=${LIMIT * skip}`;

        const res = await axios.get(search ? URL_SEARCH : URL_CATEGORY);
        if (res.status === STATUS_SUCCESS) {
          console.log(res.data)
          setSelectedCategories(["all"]);
          setSelectPrice();
          setSelectRating();
          setProducts(res.data.products);
          setCount(res.data?.total);
          // setLoading(false);
          setLoadingTop(false);
        }
      } catch (error) {
        setLoading(false);
        setLoadingTop(false);
        return;
      }
    };
    getProduct();
  }, [count, currentPage, filter, slug, skip, search]);

  return (
    <div className={styles.productHome}>
      {!loadingTop ? (
        <h2 className={styles.productHome__title}>{t("product.title")}</h2>
      ) : (
        <Skeleton
          variant="text"
          width={150}
          height={
            is480Screen
              ? "38px"
              : is768Screen
              ? "41px"
              : is1024Screen
              ? "69px"
              : "73px"
          }
          sx={{ padding: "20px", marginLeft: is480Screen ? "10px" : "20px" }}
        />
      )}

      <ProductCategoryFilter loading={loadingTop} />
      <div className={styles.productHome__blockSelect}>
        <SelectBox
          loading={loadingTop}
          dataSelect={dataSelectSort}
          setSortValue={setSortValue}
        />
      </div>
      <div className={styles.productHome__content}>
        <ProductFilterLeft
          selectedCategories={selectedCategories}
          setSelectedCategories={setSelectedCategories}
          selectPrice={selectPrice}
          setSelectPrice={setSelectPrice}
          selectRating={selectRating}
          setSelectRating={setSelectRating}
          loading={loadingTop}
        />
        <ProductList
          products={products}
          loading={loading}
          setLoading={setLoading}
          sortValue={sortValue}
          selectedCategories={selectedCategories}
          selectPrice={selectPrice}
          selectRating={selectRating}
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
        loading={loadingTop}
      />
    </div>
  );
};

export default ProductHome;
