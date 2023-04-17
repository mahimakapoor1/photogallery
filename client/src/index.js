import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Enter from "./Enter";
import { BrowserRouter } from "react-router-dom";
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Enter />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
