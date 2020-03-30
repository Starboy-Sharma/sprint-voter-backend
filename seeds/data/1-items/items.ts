import faker from "faker";
import { ItemData } from "../../../src/models/item";

function createItem(): ItemData {
  return {
    name: faker.random.word()
  };
}

const data = [];
const amount = 10;

for (let i = 0; i < amount; i++) {
  const item = {
    ...createItem(),
    createdAt: new Date(),
    updatedAt: new Date()
  };
  data.push(item);
}

export = data;
