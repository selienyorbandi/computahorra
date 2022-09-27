import React from "react";
import ReactDOM from "react-dom/client";
import getFirestoreApp from "./firebase/config.js";

import App from "./App";

import "index.css";

getFirestoreApp();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
