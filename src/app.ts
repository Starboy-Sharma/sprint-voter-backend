import express from "express";
import config from "./config";

import docsRouter from "./api/routes/docs";
import itemsRouter from "./api/routes/items";

const app = express();
app.disable("x-powered-by");

app.use("/items", itemsRouter);

if (config.app.env === "development") {
  app.use("/docs", docsRouter);
}

/**
export default app;
