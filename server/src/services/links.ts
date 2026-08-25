import { Upload } from "@aws-sdk/lib-storage";
import { eq, sql } from "drizzle-orm";

import { r2Client } from "../storage/r2.ts";
import { links } from "../db/schema.ts";
import { db } from "../db/index.ts";
import { env } from "../env.ts";

export function createLink(originalUrl: string, shortUrl: string) {
  return db.insert(links).values({ originalUrl, shortUrl }).returning();
}

export function getLinks() {
  return db.select().from(links);
}

export async function getLinkAndIncrement(shortUrl: string) {
  const [link] = await db
    .select({ id: links.id })
    .from(links)
    .where(eq(links.shortUrl, shortUrl));

  if (!link) throw new Error("Url não encontrado!");

  // Incremento em nível de banco para ter atomicidade
  return db
    .update(links)
    .set({ accessCount: sql`${links.accessCount} + 1` })
    .where(eq(links.id, link.id))
    .returning({ originalUrl: links.originalUrl });
}

export function deleteLink(id: string) {
  return db.delete(links).where(eq(links.id, id));
}

export async function exportLinks() {
  const dbLinks = await db.select().from(links);

  const data = [
    ["URL original", "URL encurtada", "Contagem de acessos", "Data de criação"],
    ...dbLinks.map((link) => [
      link.originalUrl,
      link.shortUrl,
      link.accessCount.toString(),
      link.createdAt.toString(),
    ]),
  ];

  const csvContent = data.map((r) => r.join(",")).join("\n");
  const key = `links-${crypto.randomUUID()}.csv`;

  const upload = new Upload({
    client: r2Client,
    params: {
      Key: key,
      Bucket: env.CLOUDFLARE_BUCKET,
      Body: csvContent,
      ContentType: "text/csv",
    },
  });

  await upload.done();

  return new URL(key, env.CLOUDFLARE_PUBLIC_URL);
}
