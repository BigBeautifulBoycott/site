export type StrapiImage = {
  url: string; width?: number; height?: number; alternativeText?: string;
};
export type Seo = {
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string;
  shareImage?: { data?: { attributes: StrapiImage } };
  metaRobots?: string;              // e.g. "index,follow"
  structuredData?: any;             // JSON-LD
  metaViewport?: string;            // optional
  canonicalURL?: string;            // optional
};
export type Global = {
  siteName: string;
  siteDescription: string;
  favicon?: { data?: { attributes: StrapiImage } };
  defaultSeo?: Seo;
};

export function mediaPath(m: any): string {
  if (!m) return "";
  if (typeof m === "string") return m;
  return m?.data?.attributes?.url || m?.attributes?.url || m?.url || "";
}
export function mediaAlt(m: any): string {
  return m?.data?.attributes?.alternativeText
      || m?.attributes?.alternativeText
      || m?.alternativeText
      || "";
}
