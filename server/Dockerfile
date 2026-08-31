FROM node:22-alpine as base

RUN npm i -g pnpm

FROM base as deps

WORKDIR /app 

COPY package.json pnpm-*.yaml ./ 

RUN pnpm install



FROM base AS development

WORKDIR /app

COPY . .

ENV NODE_ENV=development

EXPOSE 3333

CMD ["pnpm", "dev"]



FROM base AS build

WORKDIR /app

COPY . .

RUN pnpm build



FROM node:22-alpine AS production

WORKDIR /app

ENV NODE_ENV=production

COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/drizzle ./drizzle

EXPOSE 3333

CMD ["node", "dist/src/server.js"]
