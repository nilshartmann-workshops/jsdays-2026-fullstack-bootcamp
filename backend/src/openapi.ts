import {
  OpenAPIRegistry,
  OpenApiGeneratorV3,
} from "@asteasolutions/zod-to-openapi";
import swaggerUi from "swagger-ui-express";
import { Router } from "express";

export const registry = new OpenAPIRegistry();

export function generateOpenApiDocument() {
  const generator = new OpenApiGeneratorV3(registry.definitions);

  return generator.generateDocument({
    openapi: "3.0.0",
    info: {
      title: "Books API",
      version: "1.0.0",
    },
  });
}

export function createSwaggerRouter() {
  const router = Router();
  const document = generateOpenApiDocument();

  router.use("/", swaggerUi.serve);
  router.get("/", swaggerUi.setup(document));

  return router;
}
