import type { FastifyPluginAsync } from "fastify";

import { db } from "../db/index.ts";

export const databasePlugin: FastifyPluginAsync = async (app) => {
  app.decorate("db", db);
};
