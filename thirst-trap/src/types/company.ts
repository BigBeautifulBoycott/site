// src/types/company.ts
import type { StrapiImage } from "./strapi";

export type Tag = { name: string; slug: string; summary?: string };
export type Category = { name: string; slug: string; description?: string; color?: string };
export type Link = {
  label: string;
  url: string;
  ariaLabel?: string;
  iconName?: string;
  tracking?: Record<string, unknown>;
  archive_url?: string;
};

export type Company = {
  name: string;
  slug: string;
  state?: "create" | "refine" | "stage" | "hold";
  logo?: { data?: { attributes?: StrapiImage } };
  category?: { data?: { attributes?: Category } };
  tags?: { data?: { attributes?: Tag }[] }; // works for M2M
  Website?: Link;
  Socials?: Link[];
  about?: string;
  how_to_boycott?: unknown;
  Reasoning?: unknown;
  reason?: { data?: { attributes?: { name?: string; description?: string } } };
};
