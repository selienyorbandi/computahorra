import React from "react";
import ReactDOM from "react-dom";
import "index.css";
import App from "./App";
import getFirestoreApp from "./firebase/config.js";

getFirestoreApp();

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

