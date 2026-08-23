import type { FastifyPluginAsync } from "fastify";

export const linkRoutes: FastifyPluginAsync = async (app) => {
  app.get("/", async () => {});
  app.post("/", async () => {});
  app.delete("/:id", async () => {});
};
