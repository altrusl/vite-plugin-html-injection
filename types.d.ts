export interface IHtmlInjectionConfig {
  injections: IHtmlInjectionConfigInjection[];
}
export interface IHtmlInjectionConfigInjection {
  name?: string;
  path: string;
  type?: "raw" | "js" | "css";
  injectTo: "head" | "body" | "head-prepend" | "body-prepend";
}
