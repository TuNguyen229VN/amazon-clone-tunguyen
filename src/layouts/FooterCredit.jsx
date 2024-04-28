import React from "react";
import styles from "./styles/FooterCredit.module.css";
import { useTranslation } from "react-i18next";
const FooterCredit = () => {
  const [t, i18n] = useTranslation("global");
  return (
    <div className={styles.footerCredit}>
      <div className={styles.footerCredit__top}>
        <div className={styles.footerCredit__col}>
          <div className={styles.footerCredit__colItem}>
            <p className={styles.footerCredit__title}>
              {t("footerCredit.Amazon Music")}
            </p>
            <p className={styles.footerCredit__desc}>
              {t("footerCredit.Stream millions of songs")}
            </p>
          </div>
          <div className={styles.footerCredit__colItem}>
            <p className={styles.footerCredit__title}>
              {t("footerCredit.Amazon Global")}
            </p>
            <p className={styles.footerCredit__desc}>
              {t("footerCredit.Ship Orders")}
            </p>
            <p className={styles.footerCredit__desc}>
              {t("footerCredit.Internationally")}
            </p>
          </div>
          <div className={styles.footerCredit__colItem}>
            <p className={styles.footerCredit__title}>
              {t("footerCredit.IMDbPro")}
            </p>
            <p className={styles.footerCredit__desc}>
              {t("footerCredit.Get Info Entertainment")}
            </p>
            <p className={styles.footerCredit__desc}>
              {t("footerCredit.Professionals")}
            </p>
            <p className={styles.footerCredit__desc}>
              {t("footerCredit.Need")}
            </p>
          </div>
        </div>
        <div className={styles.footerCredit__col}>
          <div className={styles.footerCredit__colItem}>
            <p className={styles.footerCredit__title}>
              {t("footerCredit.Amazon Ads")}
            </p>
            <p className={styles.footerCredit__desc}>
              {t("footerCredit.Reach customers wherever they spend their time")}
            </p>
          </div>
          <div className={styles.footerCredit__colItem}>
            <p className={styles.footerCredit__title}>
              {t("footerCredit.Home Services")}
            </p>
            <p className={styles.footerCredit__desc}>
              {t("footerCredit.Experienced Prost")}
            </p>
            <p className={styles.footerCredit__desc}>
              {t("footerCredit.Happiness")}
            </p>
            <p className={styles.footerCredit__desc}>
              {t("footerCredit.Guarantee")}
            </p>
          </div>
          <div className={styles.footerCredit__colItem}>
            <p className={styles.footerCredit__title}>
              {t("footerCredit.Kindle Direct Publishing")}
            </p>
            <p className={styles.footerCredit__desc}>
              {t("footerCredit.Indie Digital & Print Publishing")}
            </p>
            <p className={styles.footerCredit__desc}>
              {t("footerCredit.Made Easy")}
            </p>
          </div>
          <div className={styles.footerCredit__colItem}>
            <p className={styles.footerCredit__title}>
              {t("footerCredit.eero WiFi")}
            </p>
            <p className={styles.footerCredit__desc}>
              {t("footerCredit.Stream 4K Video in Every Room")}
            </p>
          </div>
        </div>
        <div className={styles.footerCredit__col}>
          <div className={styles.footerCredit__colItem}>
            <p className={styles.footerCredit__title}>
              {t("footerCredit.6pm")}
            </p>
            <p className={styles.footerCredit__desc}>
              {t("footerCredit.Score deals on fashion brands")}
            </p>
          </div>
          <div className={styles.footerCredit__colItem}>
            <p className={styles.footerCredit__title}>
              {t("footerCredit.Amazon Web Services")}
            </p>
            <p className={styles.footerCredit__desc}>
              {t("footerCredit.Scalable Cloud")}
            </p>
            <p className={styles.footerCredit__desc}>
              {t("footerCredit.Computing Services")}
            </p>
          </div>
          <div className={styles.footerCredit__colItem}>
            <p className={styles.footerCredit__title}>
              {t("footerCredit.Prime Video Direct")}
            </p>
            <p className={styles.footerCredit__desc}>
              {t("footerCredit.Video")}
            </p>
            <p className={styles.footerCredit__desc}>Distribution</p>
            <p className={styles.footerCredit__desc}>
              {t("footerCredit.Made Easy")}
            </p>
          </div>
          <div className={styles.footerCredit__colItem}>
            <p className={styles.footerCredit__title}>
              {t("footerCredit.Blink")}
            </p>
            <p className={styles.footerCredit__desc}>
              {t("footerCredit.Smart Security for Every Home")}
            </p>
          </div>
        </div>
        <div className={styles.footerCredit__col}>
          <div className={styles.footerCredit__colItem}>
            <p className={styles.footerCredit__title}>
              {t("footerCredit.AbeBooks")}
            </p>
            <p className={styles.footerCredit__desc}>
              {t("footerCredit.Books, art & collectibles")}
            </p>
          </div>
          <div className={styles.footerCredit__colItem}>
            <p className={styles.footerCredit__title}>Audible</p>
            <p className={styles.footerCredit__desc}>
              {t("footerCredit.Listen to Books & Original")}
            </p>
            <p className={styles.footerCredit__desc}>
              {t("footerCredit.Audio Performances")}
            </p>
          </div>
          <div className={styles.footerCredit__colItem}>
            <p className={styles.footerCredit__title}>
              {t("footerCredit.Shopbop")}
            </p>
            <p className={styles.footerCredit__desc}>
              {t("footerCredit.Designer")}
            </p>
            <p className={styles.footerCredit__desc}>
              {t("footerCredit.Fashion Brands")}
            </p>
          </div>
          <div className={styles.footerCredit__colItem}>
            <p className={styles.footerCredit__title}>
              {t("footerCredit.Neighbors App")}
            </p>
            <p className={styles.footerCredit__desc}>
              {t("footerCredit.Real-Time Crime & Safety Alerts")}
            </p>
          </div>
        </div>
        <div className={styles.footerCredit__col}>
          <div className={styles.footerCredit__colItem}>
            <p className={styles.footerCredit__title}>
              {t("footerCredit.ACX")}
            </p>
            <p className={styles.footerCredit__desc}>
              {t("footerCredit.Audiobook Publishing")}
            </p>
            <p className={styles.footerCredit__desc}>
              {t("footerCredit.Made Easy")}
            </p>
          </div>
          <div className={styles.footerCredit__colItem}>
            <p className={styles.footerCredit__title}>
              {t("footerCredit.Box Office Mojo")}
            </p>
            <p className={styles.footerCredit__desc}>
              {t("footerCredit.Find Movie")}
            </p>
            <p className={styles.footerCredit__desc}>
              {t("footerCredit.Box Office Data")}
            </p>
          </div>
          <div className={styles.footerCredit__colItem}>
            <p className={styles.footerCredit__title}>
              {t("footerCredit.Woot!")}
            </p>
            <p className={styles.footerCredit__desc}>
              {t("footerCredit.Deals and Shenanigans")}
            </p>
          </div>
          <div className={styles.footerCredit__colItem}>
            <p className={styles.footerCredit__title}>
              {t("footerCredit.Amazon Subscription Boxes")}
            </p>
            <p className={styles.footerCredit__desc}>
              {t("footerCredit.Top subscription boxes – right to your door")}
            </p>
          </div>
        </div>
        <div className={styles.footerCredit__col}>
          <div className={styles.footerCredit__colItem}>
            <p className={styles.footerCredit__title}>
              {t("footerCredit.Sell on Amazon")}
            </p>
            <p className={styles.footerCredit__desc}>
              {t("footerCredit.Start a Selling")}
            </p>
            <p className={styles.footerCredit__desc}>
              {t("footerCredit.Account")}
            </p>
          </div>
          <div className={styles.footerCredit__colItem}>
            <p className={styles.footerCredit__title}>
              {t("footerCredit.Goodreads")}
            </p>
            <p className={styles.footerCredit__desc}>
              {t("footerCredit.Book reviews & recommendations")}
            </p>
          </div>
          <div className={styles.footerCredit__colItem}>
            <p className={styles.footerCredit__title}>
              {t("footerCredit.Zappos")}
            </p>
            <p className={styles.footerCredit__desc}>
              {t("footerCredit.Shoes & Clothing")}
            </p>
          </div>
          <div className={styles.footerCredit__colItem}>
            <p className={styles.footerCredit__title}>
              {t("footerCredit.PillPack")}
            </p>
            <p className={styles.footerCredit__desc}>
              {t("footerCredit.Pharmacy")}
            </p>
            <p className={styles.footerCredit__desc}>
              {t("footerCredit.Simplified")}
            </p>
          </div>
        </div>
        <div className={styles.footerCredit__col}>
          <div className={styles.footerCredit__colItem}>
            <p className={styles.footerCredit__title}>
              {t("footerCredit.Amazon Business")}
            </p>
            <p className={styles.footerCredit__desc}>
              {t("footerCredit.Everything For Your Business")}
            </p>
          </div>
          <div className={styles.footerCredit__colItem}>
            <p className={styles.footerCredit__title}>
              {t("footerCredit.IMDb")}
            </p>
            <p className={styles.footerCredit__desc}>
              {t("footerCredit.Movies, TV & Celebrities")}
            </p>
          </div>
          <div className={styles.footerCredit__colItem}>
            <p className={styles.footerCredit__title}>
              {t("footerCredit.Ring")}
            </p>
            <p className={styles.footerCredit__desc}>
              {t("footerCredit.Smart Home")}
            </p>
            <p className={styles.footerCredit__desc}>
              {t("footerCredit.Security")}
            </p>
            <p className={styles.footerCredit__desc}>
              {t("footerCredit.Systems")}
            </p>
          </div>
        </div>
      </div>
      <div className={styles.footerCredit__bottom}>
        <div className={styles.footerCredit__bottomRules}>
          <p>{t("footerCredit.Conditions of Use")}</p>
          <p>{t("footerCredit.Privacy Notice")}</p>
          <p>{t("footerCredit.Consumer Health Data Privacy Disclosure")}</p>
          <p>{t("footerCredit.Your Ads Privacy Choices")}</p>
        </div>
        <div className={styles.footerCredit__bottomYear}>
          {t("footerCredit.© 1996-2024, Amazon.com, Inc. or its affiliates")}
        </div>
      </div>
    </div>
  );
};

export default FooterCredit;
