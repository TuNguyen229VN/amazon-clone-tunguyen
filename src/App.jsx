import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CheckoutPage from "./pages/CheckoutPage";
import LoginPage from "./pages/LoginPage";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/firebase-config";
import { useStateValue } from "./hooks/useStateValue";
// import PaymentPage from "./pages/PaymentPage";
// import { loadStripe } from "@stripe/stripe-js";
// import { Elements } from "@stripe/react-stripe-js";

// const promisze = loadStripe(
//   "pk_test_51P1mNRFhreKVvoIjY4yZECYGXcXLQFZAVmWxT7m5HgFBuDukueTmjkR4t6UHIa632LfKAtq1BjSWB8QcZGxVLxij00uCbRfx5J"
// );

function App() {
  const [{ user }, dispatch] = useStateValue();
  useEffect(() => {
    onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route
          path="/login"
          element={user ? <Navigate to={"/"} /> : <LoginPage />}
        ></Route>
        <Route path="/checkout" element={<CheckoutPage />}></Route>
        {/* <Route
          path="/payment"
          element={
            user ? (
              <Elements stripe={promisze}>
                <PaymentPage />
              </Elements>
            ) : (
              <Navigate to={"/login"} />
            )
          }
        ></Route> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
