import React from "react";
import Banner from "../assets/banner.jpg";
import "../styles/Home.css";
import Product from "./Product";
import ProductItem from "../assets/product1.jpg";
const Home = () => {
  return (
    <div className="home">
      <div className="home__container">
        <img src={Banner} alt="banner" className="home__image" />
        <div className="home__row">
          <Product
            title={"The lean starup"}
            price={29.99}
            image={ProductItem}
            rating={5}
          />
      
          <Product
            title={"Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim doloremque voluptates, nisi iure blanditiis tenetur voluptate error consequuntur, labore facilis qui architecto beatae at odit consequatur ea, ipsam vero. Corporis."}
            price={29.99}
            image={ProductItem}
            rating={5}
          />
        </div>
        <div className="home__row">
          <Product
            title={"The lean starup"}
            price={29.99}
            image={ProductItem}
            rating={5}
          />
          <Product
            title={"The lean starup"}
            price={29.99}
            image={ProductItem}
            rating={5}
          />
          <Product
            title={"The lean starup"}
            price={29.99}
            image={ProductItem}
            rating={5}
          />
        </div>
        <div className="home__row">
          <Product
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
