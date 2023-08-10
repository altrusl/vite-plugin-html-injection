import { Plugin, ResolvedConfig } from "vite";
import path from "path";
import fs from "fs";
import { IHtmlInjectionConfig, IHtmlInjectionConfigInjection } from "./types";

export function htmlInjectionPlugin(
  htmlInjectionConfig: IHtmlInjectionConfig
): Plugin {
  let config: undefined | ResolvedConfig;

  return {
    name: "html-injection",

    configResolved(resolvedConfig) {
      config = resolvedConfig;
    },

    transformIndexHtml(html: string) {
      let out = html;
      for (let i = 0; i < htmlInjectionConfig.injections.length; i++) {
        const injection: IHtmlInjectionConfigInjection =
          htmlInjectionConfig.injections[i];

        let root = (config as ResolvedConfig).root;
        // const filePath = root + injection.path;
        const filePath = path.resolve(root, injection.path);
        let data = fs.readFileSync(filePath, "utf8");
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
    },
  };
}
