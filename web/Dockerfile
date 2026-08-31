FROM node:22-alpine as base

RUN npm i -g pnpm

FROM base as deps

WORKDIR /app

COPY package.json pnpm-*.yaml ./

ENV CI=true

RUN pnpm install

FROM base as development

WORKDIR /app

COPY . .

ENV CI=true
ENV NODE_ENV=development

EXPOSE 5173

CMD ["pnpm", "dev"]


FROM node:22-alpine as build

RUN npm i -g pnpm

WORKDIR /app

COPY package.json pnpm-*.yaml ./ 

ENV CI=true

RUN pnpm install

COPY . .

RUN pnpm build


FROM nginx:alpine as production

COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
