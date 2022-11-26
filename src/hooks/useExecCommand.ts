import { ipcRenderer } from "electron";
import { useState } from "react";
import useAsync from "./useAsync";

const useExecCommand = () => {
  return {
    executeCommand: (cmd: string) => ipcRenderer.send("run-command", cmd),
  };
};

export default useExecCommand;
