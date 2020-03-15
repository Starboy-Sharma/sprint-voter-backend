import mockingoose from "mockingoose";

import ItemModel from "../models/item";
import itemService from "./item";

beforeEach(() => {
  mockingoose.resetAll();
});

describe("findAll", () => {
  it("returns all documents from ItemModel", async () => {
    const data = [{ name: "First item" }, { name: "Second item" }];
    mockingoose(ItemModel).toReturn(data, "find");
    const result = await itemService.findAll();
    expect(result).toMatchObject(data);
  });
});
