import * as path from "path";
import faker from "faker";
import { Seeder } from "mongo-seeding";

import config from "../src/config";

// Seed the faker before running seeders to get persistent results.
faker.seed(123);

const pathToData = path.resolve("./seeds/data");

const seederConfig = {
  database: config.database.connectionString,
  dropDatabase: true
};

const collectionReadingOptions = {
  extensions: ["ts"],
  transformers: [Seeder.Transformers.replaceDocumentIdWithUnderscoreId]
};

async function seed(): Promise<void> {
  console.log("Seeding database...");

  const seeder = new Seeder(seederConfig);
  const collections = seeder.readCollectionsFromPath(
    pathToData,
    collectionReadingOptions
  );

  try {
    await seeder.import(collections);
  } catch (err) {
    console.error("Problem seeding database");
    console.error(err);
    process.exit(1);
  }

  console.log("Finished seeding database.");
}

seed();
