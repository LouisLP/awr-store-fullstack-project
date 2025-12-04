# TODO: add title

TODO: add description

## Recommended Setup

I'd recommend using [VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur). I'm using [Antfu's ESLint config preset](https://github.com/antfu/eslint-config) for formatting (rather than something like Prettier); this way, through `eslint.config.mjs` and the recommended settings under `.vscode/settings.json` working in tandem, you'll get some flawless linting suggestions/fixes.

## Technologies Used

- [Vue.js](https://vuejs.org/)
- [Tailwind CSS](https://tailwindcss.com/) with [DaisyUI](https://iconify.design/) for premade sets of classes
- [Iconify](https://iconify.design/)
- [ESLint](https://eslint.org/) with [Antfu's config](https://github.com/antfu/eslint-config) and most of [CJ's suggestions from Syntax here](https://gist.github.com/w3cj/21b1f1b4857ecd13d076075a5c5aaf13/)
- [Vee-validate](https://vee-validate.logaretm.com/v4/guide/composition-api/getting-started/) with [Zod](https://zod.dev/)

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

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
