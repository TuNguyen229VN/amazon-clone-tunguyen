import React from "react";
import "../styles/Header.css";
import Logo from "../assets/logo.png"

const Header = () => {
  return (
    <div className="header">
      <img src={Logo} alt="logo" className="header__logo" />
      <div className="header__search">
        <input type="text" className="header__search" />
      </div>
      <div className="header__nav">
        <div className="header__option">
          <span className="header__optionLineOne">Hello guest</span>
          <span className="header__optionLineTwo">Sign in</span>
        </div>
        <div className="header__option">
          <span className="header__optionLineOne">Returns</span>
          <span className="header__optionLineTwo">& Orders</span>
        </div>
        <div className="header__option">
          <span className="header__optionLineOne">Your</span>
          <span className="header__optionLineTwo">Prime</span>
        </div>
      </div>
    </div>
  );
};

export default Header;
