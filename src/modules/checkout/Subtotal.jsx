import React from "react";
import styles from "./styles/Subtotal.module.css";
import CurrencyFormat from "react-currency-format";
import { ButtonPrimary } from "../../components/button";
import { useStateValue } from "../../hooks/useStateValue";
import { getBasketTotal } from "../../utils/reducer";
import { useNavigate } from "react-router-dom";
import { PAYMENT_ROUTE } from "../../constant/routesApp";
import PropTypes from "prop-types";
import { Skeleton, useMediaQuery } from "@mui/material";
import { useTranslation } from "react-i18next";
const Subtotal = ({ loading }) => {
  const navigate = useNavigate();
  const [t, i18n] = useTranslation("global");
  const [{ basket }, dispatch] = useStateValue();
  return (
    <div className={styles.subtotal}>
      {!loading ? (
        <>
          <CurrencyFormat
            renderText={(value) => (
              <>
                <p>
                  {t("order.Subtotal")} ({basket?.length ?? 0} {t("order.items")}):
                  <strong> {value}</strong>
                </p>
                <small className={styles.subtotal__gift}>
                  <input type="checkbox" />{" "}
                  <span>{t("order.This order contains a gift")}</span>
                </small>
              </>
            )}
            decimalScale={2}
            value={getBasketTotal(basket)}
            displayType={"text"}
            thousandSeparator={true}
            prefix={"$"}
          />
          <ButtonPrimary
            text={t("order.Proceed to Checkout")}
            onClick={() => navigate(PAYMENT_ROUTE)}
            className={styles.subtotal__button}
          />
        </>
      ) : (
        <SubtotalSkeleton />
      )}
    </div>
  );
};

const SubtotalSkeleton = () => {
  const is1024Screen = useMediaQuery("(max-width: 1024px)");
  const is768Screen = useMediaQuery("(max-width: 768px)");
  const is480Screen = useMediaQuery("(max-width: 480px)");
  return (
    <>
      <Skeleton
        variant="rectangular"
        width={200}
        height={
          is480Screen
            ? "16px"
            : is768Screen
            ? "18px"
            : is1024Screen
            ? "20px"
            : "22px"
        }
      />
      <Skeleton variant="rectangular" width={200} height={16} />
      <Skeleton
        variant="rounded"
        width={
          is480Screen ? "100%" : is768Screen ? 241 : is1024Screen ? 500 : 258
        }
        height={is1024Screen ? 36 : 28}
        sx={{ margin: is1024Screen ? "0 auto" : "", marginTop: "10px" }}
      />
    </>
  );
};
Subtotal.propTypes = {
  loading: PropTypes.bool,
};

export default Subtotal;
