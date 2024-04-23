import React, { useId, useState } from "react";
import styles from "./styles/Home.module.css";
import Product from "../product/Product";
import ProductItem from "/assets/product1.jpg";
import { Banner } from "../../components/banner";
import { bannerData } from "../../data_av/bannerData";
import { CatergoryCarousel, ListItemCarousel } from "../../components/carousel";
const Home = () => {
  const [loading, setLoading] = useState(true);
  return (
    <div className={styles.home}>
      <div className={styles.home__container}>
        <div className={styles.home__blockTop}>
          <Banner bannerData={bannerData} className={styles.home__image} />
          <CatergoryCarousel
            loading={loading}
            sizeCategory={4}
            nameCatagory={[
              "Electronics",
              "Jewelry",
              "Men's clothing",
              "Women's clothing",
            ]}
            startImgCategory={0}
            endImgCategory={5}
            className={styles.home__categoryFirst}
          />
          <CatergoryCarousel
            loading={loading}
            sizeCategory={4}
            nameCatagory={[
              "Deals in PCs",
              "Personal Care under $25",
              "Creating business solutions",
              "Laptops for every need",
            ]}
            startImgCategory={4}
            endImgCategory={8}
            className={styles.home__categorySec}
          />
        </div>
        <ListItemCarousel
          loading={loading}
          setLoading={setLoading}
          title="Popular products in Smartphones internationally"
          nameProduct="smartphones"
        />
        <ListItemCarousel
          loading={loading}
          setLoading={setLoading}
          title="Popular products in Jewelery internationally"
          nameProduct="womens-jewellery"
        />
        <CatergoryCarousel
          loading={loading}
          sizeCategory={4}
          nameCatagory={[
            "Deals in PCs",
            "Personal Care under $25",
            "Creating business solutions",
            "Laptops for every need",
          ]}
          startImgCategory={4}
          endImgCategory={8}
          className={styles.home__category}
        />
        <ListItemCarousel
          loading={loading}
          setLoading={setLoading}
          title="Deals Under clothing $25"
          nameProduct="womens-dresses"
        />
        <ListItemCarousel
          loading={loading}
          setLoading={setLoading}
          title="Related to items you've viewed"
          nameProduct="mens-shirts"
        />
        <ListItemCarousel
          loading={loading}
          setLoading={setLoading}
          title="Most wished for in Motorcycle"
          nameProduct="motorcycle"
        />
      </div>
    </div>
  );
};

export default Home;
