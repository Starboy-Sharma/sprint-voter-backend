import express from "express";
import mongoose from "mongoose";
import config from "./config";
import ItemModel, { Item } from "./models/item";

import docsRouter from "./api/routes/docs";

mongoose.connect(config.database.connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}); // TODO: handle mongoose error

const app = express();
app.disable("x-powered-by");
if (config.app.env === "development") {
  app.use("/docs", docsRouter);
}

/**
 * @swagger
 *
 * /status:
 *  get:
 *    description: Returns 200 if the server is live.
 *    responses:
 *      200:
 *        description: OK
 */
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
