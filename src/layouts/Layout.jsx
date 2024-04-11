import React from "react";
import Header from "./Header";
import PropTypes from "prop-types";
import HeaderBottom from "./HeaderBottom";
import Footer from "./Footer";
import FooterCredit from "./FooterCredit";
import { ButtonToTop } from "../components/button";
const Layout = ({ children }) => {
  return (
    <>
      <Header></Header>
      <HeaderBottom></HeaderBottom>
      {children}
      <ButtonToTop/>
      <Footer/>
      <FooterCredit/>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node, 
};

export default Layout;
