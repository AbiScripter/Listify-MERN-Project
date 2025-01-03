import React from "react";
import ReactDOM from "react-dom/client";
import { ToastContainer } from "react-toastify";

import "./index.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <ToastContainer autoClose={2000} />
    <App />
  </>
);
