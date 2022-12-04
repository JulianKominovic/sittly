import { clipboard, ipcRenderer } from "electron";

const useClipboard = () => {
  const write = (text: string) => clipboard.writeText(text);
  return {
    write,
    read: () => clipboard.readText(),
    pasteToCurrentWindow: (text: string) => {
      ipcRenderer.send("hide-window");
      write(text);
      ipcRenderer.send(
        "run-command-exec",
        "xdotool key --clearmodifiers ctrl+v"
      );
    },
  };
};

export default useClipboard;
