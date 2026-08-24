import { eq } from "drizzle-orm";

import { links } from "../db/schema.ts";
import { db } from "../db/index.ts";

export function createLink(originalUrl: string, shortUrl: string) {
  return db.insert(links).values({ originalUrl, shortUrl }).returning();
}

export function getLinks() {
  return db.select().from(links);
}

export function getLink(shortUrl: string) {
  return db.select().from(links).where(eq(links.shortUrl, shortUrl));
}

export function deleteLink(id: string) {
  return db.delete(links).where(eq(links.id, id));
}
