import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

require("dotenv").config();

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  // eslint-disable-next-line no-undef
  document.getElementById("root")
);
