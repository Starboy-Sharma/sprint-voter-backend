import express from "express";
import morgan from "morgan";

import config from "./config";
import { stream } from "./logger";

import docsRouter from "./api/routes/docs";
import itemsRouter from "./api/routes/items";

const app = express();
app.disable("x-powered-by");

app.use(morgan(config.app.debug ? "dev" : "combined", { stream }));
app.use(express.json());

app.use("/items", itemsRouter);

if (config.app.env === "development") {
  app.use("/docs", docsRouter);
}

export default app;
