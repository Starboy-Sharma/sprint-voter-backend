import app from "./app";
import config from "./config";
import logger from "./logger";

import loadMongoose from "./loaders/mongoose";
import loadListeners from "./loaders/listeners";

async function start(): Promise<void> {
  await loadMongoose();
  await loadListeners();

  app.listen(config.app.port, () => {
    logger.info(`App running on port "${config.app.port}".`);
  });
}

start();
