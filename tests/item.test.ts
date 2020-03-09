import request from "supertest";
import { OK } from "http-status-codes";

import useTestDatabase from "./util/useTestDatabase";

import app from "../src/app";
import ItemModel from "../src/models/item";

useTestDatabase();

describe("GET /items", () => {
  it("retrieves items from the database", async () => {
    const itemDoc = { name: "Test foo bar" };
    ItemModel.create(itemDoc);
    const response = await request(app).get("/items");
    expect(response.status).toBe(OK);
    expect(response.body).toContainEqual(expect.objectContaining(itemDoc));
  });
  it("returns an empty list when no items exist", async () => {
    const response = await request(app).get("/items");
    expect(response.status).toBe(OK);
    expect(response.body).toEqual(expect.any(Array));
    expect(response.body).toHaveLength(0);
  });
});
