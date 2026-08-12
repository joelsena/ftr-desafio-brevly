import {
  pgTable,
  integer,
  varchar,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

export const links = pgTable("links", {
  id: uuid().primaryKey(),
  originalUrl: text().notNull(),
  shortUrl: varchar({ length: 255 }).notNull().unique(),
  accessCount: integer().notNull().default(0),
  createdAt: timestamp().notNull().defaultNow(),
});
