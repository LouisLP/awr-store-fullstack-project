# Frontend README

This is the frontend portion of the Aware Shop (fullstack task).

## Recommended Setup

I'd recommend using [VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur). I'm using [Antfu's ESLint config preset](https://github.com/antfu/eslint-config) for formatting (rather than something like Prettier); this way, through `eslint.config.mjs` and the recommended settings under `.vscode/settings.json` working in tandem, you'll get some flawless linting suggestions/fixes.

## Technologies Used

- [Vue.js](https://vuejs.org/)
- [Tailwind CSS](https://tailwindcss.com/) with [DaisyUI](https://iconify.design/) for premade sets of classes
- [Iconify](https://iconify.design/)
- [ESLint](https://eslint.org/) with [Antfu's config](https://github.com/antfu/eslint-config) and most of [CJ's suggestions from Syntax here](https://gist.github.com/w3cj/21b1f1b4857ecd13d076075a5c5aaf13/)
- [Vee-validate](https://vee-validate.logaretm.com/v4/guide/composition-api/getting-started/) with [Zod](https://zod.dev/)

## Setup

First, go to the [backend](https://github.com/LouisLP/awr-store-fullstack-project/blob/main/backend/README.md) `README` to view instructions on running the backend. Then, (optionally) seed the database with some products. Next...

### Steps

```sh
npm install
```

```sh
npm run dev
```

### Lint

```sh
npm run lint
```

Or to automatically fix all files with the above-described rules:

```sh
npm run lint:fix
```

---

## Extra Insights

I followed the steps in the instructions sequentially, but jumped ahead to create `type` files for things like `orders` ahead of time. That way, I could create a skeleton for the other components, composables, and stores while working on the pieces that would fit into the initial components (such as the cart being a part of the navbar/header).

I was glad to use something like DaisyUI; normally I'd want more flexibility to customize components, but this provides a quick way to theme the whole application with simpler class sets.

### Adding to Cart with Max Stock

Even though my cart store was working nicely for the actual cart page, I needed to go back and fix a bug where users could click "Add to cart" an infinite number of times on a product card. This is why I made it a store rather than a composable in the first place, so that it's accessible everywhere throughout the application. Regardless, I made a couple utility functions to check whether adding to the cart should be possible or not.

### Routing

Everything was on `localhost:5173` because I was using `createMemoryHistory` rather than `createWebHistory` for some reason. Fixing that made it easier to test the `GET` requests for specific orders later on.
