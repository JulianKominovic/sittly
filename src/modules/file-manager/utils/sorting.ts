import { File, FileWithContent } from "../../../../electron/types/file";

export const SortByDate = (files: FileWithContent[]) => {
  return files.sort((a, b) => {
    if (!a.info?.mtimeMs || !b.info?.mtimeMs) return 0;
    return b.info.mtime - a.info.mtimeMs;
  });
};
