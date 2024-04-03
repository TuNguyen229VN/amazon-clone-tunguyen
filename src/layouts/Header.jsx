import React from "react";
import "../styles/Header.css";
import Logo from "../assets/logo.png";
import SearchIcon from "@mui/icons-material/Search";
import { ShoppingBasket } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useStateValue } from "../hooks/useStateValue";
import { auth } from "../firebase/firebase-config";
import { signOut } from "firebase/auth";

const Header = () => {
  const [{ basket, user }, dispatch] = useStateValue();

  const handleAuthentication = () => {
    if (user) {
      signOut(auth);
    }
  };

  return (
    <div className="header">
      <Link to={"/"}>
        <img src={Logo} alt="logo" className="header__logo" />
      </Link>

      <div className="header__search">
        <input
          type="text"
          className="header__searchInput"
          placeholder="Search Amazon"
        />
        <SearchIcon className="header__searchIcon" />
      </div>

      <div className="header__nav">
        <Link to={!user && "/login"}>
          <div onClick={handleAuthentication} className="header__option">
            <span className="header__optionLineOne">Hello guest</span>
            <span className="header__optionLineTwo">
              {user ? "Sign out" : "Sign in"}
            </span>
          </div>
        </Link>
        <div className="header__option">
          <span className="header__optionLineOne">Returns</span>
          <span className="header__optionLineTwo">& Orders</span>
        </div>
        <div className="header__option">
          <span className="header__optionLineOne">Your</span>
          <span className="header__optionLineTwo">Prime</span>
        </div>
      </div>

      <Link to={"/checkout"}>
        <div className="header__optionBasket">
          <ShoppingBasket />
          <span className="header__optionLineTwo header__basketCount">
            {basket?.length ?? 0}
          </span>
        </div>
      </Link>
    </div>
  );
};

export default Header;
