import mongoose from "mongoose";
import { Db } from "mongodb";

import config from "../config";

export default async function(): Promise<Db> {
  const { connection } = await mongoose.connect(
    config.database.connectionString,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  ); // TODO: handle mongoose error
  return connection.db;
}
