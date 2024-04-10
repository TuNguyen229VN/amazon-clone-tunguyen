import React from "react";
import Header from "./Header";
import PropTypes from "prop-types";
import HeaderBottom from "./HeaderBottom";
const Layout = ({ children }) => {
  return (
    <>
      <Header></Header>
      <HeaderBottom></HeaderBottom>
      {children}
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node, 
};

export default Layout;
