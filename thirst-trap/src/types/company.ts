// src/types/company.ts
import type { StrapiImage } from "./strapi";

export type Tag = { name: string; slug: string; summary?: string };

export type Category = {
  name: string;
  slug: string;
  description?: string;
  color?: string;        // you are storing this on Category
  icon?: string;
};

export type Link = {
  label: string;
  url: string;
  ariaLabel?: string;
  iconName?: string;
  tracking?: Record<string, unknown>;
  archive_url?: string;
};

/** Reasoning tag coming from Strapi */
export type ReasoningTag = {
  name: string;
  slug?: string;
  about?: string;
  color?: string; // hex; used as the pill background
  icon?: string;
  /** enum in Strapi: 'critical' | 'high' | 'medium' | 'low' | 'info' */
  severity?: string;
};

export type ReasoningBlock = {
  heading?: string;
  content?: string;
  Source?: any[];
};

export type Evaluation = {
  summary?: string;
  /** relation can arrive either populated as an array or as {data:[{attributes:...}]} */
  reasoning_tags?:
    | { data?: { attributes?: ReasoningTag }[] }
    | ReasoningTag[];
};

export type Company = {
  name: string;
  slug: string;
  ticker?: string | null;
  boycott_target?: boolean;
  intro?: string;   // CKEditor HTML
  about?: string;   // short 30–65 char blurb
  Reasoning?: ReasoningBlock;

  logo?:
    | { data?: { attributes?: StrapiImage } }
    | { attributes?: StrapiImage }
    | StrapiImage;

  // if you want to type sector later, we can, but keep it loose for now
  sector?: any;

  category?: { data?: { attributes?: Category } } | { attributes?: Category } | Category;
  tags?: { data?: { attributes?: Tag }[] };

  Website?: Link;
  Socials?: Link[];

  reason?: { data?: { attributes?: { name?: string; description?: string } } };

  Evaluation?: Evaluation;
};
