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
 * @swagger
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

export default app;
