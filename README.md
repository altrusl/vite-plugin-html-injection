# Html Injection Vite Plugin

[![NPM](https://img.shields.io/npm/v/vite-plugin-html-injection)](https://www.npmjs.com/package/vite-plugin-html-injection)
[![NPM downloads](https://img.shields.io/npm/dt/vite-plugin-html-injection)](https://www.npmjs.com/package/vite-plugin-html-injection)

[🇬🇧 English](README.md) | [🇪🇸 Español](README.es.md) | [🇷🇺 Русский](README.ru.md) | [🇨🇳 中文](README.zh.md)

Vite plugin for injecting HTML, JS, and CSS code snippets into `index.html`.

## Purpose

Often, when developing front-end applications, it is necessary to integrate various libraries into the `index.html` file - for example, you might want to include code for Google Analytics, PWA service workers, Open Graph and Twitter Card meta data, Splash screens, Customer support widgets, and much more.

As a result, `index.html` becomes bloated and hard to manage.

This plugin allows you to store code snippets in separate files, keeping `index.html` clean and pristine, and inject them at build time. There is no need for special placeholder tags in the `index.html` as well.

The plugin also supports `Vite dev server HMR`, which means you can edit code snippets and see the results immediately in the browser.

Additionally, the plugin allows for different configurations in development and production modes. By specifying the `buildModes` property, you can enable or disable specific code snippets depending on the environment, simplifying development and reducing unnecessary code in Dev mode.

## Description

There are three `types` of code snippets - `raw`, `js`, and `css`. `raw` snippets are injected as-is, while `js` and `css` snippets are wrapped in `<script>` and `<style>` tags respectively. The default `type` value is `raw`.

There are four places where you can inject a code snippet into the `index.html`:
- The beginning of the `<head>` tag (`head-prepend`)
- The end of the `<head>` tag (`head`)
- The beginning of the `<body>` tag (`body-prepend`)
- The end of the `<body>` tag (`body`)

Corresponding `injectTo` values are: `head-prepend`, `head`, `body-prepend`, and `body`.

<br>

## Installation


```bash
pnpm add vite-plugin-html-injection -D
```
```bash
yarn add vite-plugin-html-injection -D
```
```bash
npm i vite-plugin-html-injection -D
```

<br>

## Usage

1. Add **`vite-plugin-html-injection`** to your Vite plugins with required configuration:

```js
// vite.config.js

import { defineConfig } from "vite";
import { htmlInjectionPlugin } from "vite-plugin-html-injection";

export default defineConfig({
  plugins: [
    htmlInjectionPlugin({
      // transformation order - set to "pre" to use env variable replacement in html files
      // See https://vite.dev/guide/api-plugin.html#transformindexhtml
      order: "pre",
      // example injections
      injections: [
        {
          // (optional) injection name
          name: "Open Graph",
          // path to the code snippet file relative to Vite project root
          path: "./src/injections/open-graph.html",
          // (optional) code snippet type: raw | js | css
          type: "raw",
          // where to inject: head | body | head-prepend | body-prepend
          injectTo: "head",
          // (optional) which modes apply to: dev | prod | both
          buildModes: "both",
        },
        {
          name: "Google analytics",
          path: "./src/injections/ga.html",
          type: "raw",
          injectTo: "body",
          buildModes: "prod",
        },
      ],
    }),
  ],
});
```

> #### Hint:
>
> You can place config object in a separate json file and import it in the vite.config.js

<br>

2. Create corresponding code snippets:

```html
<!-- ./src/injections/open-graph.html -->

<!-- Facebook Meta Tags -->
<meta property="og:url" content="https://www.acme.com/" />
<meta property="og:type" content="website" />
<meta property="og:title" content="My Acme website" />
<meta property="og:description" content="Welcome to my Acme website" />
<meta property="og:image" content="https://www.acme.com/logo.png" />
```

```html
<!-- ./src/injections/ga.html -->

<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-8W4X32XXXX" />
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag() {
    dataLayer.push(arguments);
  }
  gtag("js", new Date());

  gtag("config", "G-8W4X32XXXX");
</script>
```

<br>

That's it. After running `npm serve` or `npm build` command the code snippets will be injected.

<br>

## Signature

The plugin is strongly typed. Here is the signature of its configuration:

```ts
export interface IHtmlInjectionConfig {
  injections: IHtmlInjectionConfigInjection[];
  order?: "pre" | "post";
}

export interface IHtmlInjectionConfigInjection {
  name?: string;
  path: string;
  type?: "raw" | "js" | "css"; // default is 'raw'
  injectTo: "head" | "body" | "head-prepend" | "body-prepend";
  buildModes?: "dev" | "prod" | "both"; // default is 'both'
}
```

<br>

## If you like it, star it

Thank you!

<br>

## Contributing


You are welcome to make suggestions through [GitHub Issues](https://github.com/vite-plugin-html-injection/issues) or extend functionality by [forking, modifying, and making a PR](https://github.com/vite-plugin-html-injection/pulls) to this Vite plugin.

<br>

## License

MIT License © 2023-2025
