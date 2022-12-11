import fs from "fs/promises";
import path from "path";
import { File } from "../../types/file";

export async function walk(
  dir: string,
  maxDepth = 0,
  currentDepth = 0
): Promise<File[]> {
  let files = await fs.readdir(dir);
  files = await Promise.all(
    files.map(async (file): Promise<File> => {
      const filePath = path.join(dir, file);
      const stats = await fs.stat(filePath).catch(() => null);
      if (currentDepth >= maxDepth)
        return {
          path: filePath,
          extension: path.extname(filePath),
          name: path.basename(filePath).replace(path.extname(filePath), ""),
          info: await fs.stat(filePath).catch(() => null),
        };
      if (stats?.isDirectory())
        return walk(filePath, maxDepth, currentDepth + 1);
      else if (stats?.isFile())
        return {
          path: filePath,
          extension: path.extname(filePath),
          name: path.basename(filePath).replace(path.extname(filePath), ""),
          info: await fs.stat(filePath),
        };
    })
  );

  return files.reduce((all, folderContents) => all.concat(folderContents), []);
}
