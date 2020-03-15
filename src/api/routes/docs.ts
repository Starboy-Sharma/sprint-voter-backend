import { Router } from "express";

// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import openApiJSDoc from "openapi-jsdoc";
import redoc from "redoc-express";

import swaggerOptions from "../../config/openapi.json";

const router = Router();

const spec = openApiJSDoc(swaggerOptions);
router.get("/spec.json", (_, res) => res.json(spec));
router.get("/", redoc({ title: spec.info.title, specUrl: "docs/spec.json" }));

export default router;
