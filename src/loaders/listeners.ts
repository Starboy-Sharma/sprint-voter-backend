import * as fs from "fs";
import * as path from "path";

import logger from "../logger";

function readdir(path: fs.PathLike): Promise<string[] | Buffer[]> {
  return new Promise((resolve, reject) => {
    fs.readdir(path, (err, files) => {
      if (err) return reject(err);
      else resolve(files);
    });
  });
}

// Dynamically import all files under the "/listeners" directory.
// This way we don't have to import each file individually.
export default async function(): Promise<void> {
  const pathToListeners = path.join(__dirname, "../listeners");

  try {
    logger.debug("Loading event listeners...");
    const files = await readdir(pathToListeners);
    for (const file of files) {
      if (file.constructor.name === "String") {
        const fileName = file as string;
        import(`../listeners/${fileName}`);
      }
    }
    logger.debug("Finished loading event listeners.");
  } catch (error) {
    logger.error("Problem loading event listeners: ", error);
    process.exit(1);
  }
}
