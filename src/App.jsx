import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CheckoutPage from "./pages/CheckoutPage";
import LoginPage from "./pages/LoginPage";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/firebase-config";
import { useStateValue } from "./hooks/useStateValue";
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
