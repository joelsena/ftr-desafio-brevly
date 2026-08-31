# Brev.ly

A aplicação pode ser executada com Docker tanto em ambiente de desenvolvimento quanto em produção.

## Pré-requisitos

* Docker
* Docker Compose

## Desenvolvimento

Para iniciar a aplicação em modo de desenvolvimento:

```bash
docker compose up --build -d
```

A aplicação ficará disponível em:

* Frontend: `http://localhost:5173`
* Backend: `http://localhost:3333`

Para executar as migrations:

```bash
docker compose exec server pnpm db:migrate
```

## Produção

Para iniciar a aplicação usando a configuração de produção:

```bash
docker compose -f compose.yml -f compose.prod.yml up --build -d
```

A aplicação ficará disponível em:

```text
http://localhost
```

Para executar as migrations:

```bash
docker compose exec server npm run db:migrate -- --config=./dist/drizzle.config.js
```

## Parar a aplicação

Para parar os containers:

```bash
docker compose down
```

