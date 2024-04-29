import React, { useEffect, useRef, useState } from "react";
import styles from "./styles/Footer.module.css";
import Logo from "/assets/logo.png";
import LanguageIcon from "@mui/icons-material/Language";
import IconFlag from "/assets/united-states.png";
import { useTranslation } from "react-i18next";
const Footer = () => {
  const [showDiv, setshowDiv] = useState(false);
  const ref = useRef(null);
  const [t, i18n] = useTranslation("global");
  const handleChange = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("lng", lang);
    setshowDiv(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setshowDiv(false);
      }
    };
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  return (
    <footer className={styles.footer}>
      <div className={styles.footer__top}>
        <div className={styles.footer__col}>
          <p className={styles.footer__title}>{t("footer.Get to Know Us")}</p>
          <div className={styles.footer__item}>
            <p>{t("footer.Carrers")}</p>
            <p>{t("footer.Blog")}</p>
            <p>{t("footer.About Amazon")}</p>
            <p>{t("footer.Investor Relations")}</p>
            <p>{t("footer.Amazon Devices")}</p>
            <p>{t("footer.Amazon Science")}</p>
          </div>
        </div>
        <div className={styles.footer__col}>
          <p className={styles.footer__title}>
            {t("footer.Make Money with Us")}
          </p>
          <div className={styles.footer__item}>
            <p>{t("footer.Sell products on Amazon")}</p>
            <p>{t("footer.Sell on Amazon Business")}</p>
            <p>{t("footer.Sell apps on Amazon")}</p>
            <p>{t("footer.Become an Affiliate")}</p>
            <p>{t("footer.Advertise Your Products")}</p>
            <p>{t("footer.Self-Publish with Us")}</p>
            <p>{t("footer.Host an Amazon Hubs")}</p>
            <p>{t("footer.› See More Make Money with Us")}</p>
          </div>
        </div>
        <div className={styles.footer__col}>
          <p className={styles.footer__title}>
            {t("footer.Amazon Payment Products")}
          </p>
          <div className={styles.footer__item}>
            <p>{t("footer.Amazon Business Card")}</p>
            <p>{t("footer.Shop with Points")}</p>
            <p>{t("footer.Reload Your Balance")}</p>
            <p>{t("footer.Investor Relations")}</p>
            <p>{t("footer.Amazon Devices")}</p>
            <p>{t("footer.Amazon Currency Converter")}</p>
          </div>
        </div>
        <div className={styles.footer__col}>
          <p className={styles.footer__title}>{t("footer.Let Us Help You")}</p>
          <div className={styles.footer__item}>
            <p>
              {t("footer.Amazon and COVID-")} <span>{t("footer.19")}</span>
            </p>
            <p>{t("footer.Your Account")}</p>
            <p>{t("footer.Your Orders")}</p>
            <p>
              {t("footer.Shipping Rates")}
              <span>{t("footer.Policies")}</span>
            </p>
            <p>
              {t("footer.Returns")}
              <span>{t("footer.Replacements")}</span>
            </p>
            <p>
              {t("footer.Manage Your")}{" "}
              <span>{t("footer.Content and Devices")}</span>
            </p>
            <p>{t("footer.Amazon Assistant")}</p>
            <p>{t("footer.Help")}</p>
          </div>
        </div>
      </div>
      <div className={styles.footer__line}></div>
      <div className={styles.footer__bottom}>
        <img src={Logo} alt="logo" className={styles.footer__logo} />
        <div className={styles.footer__action}>
          <div
            ref={ref}
            className={styles.footer__actionItem}
            onClick={() => setshowDiv(!showDiv)}
          >
            <LanguageIcon fontSize="small" />
            {t("footer.Lang")}
            {showDiv && (
              <div className={styles.wrapLang}>
                <p
                  onClick={() => {
                    handleChange("en");
                  }}
                >
                  {t("footer.LangEN")}
                </p>
                <p
                  onClick={() => {
                    handleChange("vi");
                  }}
                >
                   {t("footer.LangVI")}
                </p>
              </div>
            )}
          </div>
          <div className={styles.footer__actionItem}>
            <span>$</span>USD - U.S. Dollar
          </div>
          <div className={styles.footer__actionItem}>
            <img src={IconFlag} alt="icon" />
            {t("footer.United States")}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
