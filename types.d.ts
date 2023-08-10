export interface IHtmlInjectionConfigInjection {
  name?: string;
  path: string;
  type: string;
  injectTo?: "head" | "body" | "head-prepend" | "body-prepend";
}
export interface IHtmlInjectionConfig {
  injections: IHtmlInjectionConfigInjection[];
}
