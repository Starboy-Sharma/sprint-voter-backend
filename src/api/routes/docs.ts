import { Router } from "express";

// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import redoc from "redoc-express";
import createSpecFromJSDoc from "swagger-jsdoc";

import options from "../../config/openapi.json";

const router = Router();

const spec = createSpecFromJSDoc(options);
const title = options.definition.info.title;

router.get("/spec.json", (_, res) => res.json(spec));
router.get("/", redoc({ title, specUrl: "docs/spec.json" }));

export default router;
