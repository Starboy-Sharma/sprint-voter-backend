import express, { Request, Response, NextFunction } from "express";
import morgan from "morgan";
import { ValidationError } from "express-validation";

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

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof ValidationError) {
    return res.status(err.statusCode).json(err);
  } else {
    return res.status(500).json(err);
  }
});

export default app;
