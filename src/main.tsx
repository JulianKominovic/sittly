import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

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
  <BrowserRouter>
    {globalStyles()}
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);
