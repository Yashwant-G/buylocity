import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ModeContextProvider } from "./context/context";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ModeContextProvider>
    <App />
  </ModeContextProvider>
);

