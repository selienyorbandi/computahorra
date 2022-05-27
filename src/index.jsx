import React from "react";
import ReactDOM from "react-dom";
import getFirestoreApp from "./firebase/config.js";

import App from "./App";

import "index.css";

getFirestoreApp();

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
