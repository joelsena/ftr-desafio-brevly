import { eq } from "drizzle-orm";

import { links } from "../db/schema.ts";
import { db } from "../db/index.ts";

export function createLink(originalUrl: string, shortUrl: string) {
  return db.insert(links).values({ originalUrl, shortUrl }).returning();
}

export function getLinks() {
  return db.select().from(links);
}

export async function getLink(shortUrl: string) {
  const [link] = await db
    .select()
    .from(links)
    .where(eq(links.shortUrl, shortUrl));

  if (link) {
    const accessCount = link.accessCount;

    return db
      .update(links)
      .set({ accessCount: accessCount + 1 })
      .where(eq(links.id, link.id))
      .returning();
  }

  return [];
}

export function deleteLink(id: string) {
  return db.delete(links).where(eq(links.id, id));
}
