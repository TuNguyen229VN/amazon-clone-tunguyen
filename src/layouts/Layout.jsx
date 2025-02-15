import React, { useState } from "react";
import Header from "./Header";
import PropTypes from "prop-types";
import HeaderBottom from "./HeaderBottom";
import Footer from "./Footer";
import FooterCredit from "./FooterCredit";
import { ButtonToTop } from "../components/button";
import { Outlet } from "react-router-dom";
import { BackgroundBlack } from "../components/background";
import { InputSearchHeader } from "../components/input";
import styles from "./styles/Layout.module.css";
const Layout = ({ children }) => {
  const [openBackground, setOpenBackground] = useState(false);
  return (
    <>
      <BackgroundBlack
        openBackground={openBackground}
        setOpenBackground={setOpenBackground}
      />
      <Header
        openBackground={openBackground}
        setOpenBackground={setOpenBackground}
      ></Header>
      <InputSearchHeader
        openBackground={openBackground}
        setOpenBackground={setOpenBackground}
        className={styles.layout__reponsiveInput}
      />
      <HeaderBottom></HeaderBottom>
      <Outlet />
      {children}
      <ButtonToTop />
      <Footer />
      <FooterCredit />
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node,
};

export default Layout;
