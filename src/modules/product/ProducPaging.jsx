import React, { useState } from "react";
import styles from "./styles/ProductHome.module.css";
import ReactPaginate from "react-paginate";
import PropTypes from "prop-types";
const ITEM = 20;
const ProducPaging = ({
  products = [],
  currentPage = 0,
  setCurrentPage,
  count = 0,
  setCount,
  skip = 0,
  setSkip,
}) => {
  // Click paging number
  const handlePageClick = (data) => {
    setCurrentPage(data.selected + 1);
    setSkip(data.selected);
  };
  return (
    <>
      {products.length > 0 && (
        <div
          aria-label="Page navigation example"
          className={styles.productPaging}
        >
          <ReactPaginate
            containerClassName={styles.pagination}
            activeLinkClassName={styles.active}
            nextClassName={styles.productPaging__pageItem}
            previousClassName={styles.productPaging__pageItem}
            breakLabel={
              <div className={styles.productPaging__pageItem}>...</div>
            }
            pageCount={Math.ceil(count / ITEM)}
            disabledLinkClassName={styles.disalbeLink}
            marginPagesDisplayed={3}
            onPageChange={handlePageClick}
            pageLinkClassName={styles.pagelink}
            previousLinkClassName={styles.pagelink}
            nextLinkClassName={styles.pagelink}
            breakClassName={styles.pageItem}
            breakLinkClassName={styles.pagelink}
            pageRangeDisplayed={2}
            forcePage={skip}
          />
        </div>
      )}
    </>
  );
};
ProducPaging.propTypes = {
  products: PropTypes.array,
  count: PropTypes.number,
  setCount: PropTypes.func,
  currentPage: PropTypes.number,
  setCurrentPage: PropTypes.func,
  skip: PropTypes.number,
  setSkip: PropTypes.func,
};
export default ProducPaging;
