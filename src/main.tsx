import React from "react";
import ReactDOM from "react-dom";
import "animate.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { NextUIProvider } from "@nextui-org/react";

import { globalCss } from "@nextui-org/react";

const globalStyles = globalCss({
  button: {
    border: "none",
  },
  "*::-webkit-scrollbar": {
    width: 10,
  },

  "*::-webkit-scrollbar-track": {
    background: "transparent",
  },

  "*::-webkit-scrollbar-thumb": {
    backgroundColor: "$accents5",
    borderRadius: 10,
  },
});
ReactDOM.render(
  <NextUIProvider>
    <BrowserRouter>
      {globalStyles()}
      <App />
    </BrowserRouter>
  </NextUIProvider>,

  document.getElementById("root")
);
