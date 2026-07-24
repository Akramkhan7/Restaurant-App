import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom/cjs/react-router-dom.min.js";
import { Provider } from "react-redux";
import 'react-toastify/dist/ReactToastify.css';
import store from "./store/store.js";
import { ToastContainer } from "react-toastify";


createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
     <ToastContainer position="top-right" autoClose={2000} theme="colored" />
  </Provider>,
);
