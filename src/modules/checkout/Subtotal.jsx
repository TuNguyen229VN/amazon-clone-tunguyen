import React from "react";
import "../../styles/Subtotal.css";
import CurrencyFormat from "react-currency-format";
import {ButtonPrimary} from "../../components/button"
const Subtotal = () => {
  return (
    <div className="subtotal">
      <CurrencyFormat
        renderText={(value) => (
          <>
            <p>
              Subtotal (0 items):
              <strong>{` 0`}</strong>
            </p>
            <small className="subtotal__gift">
              <input type="checkbox" /> This order contains a gift
            </small>
          </>
        )}
        decimalScale={2}
        value={0}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"$"}
      />

      <ButtonPrimary text="Proceed to Checkout"/>
    </div>
  );
};

export default Subtotal;
