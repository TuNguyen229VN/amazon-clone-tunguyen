import React, { useId } from "react";
import styles from "./styles/Home.module.css";
import Product from "../product/Product";
import ProductItem from "../../assets/product1.jpg";
import { Banner } from "../../components/banner";
import { bannerData } from "../../data_av/bannerData";
import { CatergoryCarousel, ListItemCarousel } from "../../components/carousel";
const Home = () => {
  return (
    <div className={styles.home}>
      <div className={styles.home__container}>
        <div className={styles.home__blockTop}>
          <Banner bannerData={bannerData} className={styles.home__image} />
          <CatergoryCarousel
            sizeCategory={4}
            nameCatagory={[
              "Electronics",
              "Jewelry",
              "Men's clothing",
              "Women's clothing",
              "Deals in PCs",
              "Personal Care under $25",
              "Creating business solutions",
              "Laptops for every need",
            ]}
            startImgCategory={0}
            endImgCategory={5}
            className={styles.home__categoryFirst}
          />
          <CatergoryCarousel
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
          title="Popular products in Smartphones internationally"
          nameProduct="smartphones"
        />
        <ListItemCarousel
          title="Popular products in Jewelery internationally"
          nameProduct="womens-jewellery"
        />
        <CatergoryCarousel
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
          title="Deals Under clothing $25"
          nameProduct="womens-dresses"
        />
        <ListItemCarousel
          title="Related to items you've viewed"
          nameProduct="mens-shirts"
        />
        <ListItemCarousel
          title="Most wished for in Motorcycle"
          nameProduct="motorcycle"
        />
        {/* <div className={styles.home__row}>
          <Product
            id={useId()}
            title={"The lean starup"}
            price={29.99}
            image={ProductItem}
            rating={5}
          />

          <Product
            id={useId()}
            title={
              "Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim doloremque voluptates, nisi iure blanditiis tenetur voluptate error consequuntur, labore facilis qui architecto beatae at odit consequatur ea, ipsam vero. Corporis."
            }
            price={29.99}
            image={ProductItem}
            rating={5}
          />
        </div>
        <div className={styles.home__row}>
          <Product
            id={useId()}
            title={"The lean starup"}
            price={29.99}
            image={ProductItem}
            rating={5}
          />
          <Product
            id={useId()}
            title={"The lean starup"}
            price={29.99}
            image={ProductItem}
            rating={5}
          />
          <Product
            id={useId()}
            title={"The lean starup"}
            price={29.99}
            image={ProductItem}
            rating={5}
          />
        </div>
        <div className={styles.home__row}>
          <Product
            id={useId()}
            title={"The lean starup"}
            price={29.99}
            image={ProductItem}
            rating={5}
          />
        </div> */}
      </div>
    </div>
  );
};

export default Home;
