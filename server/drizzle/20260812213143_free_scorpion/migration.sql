CREATE TABLE "links" (
	"id" uuid PRIMARY KEY,
	"originalUrl" text NOT NULL,
	"shortUrl" varchar(255) NOT NULL UNIQUE,
	"accessCount" integer DEFAULT 0 NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL
);
