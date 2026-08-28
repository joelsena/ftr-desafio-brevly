import type { FastifyPluginAsyncZod } from "@fastify/type-provider-zod";
import * as z from "zod";

import {
  createLink,
  deleteLink,
  exportLinks,
  getLinkAndIncrement,
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

      try {
        const [link] = await getLinkAndIncrement(shortUrl);

        return reply.status(201).send(link);
      } catch (error) {
        return reply.status(404).send({ message: "Url não encontrado!" });
      }
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
        console.error(error);
        return reply
          .status(401)
          .send({ message: "Não foi possível remover o link" });
      }
    },
  );

  app.post("/export", async (_, reply) => {
    try {
      const csvPublicUrl = await exportLinks();

      return reply.status(200).send({ publicUrl: csvPublicUrl });
    } catch (error) {
      console.error(error);
      return reply
        .status(400)
        .send({ message: "Não foi possível exportar arquivo" });
    }
  });
};
