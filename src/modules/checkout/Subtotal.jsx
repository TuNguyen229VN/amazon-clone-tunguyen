import React from "react";
import styles from "./styles/Subtotal.module.css";
import CurrencyFormat from "react-currency-format";
import { ButtonPrimary } from "../../components/button";
import { useStateValue } from "../../hooks/useStateValue";
import { getBasketTotal } from "../../utils/reducer";
import { useNavigate } from "react-router-dom";
import { PAYMENT_ROUTE } from "../../constant/routesApp";
import PropTypes from "prop-types";
import { Skeleton } from "@mui/material";
const Subtotal = ({ loading }) => {
  const navigate = useNavigate();
  const [{ basket }, dispatch] = useStateValue();
  return (
    <div className={styles.subtotal}>
      {!loading ? (
        <>
          <CurrencyFormat
            renderText={(value) => (
              <>
                <p>
                  Subtotal ({basket?.length ?? 0} items):
                  <strong> {value}</strong>
                </p>
                <small className={styles.subtotal__gift}>
                  <input type="checkbox" />{" "}
                  <span>This order contains a gift</span>
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
            text="Proceed to Checkout"
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
  return (
    <>
      <Skeleton variant="rectangular" width={200} height={21} />
      <Skeleton variant="rectangular" width={200} height={16} />
      <Skeleton variant="rounded" width={258} height={28} sx={{marginTop:"10px"}} />
    </>
  );
};
Subtotal.propTypes = {
  loading: PropTypes.bool,
};

export default Subtotal;
