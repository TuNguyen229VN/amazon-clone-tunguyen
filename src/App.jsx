import React, { Suspense, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { auth } from "./firebase/firebase-config";
import { useStateValue } from "./hooks/useStateValue";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import {
  CHECKOUT_ROUTE,
  ERROR_ROUTE,
  HOME_ROUTE,
  LOGIN_ROUTE,
  ORDER_ROUTE,
  PAYMENT_ROUTE,
  PRODUCT_DETAIL_ROUTE,
  PRODUCT_ROUTE,
} from "./constant/routesApp";
import { getUserProfile } from "./utils/getUserProfile";
const HomePage = React.lazy(() => import("./pages/HomePage"));
const CheckoutPage = React.lazy(() => import("./pages/CheckoutPage"));
const LoginPage = React.lazy(() => import("./pages/LoginPage"));
const PaymentPage = React.lazy(() => import("./pages/PaymentPage"));
const OrderPage = React.lazy(() => import("./pages/OrderPage"));
const ProductPage = React.lazy(() => import("./pages/ProductPage"));
const ErrorPage = React.lazy(() => import("./pages/ErrorPage"));
const ProductDetailPage = React.lazy(() => import("./pages/ProductDetailPage"));
import { Layout } from "./layouts";
const { VITE_SECRET_KEY } = import.meta.env;
const promisze = loadStripe(VITE_SECRET_KEY);

function App() {
  const [{ user }, dispatch] = useStateValue();
  useEffect(() => {
    onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        dispatch({
          type: "SET_USER",
          user: authUser,
        });
        getUserProfile(authUser, dispatch);
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
      <Suspense>
        <Routes>
          <Route path={ERROR_ROUTE} element={<ErrorPage />}></Route>
          <Route
            path={LOGIN_ROUTE}
            element={user?.auth ? <Navigate to={HOME_ROUTE} /> : <LoginPage />}
          ></Route>
          <Route element={<Layout />}>
            <Route path={HOME_ROUTE} element={<HomePage />}></Route>
            <Route path={CHECKOUT_ROUTE} element={<CheckoutPage />}></Route>
            <Route
              path={`${PRODUCT_ROUTE}/:slug?`}
              element={<ProductPage />}
            ></Route>
            <Route
              path={`${PRODUCT_DETAIL_ROUTE}/:slug`}
              element={<ProductDetailPage />}
            ></Route>
            <Route
              path={PAYMENT_ROUTE}
              element={
                user?.auth ? (
                  <Elements stripe={promisze}>
                    <PaymentPage />
                  </Elements>
                ) : (
                  <Navigate to={LOGIN_ROUTE} />
                )
              }
            ></Route>
            <Route
              path={ORDER_ROUTE}
              element={
                user?.auth ? <OrderPage /> : <Navigate to={LOGIN_ROUTE} />
              }
            ></Route>
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
