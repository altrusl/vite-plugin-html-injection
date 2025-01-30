# Html Injection Vite Plugin

[![NPM](https://img.shields.io/npm/v/vite-plugin-html-injection)](https://www.npmjs.com/package/vite-plugin-html-injection)
[![NPM downloads](https://img.shields.io/npm/dt/vite-plugin-html-injection)](https://www.npmjs.com/package/vite-plugin-html-injection)

[🇬🇧 English](README.md) | [🇪🇸 Español](README.es.md) | [🇷🇺 Русский](README.ru.md) | [🇨🇳 中文](README.zh.md)

Плагин Vite для внедрения HTML, JS и CSS фрагментов кода в `index.html`.

## Назначение

При разработке фронтенд-приложений часто возникает необходимость интеграции различных библиотек в файл `index.html` - например, добавление кода для Google Analytics, сервис-воркеров PWA, мета-тегов Open Graph и Twitter Card, заставок, виджетов поддержки клиентов и многого другого.

В результате `index.html` становится перегруженным и сложным в управлении.

Этот плагин позволяет хранить фрагменты кода в отдельных файлах, сохраняя `index.html` чистым и аккуратным, и внедрять их во время сборки. Никаких специальных placeholder-тегов в `index.html` не требуется.

Плагин также поддерживает HMR (Hot Module Replacement) сервера разработки Vite, что означает возможность редактирования фрагментов кода с немедленным отображением изменений в браузере.

Более того, плагин поддерживает различные конфигурации для режимов разработки и продакшена. Указав свойство `buildModes`, вы можете включать или отключать определенные фрагменты кода в зависимости от окружения, упрощая разработку и отключая ненужный код в `dev` режиме.

## Описание

Существует три `типа` фрагментов кода - `raw`, `js` и `css`. `raw`-фрагменты внедряются как есть, а `js` и `css` фрагменты оборачиваются в теги `<script>` и `<style>` соответственно. По умолчанию тип - `raw`.

Есть четыре места для внедрения фрагмента кода в `index.html`:
- В начало тега `<head>` (`head-prepend`)
- В конец тега `<head>` (`head`)
- В начало тега `<body>` (`body-prepend`)
- В конец тега `<body>` (`body`)

Соответствующие значения `injectTo`: `head-prepend`, `head`, `body-prepend` и `body`.

<br>

## Установка

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

## Использование

1. Добавьте **`vite-plugin-html-injection`** в плагины Vite с необходимой конфигурацией:

```js
// vite.config.js

import { defineConfig } from "vite";
import { htmlInjectionPlugin } from "vite-plugin-html-injection";

export default defineConfig({
  plugins: [
    htmlInjectionPlugin({
      // порядок трансформации - установите "pre" для замены переменных окружения в html-файлах
      // Подробнее https://vite.dev/guide/api-plugin.html#transformindexhtml
      order: "pre",
      // примеры внедрений
      injections: [
        {
          // (опционально) название инъекции
          name: "Open Graph",
          // путь к файлу фрагмента относительно корня Vite проекта
          path: "./src/injections/open-graph.html",
          // (опционально) тип фрагмента: raw | js | css
          type: "raw",
          // куда вставлять: head | body | head-prepend | body-prepend
          injectTo: "head",
          // (опционально) в каких режимах применять: dev | prod | both
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

> #### Подсказка:
>
> Вы можете разместить объект конфигурации в отдельном json-файле и импортировать его в `vite.config.js`

<br>

2. Создайте соответствующие фрагменты кода:

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

Всё. После выполнения команд `npm serve` или `npm build` фрагменты кода будут внедрены.

<br>

## Сигнатура

Плагин строго типизирован. Вот сигнатура его конфигурации:

```ts
export interface IHtmlInjectionConfig {
  injections: IHtmlInjectionConfigInjection[];
  order?: "pre" | "post";
}

export interface IHtmlInjectionConfigInjection {
  name?: string;
  path: string;
  type?: "raw" | "js" | "css"; // по умолчанию 'raw'
  injectTo: "head" | "body" | "head-prepend" | "body-prepend";
  buildModes?: "dev" | "prod" | "both"; // по умолчанию 'both'
}
```

<br>

## Если вам понравилось - поставьте звезду

Спасибо!

<br>

## Содействие

Вы можете предлагать улучшения через [GitHub Issues](https://github.com/vite-plugin-html-injection/issues) или расширять функциональность, [fork, edit, create Pull Request](https://github.com/vite-plugin-html-injection/pulls) для этого Vite-плагина.

<br>

## Лицензия

Лицензия MIT © 2023-2025
