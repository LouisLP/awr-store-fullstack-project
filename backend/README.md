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

Seed the DB with some products (optional, but recommended):

```sh
npm run seed
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
- I switched ports (still confused why this didn't work).
- I used `127.0.0.1` rather than `localhost`.
- I wrote a small script to try to debug the whole process.

After almost giving up, I ran a good ol' `lsof -i :5432`. I noticed my homebrew instance of Postgres was running on the same port; this one always takes priority over the Docker one. After a `brew services stop postgresql`, I was good to go.

### API Linting

When I started working on the Products and Orders, I got the Biome setup running (never used it before this, as I always used an ESLint config for auto-formatting), and noticed a bunch of linting errors. Not sure if it was an intentional trap, but the linter noticed some imports that should be using `type` rather than the raw import. I applied these, and it caused a whole bunch of issues with the build. I started noticing other errors (such as `main.ts` having the wrong argument in the `FastifyAdapter`, or the test files importing `Mocked`, which doesn't exist). For some reason, these don't cause issues normally, but *were* when I tried applying the `type` linting changes.

### Schemas

I made a couple changes to the schemas throughout this whole process:

1. Rather than using `Float` values, it's better to set `Decimal` values to avoid weird float-related rounding errors and such for monetary numbers. However, this caused me to have to change the product-related values almost everywhere.
2. The response for `Orders` now expects a date-string rather than a `Date` object (to simplify it a bit). I was just following the base DB schema (from the `Products` example) and then used `toISOString()`.

Lastly, I made a script to seed some initial products (themed with OSRS items). I've been testing out the routes with Postman or whatnot, but it'll only be until I have the frontend running that I can *really* check the full order process (as there's no cart in the backend).
