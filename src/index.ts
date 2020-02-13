import express from "express";
import mongoose from "mongoose";
import config from "./config";
import ItemModel, { Item } from "./models/item";

mongoose.connect(config.database.connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}); // TODO: handle mongoose error

const app = express();
app.disable("x-powered-by");

app.get("/status", (req, res) => {
  res.status(200).end();
});

app.get("/items", async (req, res) => {
  const items: Item[] = await ItemModel.find();
  res.status(200).json(items);
});

app.listen(config.app.port, () => {
  console.log(`App running on port ${config.app.port}`);
});
