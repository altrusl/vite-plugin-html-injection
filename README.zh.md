# Html 注入 Vite 插件

[![NPM](https://img.shields.io/npm/v/vite-plugin-html-injection)](https://www.npmjs.com/package/vite-plugin-html-injection)
[![NPM downloads](https://img.shields.io/npm/dt/vite-plugin-html-injection)](https://www.npmjs.com/package/vite-plugin-html-injection)

[🇬🇧 English](README.md) | [🇪🇸 Español](README.es.md) | [🇷🇺 Русский](README.ru.md) | [🇨🇳 中文](README.zh.md)

用于在 `index.html` 中注入 HTML、JS 和 CSS 代码片段的 Vite 插件。

## 目的

在开发前端应用程序时，通常需要将各种库集成到 `index.html` 文件中 - 例如，您可能需要包含 Google Analytics 的代码、PWA 服务工作者、Open Graph 和 Twitter Card 元数据、启动画面、客户支持小部件等。

因此，`index.html` 变得臃肿且难以管理。

该插件允许您将代码片段存储在单独的文件中，保持 `index.html` 干净整洁，并在构建时注入它们。无需在 `index.html` 中添加特殊的占位符标签。

该插件还支持 Vite 开发服务器的热模块替换（HMR），这意味着您可以编辑代码片段并立即在浏览器中看到结果。

此外，该插件支持开发和生产模式的不同配置。通过指定 `buildModes` 属性，您可以根据环境启用或禁用特定的代码片段，简化开发并在 `dev` 模式下禁用不必要的代码。

## 描述

代码片段有三种 `类型` - `raw`、`js` 和 `css`。`raw` 片段按原样注入，而 `js` 和 `css` 片段分别被包装在 `<script>` 和 `<style>` 标签中。默认类型值为 `raw`。

有四个位置可以在 `index.html` 中注入代码片段：
- `<head>` 标签的开头（`head-prepend`）
- `<head>` 标签的结尾（`head`）
- `<body>` 标签的开头（`body-prepend`）
- `<body>` 标签的结尾（`body`）

对应的 `injectTo` 值为：`head-prepend`、`head`、`body-prepend` 和 `body`。

<br>

## 安装

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

## 使用

1. 在 Vite 插件中添加 **`vite-plugin-html-injection`**，并进行必要的配置：

```js
// vite.config.js

import { defineConfig } from "vite";
import { htmlInjectionPlugin } from "vite-plugin-html-injection";

export default defineConfig({
  plugins: [
    htmlInjectionPlugin({
      // 转换顺序 - 设置为 "pre" 以在 HTML 文件中使用环境变量替换
      // 详见 https://vite.dev/guide/api-plugin.html#transformindexhtml
      order: "pre",
      // 示例注入
      injections: [
        {
          // （可选）注入名称
          name: "Open Graph",
          // 相对于 Vite 项目根目录的代码片段文件路径
          path: "./src/injections/open-graph.html",
          // （可选）代码片段类型：raw | js | css
          type: "raw",
          // 注入位置：head | body | head-prepend | body-prepend
          injectTo: "head",
          // （可选）适用的模式：dev | prod | both
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

> #### 提示：
>
> 您可以将配置对象放在单独的 JSON 文件中，并在 `vite.config.js` 中导入它

<br>

2. 创建相应的代码片段：

```html
<!-- ./src/injections/open-graph.html -->

<!-- Facebook Meta 标签 -->
<meta property="og:url" content="https://www.acme.com/" />
<meta property="og:type" content="website" />
<meta property="og:title" content="我的 Acme 网站" />
<meta property="og:description" content="欢迎访问我的 Acme 网站" />
<meta property="og:image" content="https://www.acme.com/logo.png" />
```

```html
<!-- ./src/injections/ga.html -->

<!-- Google 标签 (gtag.js) -->
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

就是这样。执行 `npm serve` 或 `npm build` 命令后，代码片段将被注入。

<br>

## 签名

该插件是强类型的。以下是其配置的签名：

```ts
export interface IHtmlInjectionConfig {
  injections: IHtmlInjectionConfigInjection[];
  order?: "pre" | "post";
}

export interface IHtmlInjectionConfigInjection {
  name?: string;
  path: string;
  type?: "raw" | "js" | "css"; // 默认为 'raw'
  injectTo: "head" | "body" | "head-prepend" | "body-prepend";
  buildModes?: "dev" | "prod" | "both"; // 默认为 'both'
}
```

<br>

## 如果您喜欢，请给个星星

谢谢！

<br>

## 贡献

您可以通过 [GitHub Issues](https://github.com/vite-plugin-html-injection/issues) 提出改进建议，或通过 [fork、编辑、创建 Pull Request](https://github.com/vite-plugin-html-injection/pulls) 来扩展此 Vite 插件的功能。

<br>

## 许可证

MIT 许可证 © 2023-2025 