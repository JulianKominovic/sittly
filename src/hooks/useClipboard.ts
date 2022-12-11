import { clipboard, ipcRenderer, nativeImage } from "electron";

const useClipboard = () => {
  const write = (text: string) => clipboard.writeText(text);
  return {
    write,
    read: () => clipboard.readText(),
    writeImage: (bufferImage: Buffer) => {
      clipboard.writeImage(nativeImage.createFromBuffer(bufferImage));
    },
    writeHTML: (markup: string) => {
      clipboard.writeHTML(markup);
    },
    pasteToCurrentWindow: (
      text?: string,
      typeOfClipboard?: "TEXT" | "IMAGE" | "HTML"
    ) => {
      if (text) write(text);
      if (typeOfClipboard === "IMAGE") {
        ipcRenderer.send("hide-window");
        ipcRenderer.send(
          "run-command-exec",
          "xdotool key --clearmodifiers ctrl+v"
        );
        return;
      }
      ipcRenderer.send("hide-window");
      ipcRenderer.send(
        "run-command-exec",
        "xdotool key --clearmodifiers ctrl+shift+v"
      );
    },
  };
};

export default useClipboard;
