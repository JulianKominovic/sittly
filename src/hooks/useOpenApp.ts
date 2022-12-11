import React from "react";
import useExecCommand from "./useExecCommand";

const useOpenApp = () => {
  const { executeCommand } = useExecCommand();
  return {
    openFile: (path: string) => {
      executeCommand(`xdg-open ${path}`);
    },
  };
};

export default useOpenApp;
