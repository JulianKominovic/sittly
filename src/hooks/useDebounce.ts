import React, { useState } from "react";

export const useDebounce = (debounceMs = 1000) => {
  const [promise, setPromise] = useState<AbortController>();

  const debounce = async (callback: () => void) => {
    promise?.abort();
    const controller = new AbortController();
    setPromise(controller);
    try {
      await new Promise((resolve, reject) => {
        const rejectCb = () => {
          reject("ABORTED");
        };
        controller.signal.addEventListener("abort", rejectCb);
        const id = setTimeout(() => {
          resolve(0);
          clearTimeout(id);
          controller.signal.removeEventListener("abort", rejectCb);
        }, debounceMs);
      });
      callback();
    } catch (err) {}
  };
  const cancelOngoingDebounce = () => promise?.abort();
  return {
    debounce,
    cancelOngoingDebounce,
  };
};
