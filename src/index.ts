import app from "./app";
import config from "./config";

import loadMongoose from "./loaders/mongoose";
import loadListeners from "./loaders/listeners";

async function start(): Promise<void> {
  await loadMongoose();
  await loadListeners();

  app.listen(config.app.port, () => {
    console.log(`App running on port ${config.app.port}`);
  });
}

start();
