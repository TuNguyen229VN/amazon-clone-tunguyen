import React, { useId } from "react";
import styles from "./styles/Home.module.css";
import Product from "../product/Product";
import ProductItem from "../../assets/product1.jpg";
import { Banner } from "../../components/banner";
import { bannerData } from "../../data_av/bannerData";
const Home = () => {
  return (
    <div className={styles.home}>
      <div className={styles.home__container}>
        <Banner bannerData={bannerData} className={styles.home__image} />
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
        </div>
      </div>
    </div>
  );
};

export default Home;
