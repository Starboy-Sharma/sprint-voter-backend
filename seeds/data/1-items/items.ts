import faker from "faker";
import { ItemData } from "../../../src/models/item";

function createItem(): ItemData {
  return {
    name: faker.random.words()
  };
}

const data = [];
const amount = 5;

for (let i = 0; i < amount; i++) {
  data.push(createItem());
}

export = data;
