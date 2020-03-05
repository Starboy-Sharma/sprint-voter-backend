import app from "./app";
import config from "./config";

import mongooseLoader from "./loaders/mongoose";

async function start(): Promise<void> {
  await mongooseLoader();

  app.listen(config.app.port, () => {
    console.log(`App running on port ${config.app.port}`);
  });
}

start();
