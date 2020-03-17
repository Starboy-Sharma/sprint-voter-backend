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
  data.push(createItem());
}

export = data;
