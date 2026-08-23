import Fastify from "fastify";

import { databasePlugin } from "./plugins/database.ts";
import { linkRoutes } from "./routes/links.ts";

export function buildApp() {
  const app = Fastify({
    logger: true,
  });

  app.register(linkRoutes, {
    prefix: "/links",
  });

  app.register(databasePlugin);

  return app;
}
