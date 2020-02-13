import express from "express";
import config from "./config";

const app = express();
app.disable("x-powered-by");

app.get("/status", (req, res) => {
  res.status(200).end();
});

app.listen(config.app.port, () => {
  console.log(`App running on port ${config.app.port}`);
});
