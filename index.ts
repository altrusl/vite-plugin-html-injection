import path from "path";
import fs from "fs";
import type { Plugin, ResolvedConfig } from "vite";

export interface IHtmlInjectionConfig {
  injections: IHtmlInjectionConfigInjection[];
  order?: "pre" | "post";
}

export interface IHtmlInjectionConfigInjection {
  name?: string;
  path: string;
  type?: "raw" | "js" | "css";
  injectTo: "head" | "body" | "head-prepend" | "body-prepend";
  buildModes?: "dev" | "prod" | "both";
}

export function htmlInjectionPlugin(
  htmlInjectionConfig: IHtmlInjectionConfig,
): Plugin {
  let config: undefined | ResolvedConfig;

  return {
    name: "html-injection",

    configResolved(resolvedConfig) {
      config = resolvedConfig;
    },

    transformIndexHtml: {
      order: htmlInjectionConfig.order,
      handler: (html: string) => transformHtml({ html, config, htmlInjectionConfig }),
    },
  };
}

type TransformProps = {
  html: string;
  htmlInjectionConfig: IHtmlInjectionConfig;
  config?: ResolvedConfig;
};

function transformHtml({ html, htmlInjectionConfig, config }: TransformProps) {
  let out = html;

  for (let i = 0; i < htmlInjectionConfig.injections.length; i++) {
    const injection: IHtmlInjectionConfigInjection =
      htmlInjectionConfig.injections[i];

    const root = (config as ResolvedConfig).root;
    const filePath = path.resolve(root, injection.path);
    let data = fs.readFileSync(filePath, "utf8");

    if (
      injection.buildModes &&
      ((injection.buildModes === "dev" && !config?.env.DEV) ||
        (injection.buildModes === "prod" && !config?.env.PROD))
    ) {
      continue;
    }

    if (injection.type === "js") {
      data = `<script>\n${data}\n</script>\n`;
    } else if (injection.type === "css") {
      data = `<style>\n${data}\n</style>\n`;
    }

    switch (injection.injectTo) {
      case "head":
        out = out.replace("</head>", `${data}\n</head>`);
        break;
      case "head-prepend":
        out = out.replace(/<head(.*)>/i, `$&\n${data}`);
        break;
      case "body":
        out = out.replace("</body>", `${data}\n</body>`);
        break;
      case "body-prepend":
        out = out.replace(/<body(.*)>/i, `$&\n${data}`);
        break;

      default:
        break;
    }
  }

  return out;
}