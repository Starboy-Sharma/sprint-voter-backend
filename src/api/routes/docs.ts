import { Router } from "express";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express";
import swaggerOptions from "../../config/swagger.json";

const router = Router();

const swaggerSpec = swaggerJSDoc(swaggerOptions);

router.use(swaggerUI.serve);
router.get("/", swaggerUI.setup(swaggerSpec));

export default router;
