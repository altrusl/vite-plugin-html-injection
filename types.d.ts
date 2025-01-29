import { type Plugin } from "vite";
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
declare function htmlInjectionPlugin(config: IHtmlInjectionConfig): Plugin;

export { htmlInjectionPlugin };
