import React, { useEffect, useLayoutEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { KEYS } from "./lib/keys";
import {
  findLeftTabStop,
  findNextTabStop,
  findPrevTabStop,
  findRightTabStop,
} from "./navegation";
import { useHelper } from "./store/helperStore";
import { useShowingModal } from "./store/modalPopup";
import { useQuerybarStore } from "./store/querybarStore";
import { AsyncStatusEnum, useStatusStore } from "./store/statusbarStore";
const { ipcRenderer } = require("electron");

const KeyboardHandlerComponent = () => {
  const navigation = useNavigate();
  const location = useLocation();
  const setHelperOpen = useHelper((state) => state.setHelperOpen);
  const setHelperOptions = useHelper((state) => state.setOptions);
  const showingModal = useShowingModal((state) => state.showingModal);
  const setShowingModal = useShowingModal((state) => state.setShowingModal);
  const setQuerybarValue = useQuerybarStore((state) => state.setValue);

  const asyncStatus = useStatusStore((state) => state.asyncStatus);

  useEffect(() => {
    navigation("/");
    ipcRenderer.on("location-change", (event, route) => {
      navigation(route);
    });
  }, []);

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
        e.code !== "Escape" &&
        !e.ctrlKey &&
        !e.altKey
      ) {
        (document.querySelector("#query-bar") as HTMLElement)?.focus();
        return;
      }
      if (
        e.key === "Enter" &&
        (document.activeElement as HTMLElement).id === "query-bar"
      ) {
        (
          findNextTabStop(document.activeElement as HTMLElement) as HTMLElement
        )?.click();
        (document.querySelector("#query-bar") as HTMLElement)?.focus();
        return;
      }
    };
    window.addEventListener("keydown", handleQueryBarEnter);
    return () => {
      window.removeEventListener("keydown", handleQueryBarEnter);
    };
  }, [document.activeElement]);

  useEffect(() => {
    const handleArrowPress = (
      elementFound: Element | null,
      e: KeyboardEvent
    ) => {
      e.preventDefault();
      if (elementFound) {
        (elementFound as HTMLElement).focus();
        elementFound.scrollIntoView({ block: "center" });
        return;
      }
    };

    const handler = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowUp":
          handleArrowPress(
            findPrevTabStop(document.activeElement as HTMLElement),
            e
          );
          break;
        case "ArrowDown":
          handleArrowPress(
            findNextTabStop(document.activeElement as HTMLElement),
            e
          );
          break;
        case "ArrowRight":
          if (document.activeElement?.nodeName === "INPUT") return;
          handleArrowPress(
            findRightTabStop(document.activeElement as HTMLElement),
            e
          );
          break;
        case "ArrowLeft":
          if (document.activeElement?.nodeName === "INPUT") return;

          handleArrowPress(
            findLeftTabStop(document.activeElement as HTMLElement, navigation),
            e
          );

          break;

        default:
          if (e.ctrlKey && e.code === "KeyO") {
            setHelperOpen(true);
            return;
          }

          break;
      }
    };
    window.addEventListener("keydown", handler);
    return () => {
      window.removeEventListener("keydown", handler);
    };
  }, []);

  useLayoutEffect(() => {
    const handleExit = (e: KeyboardEvent) => {
      if (showingModal) {
        if (e.key === "Escape") {
          e.preventDefault();
          setShowingModal(false);
          return;
        }
      }

      if (e.key === "Escape") {
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
  }, [location.pathname, showingModal]);

  useLayoutEffect(() => {
    const querybar = document.querySelector("#query-bar") as HTMLElement;
    querybar.focus();
    setQuerybarValue("");

    setHelperOptions([]);
  }, [location.pathname]);

  return <div />;
};

export default KeyboardHandlerComponent;
