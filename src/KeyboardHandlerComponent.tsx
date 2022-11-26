import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { TailwindColors } from "./enum/TailwindColors";
import {
  findLeftTabStop,
  findNextTabStop,
  findPrevTabStop,
  findRightTabStop,
} from "./navegation";
import { useHelper } from "./store/helperStore";
import { AsyncStatusEnum, useStatusStore } from "./store/statusbarStore";
const { ipcRenderer } = require("electron");

const KeyboardHandlerComponent = () => {
  const navigation = useNavigate();
  const location = useLocation();
  const hideHelper = useHelper((state) => state.hideHelper);
  const asyncStatus = useStatusStore((state) => state.asyncStatus);
  useEffect(() => {
    switch (asyncStatus) {
      case AsyncStatusEnum.IN_PROGRESS:
        (document.querySelector("#main") as HTMLElement).classList.replace(
          "idle",
          "loading-warning"
        ) ||
          (document.querySelector("#main") as HTMLElement).classList.add(
            "loading-warning"
          );
        break;
      case AsyncStatusEnum.FAIL:
        (document.querySelector("#main") as HTMLElement).classList.replace(
          "loading-warning",
          "loading-danger"
        );
        break;

      case AsyncStatusEnum.SUCCESS:
        (document.querySelector("#main") as HTMLElement).classList.replace(
          "loading-warning",
          "loading-success"
        );
        break;

      default:
        (document.querySelector("#main") as HTMLElement).classList.replace(
          "loading-danger",
          "idle"
        );
        (document.querySelector("#main") as HTMLElement).classList.replace(
          "loading-success",
          "idle"
        );
        break;
    }
  }, [asyncStatus]);

  useEffect(() => {
    const handleQueryBarEnter = (e: KeyboardEvent) => {
      const tagNodeName = document.activeElement?.nodeName;
      const notArrows =
        e.key !== "ArrowDown" &&
        e.key !== "ArrowUp" &&
        e.key !== "ArrowLeft" &&
        e.key !== "ArrowRight";
      if (
        tagNodeName !== "INPUT" &&
        tagNodeName !== "TEXTAREA" &&
        notArrows &&
        e.key !== "Enter" &&
        e.code !== "Space" &&
        !e.ctrlKey
      ) {
        document.querySelector("#query-bar")?.focus();
      }
      if (e.key === "Enter" && document.activeElement.id === "query-bar") {
        findNextTabStop(document.activeElement)?.click();
        document.querySelector("#query-bar")?.focus();
      }
    };
    window.addEventListener("keydown", handleQueryBarEnter);
    return () => {
      window.removeEventListener("keydown", handleQueryBarEnter);
    };
  }, [document.activeElement]);

  useEffect(() => {
    const handleArrowPress = (
      elementFound: HTMLButtonElement,
      e: KeyboardEvent
    ) => {
      e.preventDefault();

      if (elementFound) {
        elementFound.focus();
        elementFound.scrollIntoView({ block: "center" });
      }
    };

    const handler = (e: KeyboardEvent) => {
      if (!isNaN(e.key) && e.ctrlKey) {
        const navbarItem = document.querySelector(
          `[data-focuseablekeyctrl="${e.key}"]`
        );
        navbarItem?.click();
        navbarItem?.focus();

        return;
      }

      if (e.key === "f" && e.ctrlKey) {
        e.preventDefault();
        document.querySelector("#query-bar")?.focus();
        return;
      }
      switch (e.key) {
        case "ArrowUp":
          handleArrowPress(
            findPrevTabStop(document.activeElement as HTMLButtonElement),
            e
          );
          break;
        case "ArrowDown":
          handleArrowPress(
            findNextTabStop(document.activeElement as HTMLButtonElement),
            e
          );
          break;
        case "ArrowRight":
          if (document.activeElement?.nodeName === "INPUT") return;
          handleArrowPress(
            findRightTabStop(document.activeElement as HTMLButtonElement),
            e
          );
          break;
        case "ArrowLeft":
          if (document.activeElement?.nodeName === "INPUT") return;
          handleArrowPress(
            findLeftTabStop(document.activeElement as HTMLButtonElement),
            e
          );
          break;

        default:
          if (e.ctrlKey || e.key === "Enter") return;
          hideHelper();
          break;
      }
    };
    window.addEventListener("keydown", handler);
    return () => {
      window.removeEventListener("keydown", handler);
    };
  }, []);

  useEffect(() => {
    document.querySelector("#query-bar").focus();
    const handleExit = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        if (location.pathname === "/") return ipcRenderer.send("hide-window");
        return navigation("../", {
          relative: "path",
        });
      }
    };
    window.addEventListener("keydown", handleExit);
    return () => {
      window.removeEventListener("keydown", handleExit);
    };
  }, [location.pathname]);

  return (
    <div
      className={`text-lg text-xl text-2xl text-3xl text-4xl text-5xl text-6xl text-7xl ${Object.keys(
        TailwindColors
      )
        .map((k) => `bg-gradient-to-tr from-${k}-400 to-${k}-600`)
        .join(" ")}`}
    />
  );
};

export default KeyboardHandlerComponent;
