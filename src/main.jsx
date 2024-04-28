import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./styles/index.css";
import reducer, { initialState } from "./utils/reducer.js";
import { StateProvider } from "./utils/StateProvider.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import global_en from "./translations/en/global.json";
import global_vi from "./translations/vi/global.json";
import i18next from "i18next";
import { I18nextProvider } from "react-i18next";

i18next.init({
  interpolation: { escapeValue: false },
  lng: "en",
  resources: {
    en: {
      global: global_en,
    },
    vi: {
      global: global_vi,
    },
  },
});
ReactDOM.createRoot(document.getElementById("root")).render(
  <StateProvider initialState={initialState} reducer={reducer}>
    <I18nextProvider i18n={i18next}>
      <App />
    </I18nextProvider>
    <ToastContainer />
  </StateProvider>
);
