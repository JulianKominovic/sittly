import { Stats } from "original-fs";

export type File = {
  name: string;
  extension: string;
  path: string;
  content?: Buffer;
  info?: Stats;
};

export type FileWithContent = File & { utf8: string; base64: string };
