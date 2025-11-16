// src/lib/share.ts
import type { Company, ShareSettings } from "../types/company";
import type { StrapiImage } from "../types/strapi";
import { mediaUrl } from "./strapi";

export type ResolvedShare = {
  enabled: boolean;
  title: string;
  message: string;
  messageShort: string;
  hashtags: string[];     // clean, without '#'
  url: string;
  imageUrl: string | null;
};

/** Safe truncate with ellipsis */
function truncate(str: string, max: number): string {
  if (str.length <= max) return str;
  return str.slice(0, max - 1).trimEnd() + "…";
}

function normalizeHashtags(raw?: string | null): string[] {
  if (!raw) return [];
  return raw
    .split(/[,\s]+/)
    .map((t) => t.trim().replace(/^#/, "").toLowerCase())
    .filter(Boolean);
}

function getImageUrlFromMedia(m?: ShareSettings["share_image"] | StrapiImage | null): string | null {
  if (!m) return null;
  const node = (m as any)?.data?.attributes || (m as any)?.attributes || m;
  const url = node?.url;
  return url ? mediaUrl(url) : null;
}

/**
 * Build a resolved share payload for a company.
 * `pageUrl` should be the canonical URL for this company page.
 */
export function resolveShareForCompany(company: Company, pageUrl: string): ResolvedShare {
  const share: ShareSettings | null | undefined = company.share_settings;

  const enabled = share?.Enable ?? true; // default ON if component exists
  const baseName = company.name ?? "This company";

  // --- URL ---
  const url = share?.link_override?.trim() || pageUrl;

  // --- Title ---
  const defaultTitle = `${baseName} on Big Beautiful Boycott`;
  const title = (share?.title?.trim() || defaultTitle).slice(0, 120);

  // --- Message (long) ---
  const fallbackMsg =
    company.about?.trim() ||
    `Learn more about ${baseName} and how their actions affect our communities on Big Beautiful Boycott.`;
  const message = truncate(share?.message?.trim() || fallbackMsg, 300);

  // --- Short message ---
  const messageShort = truncate(
    (share?.message_short?.trim() || message),
    140
  );

  // --- Hashtags ---
  const defaultTags = ["bigbeautifulboycott", company.slug].filter(Boolean);
  const hashtags =
    normalizeHashtags(share?.hashtags) || defaultTags;

  // --- Image ---
  const imageUrl =
    getImageUrlFromMedia(share?.share_image) ||
    getImageUrlFromMedia(company.logo) ||
    null;

  return {
    enabled,
    title,
    message,
    messageShort,
    hashtags,
    url,
    imageUrl,
  };
}
