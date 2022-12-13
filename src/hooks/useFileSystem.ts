import { ipcRenderer } from "electron";
import React, { useState } from "react";
import useAsync from "./useAsync";
import { File, FileWithContent } from "../../electron/types/file";
import CancelablePromise, { cancelable } from "cancelable-promise";
import useLoading from "./useLoading";

const useFileSystem = () => {
  const { doShortAsyncCancelableOperation, doShortAsyncOperation } =
    useLoading();

  const [controller, setController] = useState(new AbortController());

  const getHomedir = async () => {
    const promise = doShortAsyncOperation<string>(
      "Buscando el directorio home",
      new Promise((resolve, reject) => {
        ipcRenderer.send("get-home-dir");
        ipcRenderer.once("get-home-dir", (evt, response) => {
          resolve(response.data);
        });
      })
    );
    return (await promise).data;
  };

  const getFileInfo = (path: string) => {
    controller.abort();
    const control = new AbortController();
    const promise = doShortAsyncCancelableOperation<FileWithContent>(
      "Trayendo el contenido del archivo",
      new Promise((resolve, reject) => {
        const handler = (evt, response) => {
          console.log(response);
          response.status === "OK"
            ? resolve(response.data)
            : reject(response.data);
        };
        ipcRenderer.send("read-file", path);
        ipcRenderer.once("read-file", handler);
      }),
      control.signal,
      () => {
        ipcRenderer.removeAllListeners("read-file");
      }
    );
    setController(control);
    return promise;
  };

  const getDirectoryFiles = (path: string) => {
    controller.abort();
    const control = new AbortController();
    const promise = doShortAsyncCancelableOperation<File[]>(
      "Trayendo el contenido del directorio",
      new Promise((resolve, reject) => {
        ipcRenderer.send("read-dir", path);
        ipcRenderer.once("read-dir", (evt, response) => {
          if (control.signal.aborted) {
            evt.preventDefault();
            return;
          }
          response.status === "OK"
            ? resolve(response.data)
            : reject(response.data);
        });
      }),
      control.signal
    );
    setController(control);

    return promise;
  };
  const findFile = (filename: string) => {
    controller.abort();
    const control = new AbortController();

    const promise = doShortAsyncCancelableOperation<File[]>(
      "Buscando el archivo",
      new Promise((resolve, reject) => {
        ipcRenderer.send("find-file", filename);
        ipcRenderer.once("find-file", (evt, response) => {
          if (control.signal.aborted) {
            console.log("ABORTTTTTED");
            evt.preventDefault();
            return;
          }
          response.status === "OK"
            ? resolve(response.data)
            : reject(response.data);
        });
      }),
      control.signal
    );

    setController(control);
    return promise;
  };

  return {
    getFileInfo,
    getDirectoryFiles,
    findFile,
    getHomedir,
  };
};

export default useFileSystem;
