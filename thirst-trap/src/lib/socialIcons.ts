// Keep keys EXACTLY as in your Strapi enum UI.
type PlatformKey =
  | "Instagram"
  | "TikTok"
  | "Facebook"
  | "LinkedIn"
  | "YouTube"
  | "Twitter"
  | "BlueSky"
  | "TruthSocial"
  | "Pinterest";

const ICONS: Record<PlatformKey, string> = {
  Instagram:   new URL("https://media.bigbeautifulboycott.us/6/7/instagram_18c54d7ccf.svg",  import.meta.url).href,
  TikTok:      new URL("https://media.bigbeautifulboycott.us/6/7/8547041_tiktok_icon_6ecdd43655.svg",     import.meta.url).href,
  Facebook:    new URL("https://media.bigbeautifulboycott.us/6/7/5296500_fb_social_media_facebook_facebook_logo_social_network_icon_8463e910f8.svg",   import.meta.url).href,
  LinkedIn:    new URL("https://media.bigbeautifulboycott.us/6/7/5296501_linkedin_network_linkedin_logo_icon_78786521ad.svg",   import.meta.url).href,
  YouTube:     new URL("https://media.bigbeautifulboycott.us/6/7/5296521_play_video_vlog_youtube_youtube_logo_icon_a89cbf27bf.svg",    import.meta.url).href,
  Twitter:     new URL("https://media.bigbeautifulboycott.us/6/7/twitter_7fd471945a.svg",    import.meta.url).href,
  BlueSky:     new URL("https://media.bigbeautifulboycott.us/6/7/bluesky_61e5ee34fa.svg",     import.meta.url).href,
  TruthSocial: new URL("https://media.bigbeautifulboycott.us/6/7/truth_social_4b5cf221b2.svg", import.meta.url).href,
  Pinterest: new URL("https://media.bigbeautifulboycott.us/6/7/Pinterest_e35d7490ab.svg", import.meta.url).href,
};

export function iconForPlatform(platform?: string): string | null {
  if (!platform) return null;
  // Use the platform string as-is; capitalization must match the enum.
  return (ICONS as Record<string, string>)[platform] ?? null;
}
