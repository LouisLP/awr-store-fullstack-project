# Backend README

## Setup

### Pre-requisites

- [Node.js](https://nodejs.org/en) (I've been using v22 installed through nvm)
- [Docker Desktop](https://www.docker.com/products/docker-desktop/)

### Steps

Install all dependencies:

```sh
npm install
```

Run the Docker container:

```sh
docker compose up -d
```

Run the migrations:

```sh
npm run prisma:migrate:dev
```

Start the dev server:

```sh
npm run start:dev
```

Go to this link to verify the API spec: http://localhost:3000/api

---

## Extra Insights

### Setup Woes

I was going absolutely insane when I kept running into authentication errors when trying to run `npm run prisma:migrate:dev` during initial setup...

- I thought switching the user (to "awruser") would help, because "user" is a reserved term with Postgres.
- I tried switching the version to postgres:14 rather than the alpine version.
- I switched ports.
- I used `127.0.0.1` rather than `localhost`.
- I wrote a small script to try to debug the whole process.

After almost giving up, I ran a good ol' `lsof -i :5432`. I noticed my homebrew instance of Postgres was running on the same port; this one always takes priority over the Docker one. After a `brew services stop postgresql`, I was good to go.
