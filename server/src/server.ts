import { buildApp } from "./app.ts";
import { env } from "./env.ts";

const app = buildApp();

try {
  await app.listen({
    port: env.PORT,
    host: "0.0.0.0",
  });

  app.log.info("Servidor Inicializado");
} catch (error) {
  app.log.error(error);
  process.exit(1);
}
