import React, { useId } from "react";
import Banner from "../../assets/banner.jpg";
import "../../styles/Home.css";
import Product from "../product/Product";
import ProductItem from "../../assets/product1.jpg";
const Home = () => {
  const {VITE_API_KEY_FIREBASE,}=import.meta.env
  console.log(VITE_API_KEY_FIREBASE)
  return (
    <div className="home">
      <div className="home__container">
        <img src={Banner} alt="banner" className="home__image" />
        <div className="home__row">
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
        <div className="home__row">
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
        <div className="home__row">
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
