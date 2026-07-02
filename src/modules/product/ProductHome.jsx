import React, { useEffect, useState, useMemo } from "react";
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
  const [allProducts, setAllProducts] = useState([]); // full dataset của category/search
  const [loading, setLoading] = useState(true);
  const [loadingTop, setLoadingTop] = useState(true);
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

  // Fetch TOÀN BỘ data theo category/search — chỉ chạy lại khi slug/search đổi
  useEffect(() => {
    if (slug && slug !== "all") {
      setFilter(slug);
    } else if (slug === "all") {
      setFilter("");
    }

    const getProduct = async () => {
      try {
        setLoading(true);
        const URL_SEARCH =
          search &&
          `${API_PRODUCT}/search?q=${replaceSpecialChars(search)}&limit=0`;
        const URL_CATEGORY = `${API_PRODUCT}${
          slug && slug !== "all" ? `/category/${slug}` : "/"
        }?limit=0`;

        const res = await axios.get(search ? URL_SEARCH : URL_CATEGORY);
        if (res.status === STATUS_SUCCESS) {
          setSelectedCategories(["all"]);
          setSelectPrice();
          setSelectRating();
          setAllProducts(res.data.products || []);
          setCurrentPage(1);
          setSkip(0);
          setLoadingTop(false);
        }
      } catch (error) {
        setLoading(false);
        setLoadingTop(false);
      }
    };
    getProduct();
  }, [slug, search]);

  // Filter trên TOÀN BỘ allProducts (không giới hạn theo trang)
  const filteredProducts = useMemo(() => {
    let result = allProducts;

    if (selectedCategories?.length && selectedCategories[0] !== "all") {
      result = result.filter((item) =>
        selectedCategories.includes(item.category)
      );
    }
    if (selectRating) {
      result = result.filter((item) => item.rating > selectRating);
    }
    if (selectPrice) {
      // giữ nguyên logic cũ: selectPrice đang so với discountPercentage
      result = result.filter((item) => item.discountPercentage > selectPrice);
    }
    return result;
  }, [allProducts, selectedCategories, selectRating, selectPrice]);

  // Sort trên kết quả đã filter
  const sortedProducts = useMemo(() => {
    const result = [...filteredProducts];
    switch (sortValue) {
      case "charactDesc":
        return result.sort((a, b) => a?.title.localeCompare(b?.title));
      case "charactAsc":
        return result.sort((a, b) => b?.title.localeCompare(a?.title));
      case "priceDesc":
        return result.sort((a, b) => b?.price - a?.price);
      case "priceAsc":
        return result.sort((a, b) => a?.price - b?.price);
      default:
        return result;
    }
  }, [filteredProducts, sortValue]);

  // Phân trang trên kết quả đã filter + sort
  const pagedProducts = useMemo(() => {
    const start = LIMIT * skip;
    return sortedProducts.slice(start, start + LIMIT);
  }, [sortedProducts, skip]);

  useEffect(() => {
    setLoading(false);
  }, [pagedProducts]);

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
          products={pagedProducts}
          hasAnyProducts={allProducts.length > 0}
          hasFilteredProducts={filteredProducts.length > 0}
          loading={loading}
        />
      </div>
      <ProducPaging
        products={pagedProducts}
        count={filteredProducts.length}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        setSkip={setSkip}
        skip={skip}
        loading={loadingTop}
         itemsPerPage={LIMIT}
      />
    </div>
  );
};

export default ProductHome;