import Fastify from "fastify";
import {
  validatorCompiler,
  serializerCompiler,
} from "@fastify/type-provider-zod";
import cors from "@fastify/cors";

import { linkRoutes } from "./routes/links.ts";

export function buildApp() {
  const app = Fastify({
    logger: true,
  });

  app.register(cors, {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
  });

  app.register(linkRoutes, {
    prefix: "/api/links",
  });

  app.setValidatorCompiler(validatorCompiler);
  app.setSerializerCompiler(serializerCompiler);

  return app;
}
