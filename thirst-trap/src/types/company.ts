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
  state?: "create" | "refine" | "stage" | "hold";

  // Media shapes (either direct attributes or wrapped in data)
  logo?:
    | { data?: { attributes?: StrapiImage } }
    | { attributes?: StrapiImage }
    | StrapiImage;

  category?: { data?: { attributes?: Category } } | { attributes?: Category } | Category;

  tags?: { data?: { attributes?: Tag }[] }; // (you said these aren't used now)

  Website?: Link;
  Socials?: Link[];
  about?: string;
  how_to_boycott?: unknown;

  /** keep for legacy content that used `reason` single relation */
  reason?: { data?: { attributes?: { name?: string; description?: string } } };

  /** the new structured evaluation with reasoning tags */
  Evaluation?: Evaluation;
};
