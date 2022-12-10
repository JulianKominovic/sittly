import { Stats } from "original-fs";

export type File = {
  name: string;
  extension: string;
  path: string;
  content?: Buffer;
  info?: Stats;
};
