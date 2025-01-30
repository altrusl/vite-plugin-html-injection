# Plugin de Inyección HTML para Vite

[![NPM](https://img.shields.io/npm/v/vite-plugin-html-injection)](https://www.npmjs.com/package/vite-plugin-html-injection)
[![NPM downloads](https://img.shields.io/npm/dt/vite-plugin-html-injection)](https://www.npmjs.com/package/vite-plugin-html-injection)

[🇬🇧 English](README.md) | [🇪🇸 Español](README.es.md) | [🇷🇺 Русский](README.ru.md) | [🇨🇳 中文](README.zh.md)

Plugin de Vite para inyectar fragmentos de código HTML, JS y CSS en `index.html`.

## Propósito

A menudo, al desarrollar aplicaciones front-end, es necesario integrar diversas bibliotecas en el archivo `index.html`. Por ejemplo, puede que quieras incluir código para Google Analytics, service workers de PWA, metadatos de Open Graph y Twitter Card, pantallas de bienvenida, widgets de soporte al cliente y mucho más.

Como resultado, `index.html` se vuelve sobrecargado y difícil de gestionar.

Este plugin te permite almacenar fragmentos de código en archivos separados, manteniendo `index.html` limpio y ordenado, e inyectándolos en tiempo de compilación. No es necesario utilizar etiquetas de marcador de posición especiales en el `index.html`.

El plugin también soporta `Vite dev server HMR`, lo que significa que puedes editar los fragmentos de código y ver los resultados inmediatamente en el navegador.

Además, el plugin permite configuraciones diferentes en los modos de desarrollo y producción. Al especificar la propiedad `buildModes`, puedes habilitar o deshabilitar fragmentos específicos dependiendo del entorno, simplificando el desarrollo y reduciendo el código innecesario en las compilaciones de producción.

## Descripción

Existen tres `tipos` de fragmentos de código: `raw`, `js` y `css`. Los fragmentos `raw` se inyectan tal cual, mientras que los fragmentos `js` y `css` se envuelven en etiquetas `<script>` y `<style>` respectivamente. El valor predeterminado para `type` es `raw`.

Hay cuatro lugares donde puedes inyectar un fragmento de código en el `index.html`:
- Al inicio de la etiqueta `<head>` (`head-prepend`)
- Al final de la etiqueta `<head>` (`head`)
- Al inicio de la etiqueta `<body>` (`body-prepend`)
- Al final de la etiqueta `<body>` (`body`)

Los valores correspondientes para `injectTo` son: `head-prepend`, `head`, `body-prepend` y `body`.

<br>

## Instalación

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

## Uso

1. Añade **`vite-plugin-html-injection`** a tus plugins de Vite con la configuración requerida:

```js:path/to/vite.config.js
// vite.config.js

import { defineConfig } from "vite";
import { htmlInjectionPlugin } from "vite-plugin-html-injection";

export default defineConfig({
  plugins: [
    htmlInjectionPlugin({
      // orden de transformación - establece en "pre" para usar reemplazo de variables de entorno en archivos HTML
      // Ver https://vite.dev/guide/api-plugin.html#transformindexhtml
      order: "pre",
      // inyecciones de ejemplo
      injections: [
        {
          // (opcional) nombre de la inyección
          name: "Open Graph",
          // ruta al archivo del fragmento de código relativo a la raíz del proyecto Vite
          path: "./src/injections/open-graph.html",
          // (opcional) tipo de fragmento de código: raw | js | css
          type: "raw",
          // dónde inyectar: head | body | head-prepend | body-prepend
          injectTo: "head",
          // (opcional) modos a los que se aplica: dev | prod | both
          buildModes: "both",
        },
        {
          name: "Google Analytics",
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

> #### Sugerencia:
>
> Puedes colocar el objeto de configuración en un archivo JSON separado e importarlo en el `vite.config.js`.

<br>

2. Crea los fragmentos de código correspondientes:

```html:path/to/src/injections/open-graph.html

<!-- ./src/injections/open-graph.html -->

<!-- Meta Tags de Facebook -->
<meta property="og:url" content="https://www.acme.com/" />
<meta property="og:type" content="website" />
<meta property="og:title" content="Mi sitio web de Acme" />
<meta property="og:description" content="Bienvenido a mi sitio web de Acme" />
<meta property="og:image" content="https://www.acme.com/logo.png" />
```

```html:path/to/src/injections/ga.html

<!-- ./src/injections/ga.html -->

<!-- Etiqueta de Google (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-8W4X32XXXX"></script>
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

Eso es todo. Después de ejecutar el comando `npm serve` o `npm build`, los fragmentos de código serán inyectados.

<br>

## Configuración para Diferentes Modos

El plugin soporta configuraciones diferentes para los entornos de desarrollo y producción. Al configurar la propiedad `buildModes` para cada inyección, puedes controlar si un fragmento se incluye en el servidor de desarrollo, en la compilación de producción o en ambos. Esta flexibilidad te permite deshabilitar fragmentos de código innecesarios durante el desarrollo, mejorando el rendimiento y simplificando el proceso de desarrollo.

```ts:path/to/types.d.ts
export interface IHtmlInjectionConfig {
  injections: IHtmlInjectionConfigInjection[];
  order?: "pre" | "post";
}

export interface IHtmlInjectionConfigInjection {
  name?: string;
  path: string;
  type?: "raw" | "js" | "css"; // valor por defecto es 'raw'
  injectTo: "head" | "body" | "head-prepend" | "body-prepend";
  buildModes?: "dev" | "prod" | "both"; // valor por defecto es 'both'
}
```

<br>

## Firma

El plugin está altamente tipado. Aquí está la firma de su configuración:

```ts:path/to/types.d.ts
export interface IHtmlInjectionConfig {
  injections: IHtmlInjectionConfigInjection[];
  order?: "pre" | "post";
}

export interface IHtmlInjectionConfigInjection {
  name?: string;
  path: string;
  type?: "raw" | "js" | "css"; // valor por defecto es 'raw'
  injectTo: "head" | "body" | "head-prepend" | "body-prepend";
  buildModes?: "dev" | "prod" | "both"; // valor por defecto es 'both'
}
```

<br>

## Si Te Gusta, Estrella el Proyecto

¡Gracias!

<br>

## Contribuciones

Eres bienvenido a hacer sugerencias a través de [GitHub Issues](https://github.com/your-repo/issues) o extender la funcionalidad al [hacer un fork, modificar y crear un PR](https://github.com/your-repo/pulls) a este plugin para Vite.

<br>

## Licencia

Licencia MIT © 2023-2024

<br>

## Traducciones Disponibles

- [README.md](./README.md)
- [README.ru.md](./README.ru.md)
