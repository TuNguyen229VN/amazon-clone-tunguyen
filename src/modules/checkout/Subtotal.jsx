import React from "react";
import "../../styles/Subtotal.css";
import CurrencyFormat from "react-currency-format";
import { ButtonPrimary } from "../../components/button";
import { useStateValue } from "../../hooks/useStateValue";
import { getBasketTotal } from "../../utils/reducer";
const Subtotal = () => {
  const [{ basket }, dispatch] = useStateValue();
  return (
    <div className="subtotal">
      <CurrencyFormat
        renderText={(value) => (
          <>
            <p>
              Subtotal ({basket?.length ?? 0} items):
              <strong> {value}</strong>
            </p>
            <small className="subtotal__gift">
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

      <ButtonPrimary text="Proceed to Checkout" />
    </div>
  );
};

export default Subtotal;
