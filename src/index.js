import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

window.onload = function () {
  var links = document.getElementsByTagName("a");
  for (var i = 0; i < links.length; i++) {
    links[i].setAttribute("target", "_blank");
  }
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

