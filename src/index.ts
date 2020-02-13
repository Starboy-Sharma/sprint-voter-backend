import express from "express";
import mongoose from "mongoose";
import config from "./config";

mongoose.connect(config.database.connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}); // TODO: handle mongoose error

const app = express();
app.disable("x-powered-by");

app.get("/status", (req, res) => {
  res.status(200).end();
});

app.listen(config.app.port, () => {
  console.log(`App running on port ${config.app.port}`);
});
