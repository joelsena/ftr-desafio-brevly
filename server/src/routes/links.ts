import type { FastifyPluginAsyncZod } from "@fastify/type-provider-zod";
import * as z from "zod";

import {
  createLink,
  deleteLink,
  getLink,
  getLinks,
} from "../services/links.ts";

export const linkRoutes: FastifyPluginAsyncZod = async (app) => {
  app.get("/", async (_, reply) => {
    const links = await getLinks();

    return reply.status(200).send(links);
  });

  app.get(
    "/:shortUrl",
    { schema: { params: z.object({ shortUrl: z.string() }) } },
    async (request, reply) => {
      const { shortUrl } = request.params;

      const [link] = await getLink(shortUrl);

      if (!link) {
        return reply.status(404).send({ message: "Url não encontrado!" });
      }

      return reply.status(201).send(link);
    },
  );

  app.post(
    "/",
    {
      schema: {
        body: z.object({
          originalUrl: z.url(),
          shortUrl: z
            .string()
            .min(3)
            .max(20)
            .regex(/^[a-zA-Z0-9-_]+$/),
        }),
      },
    },
    async (request, reply) => {
      const { originalUrl, shortUrl } = request.body;

      try {
        const [link] = await createLink(originalUrl, shortUrl);

        return reply.status(201).send(link);
      } catch (error) {
        return reply.status(409).send({ message: "ShortUrl já existe!" });
      }
    },
  );

  app.delete(
    "/:id",
    {
      schema: {
        params: z.object({
          id: z.uuid(),
        }),
      },
    },
    async (request, reply) => {
      const { id } = request.params;

      try {
        await deleteLink(id);

        return reply
          .status(203)
          .send({ message: "Recurso removido com sucesso" });
      } catch (error) {
        return reply
          .status(401)
          .send({ message: "Não foi possível remover o link" });
      }
    },
  );
};
