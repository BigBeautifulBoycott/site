// src/types/footer.ts
import type { Link } from "./header";

export type FooterSection = {
  title?: string;
  // Strapi component can be named either link or links depending on how it was created
  link?: Link[];
  links?: Link[];
};

export type Footer = {
  logo?: { url?: string; alternativeText?: string };
  sections?: FooterSection[];
  content?: any; // Strapi Blocks
  copyright?: string;
  bottom_links?: Link[];
};

// Back-compat alias for components that import FooterType
export type FooterType = Footer;
