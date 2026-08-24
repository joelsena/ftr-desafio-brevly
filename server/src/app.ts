import Fastify from "fastify";
import {
  validatorCompiler,
  serializerCompiler,
} from "@fastify/type-provider-zod";

import { linkRoutes } from "./routes/links.ts";

export function buildApp() {
  const app = Fastify({
    logger: true,
  });

  app.register(linkRoutes, {
    prefix: "/links",
  });

  app.setValidatorCompiler(validatorCompiler);
  app.setSerializerCompiler(serializerCompiler);

  return app;
}
