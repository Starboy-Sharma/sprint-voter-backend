import { Router } from "express";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express";

const router = Router();

const options = {
  definition: {
    info: {
      title: "Hello World",
      version: "1.0.0",
      description: "An example API"
    }
  },
  apis: ["src/**/*.ts"]
};

const swaggerSpec = swaggerJSDoc(options);

router.use(swaggerUI.serve);
router.get("/", swaggerUI.setup(swaggerSpec));

export default router;
