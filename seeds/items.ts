import { SeederCollection } from "mongo-seeding/dist/common";
import ItemModel from "../src/models/item";

const itemCollection: SeederCollection = {
  name: ItemModel.collection.collectionName,
  documents: [
    {
      name: "My Second Seeded Item"
    }
  ]
};

export default itemCollection;
