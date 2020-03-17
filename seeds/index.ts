import { Seeder } from "mongo-seeding";
import { SeederCollection } from "mongo-seeding/dist/common";

import config from "../src/config";

import itemCollection from "./items";

const seederConfig = {
  database: config.database.connectionString,
  dropDatabase: true
};

const seeder = new Seeder(seederConfig);

const collections: SeederCollection[] = [itemCollection];

async function seed(): Promise<void> {
  try {
    await seeder.import(collections);
  } catch (err) {
    console.error(err);
  }
}

seed();
