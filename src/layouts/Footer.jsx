import React from "react";
import styles from "./styles/Footer.module.css";
import Logo from "/assets/logo.png";
import LanguageIcon from "@mui/icons-material/Language";
import IconFlag from "/assets/united-states.png";
const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer__top}>
        <div className={styles.footer__col}>
          <p className={styles.footer__title}>Get to Know Us</p>
          <div className={styles.footer__item}>
            <p>Carrers</p>
            <p>Blog</p>
            <p>About Amazon</p>
            <p>Investor Relations</p>
            <p>Amazon Devices</p>
            <p>Amazon Science</p>
          </div>
        </div>
        <div className={styles.footer__col}>
          <p className={styles.footer__title}>Make Money with Us</p>
          <div className={styles.footer__item}>
            <p>Sell products on Amazon</p>
            <p>Sell on Amazon Business</p>
            <p>Sell apps on Amazon</p>
            <p>Become an Affiliate</p>
            <p>Advertise Your Products</p>
            <p>Self-Publish with Us</p>
            <p>Host an Amazon Hubs</p>
            <p>› See More Make Money with Us</p>
          </div>
        </div>
        <div className={styles.footer__col}>
          <p className={styles.footer__title}>Amazon Payment Products</p>
          <div className={styles.footer__item}>
            <p>Amazon Business Card</p>
            <p>Shop with Points</p>
            <p>Reload Your Balance</p>
            <p>Investor Relations</p>
            <p>Amazon Devices</p>
            <p>Amazon Currency Converter</p>
          </div>
        </div>
        <div className={styles.footer__col}>
          <p className={styles.footer__title}>Let Us Help You</p>
          <div className={styles.footer__item}>
            <p>
              Amazon and COVID- <span>19</span>
            </p>
            <p>Your Account</p>
            <p>Your Orders</p>
            <p>
              Shipping Rates & <span>Policies</span>
            </p>
            <p>
              Returns & <span>Replacements</span>
            </p>
            <p>
              Manage Your <span>Content and Devices</span>{" "}
            </p>
            <p>Amazon Assistant</p>
            <p>Help</p>
          </div>
        </div>
      </div>
        <div className={styles.footer__line}></div>
      <div className={styles.footer__bottom}>
        <img src={Logo} alt="logo" className={styles.footer__logo} />
        <div className={styles.footer__action}>
          <div className={styles.footer__actionItem}>
            <LanguageIcon fontSize="small"/>
            English
          </div>
          <div className={styles.footer__actionItem}>
            <span>$</span>USD - U.S. Dollar
          </div>
          <div className={styles.footer__actionItem}>
            <img src={IconFlag} alt="icon" />
            United States
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
