import mongoose from "mongoose";
import { Db } from "mongodb";

import config from "../config";
import logger from "../logger";

export default async function(): Promise<Db> {
  logger.debug(
    `Connecting Mongoose to "${config.database.shortConnectionString}"...`
  );

  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
  };

  try {
    const { connection } = await mongoose.connect(
      config.database.connectionString,
      options
    );
    logger.debug("Mongoose connected.");
    return connection.db;
  } catch (error) {
    logger.error("Mongoose failed to connect: ", error);
    process.exit(1);
  }
}
