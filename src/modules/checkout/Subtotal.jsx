import React from "react";
import styles from "../../styles/Subtotal.module.css";
import CurrencyFormat from "react-currency-format";
import { ButtonPrimary } from "../../components/button";
import { useStateValue } from "../../hooks/useStateValue";
import { getBasketTotal } from "../../utils/reducer";
import { useNavigate } from "react-router-dom";
const Subtotal = () => {
  const navigate = useNavigate();
  const [{ basket }, dispatch] = useStateValue();
  return (
    <div className={styles.subtotal}>
      <CurrencyFormat
        renderText={(value) => (
          <>
            <p>
              Subtotal ({basket?.length ?? 0} items):
              <strong> {value}</strong>
            </p>
            <small className={styles.subtotal__gift}>
              <input type="checkbox" /> This order contains a gift
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
        onClick={() => navigate("/payment")}
      />
    </div>
  );
};

export default Subtotal;
