const fs = require("fs/promises");
const path = require("path");

async function walk(dir = "/home/julian", maxDepth = 0, currentDepth = 0) {
  let files = await fs.readdir(dir);
  files = await Promise.all(
    files.map(async (file) => {
      const filePath = path.join(dir, file);
      const stats = await fs.stat(filePath).catch(() => null);
      if (currentDepth >= maxDepth)
        return {
          path: filePath,
          extension: path.extname(filePath),
          name: path.basename(filePath).replace(path.extname(filePath), ""),
        };
      if (stats?.isDirectory())
        return walk(filePath, maxDepth, currentDepth + 1);
      else if (stats?.isFile())
        return {
          path: filePath,
          extension: path.extname(filePath),
          name: path.basename(filePath).replace(path.extname(filePath), ""),
        };
    })
  );

  return files.reduce((all, folderContents) => all.concat(folderContents), []);
}

walk().then((files) => {
  console.log(files);
});
