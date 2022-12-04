import { ipcRenderer } from "electron";

const useExecCommand = () => {
  return {
    executeCommand: (cmd: string) => ipcRenderer.send("run-command", cmd),
  };
};

export default useExecCommand;
