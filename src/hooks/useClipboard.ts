import { clipboard } from "electron";
import useAsync from "./useAsync";

const useClipboard = () => {
  const { doAsyncOperation } = useAsync();
  return {
    write: (text: string) => clipboard.writeText(text),
    read: () => clipboard.readText(),
  };
};

export default useClipboard;
