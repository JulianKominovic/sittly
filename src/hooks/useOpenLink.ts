import { shell } from "electron";

const useOpenLink = () => {
  return {
    openLink: (link: string) => shell.openExternal(link),
  };
};

export default useOpenLink;
