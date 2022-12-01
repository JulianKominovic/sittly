import "./index.css";
import React, { useEffect, useState } from "react";

import Router from "./modules/router";
import {
  createTheme,
  getDocumentTheme,
  NextUIProvider,
} from "@nextui-org/react";

const darkTheme = createTheme({
  theme: "dark",
  type: "dark",
});
const lightTheme = createTheme({
  theme: "light",
  type: "light",
});

function App() {
  const [theme, setTheme] = useState<"dark" | "light">(
    () => (window.localStorage.getItem("theme") as "dark") || "dark"
  );
  useEffect(() => {
    const observer = new MutationObserver(() => {
      console.log("RUN");
      let newTheme = getDocumentTheme(document?.documentElement);
      if (newTheme === "dark" || newTheme === "light") {
        setTheme(newTheme as "dark");
        window.localStorage.setItem("theme", newTheme);
      }
    });

    // Observe the document theme changes
    observer.observe(document?.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme", "style"],
    });

    return () => observer.disconnect();
  }, []);
  return (
    <NextUIProvider theme={theme === "dark" ? darkTheme : lightTheme}>
      <Router />
    </NextUIProvider>
  );
}

export default App;
