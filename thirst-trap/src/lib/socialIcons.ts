// Keep keys EXACTLY as in your Strapi enum UI.
type PlatformKey =
  | "Instagram"
  | "TikTok"
  | "Facebook"
  | "LinkedIn"
  | "YouTube"
  | "Twitter"
  | "BlueSky"
  | "TruthSocial";

const ICONS: Record<PlatformKey, string> = {
  Instagram:   new URL("../assets/icons/instagram.svg",  import.meta.url).href,
  TikTok:      new URL("../assets/icons/tiktok.svg",     import.meta.url).href,
  Facebook:    new URL("../assets/icons/facebook.svg",   import.meta.url).href,
  LinkedIn:    new URL("../assets/icons/linkedin.svg",   import.meta.url).href,
  YouTube:     new URL("../assets/icons/youtube.svg",    import.meta.url).href,
  Twitter:     new URL("../assets/icons/twitter.svg",    import.meta.url).href,
  BlueSky:     new URL("../assets/icons/bluesky.svg",     import.meta.url).href,
  TruthSocial: new URL("../assets/icons/truthsocial.svg", import.meta.url).href,
};

export function iconForPlatform(platform?: string): string | null {
  if (!platform) return null;
  // Use the platform string as-is; capitalization must match the enum.
  return (ICONS as Record<string, string>)[platform] ?? null;
}
