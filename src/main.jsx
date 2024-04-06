import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

// Redux
import { store } from "./features/store.js";
import {Provider} from "react-redux";

// Toast
import "react-toastify/dist/ReactToastify.css";
import {ToastContainer} from "react-toastify"

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
    <ToastContainer position="top-center" autoClose={1000}/>
  </Provider>
);
