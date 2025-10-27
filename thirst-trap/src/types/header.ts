// thirst-trap/src/types/header.ts
export type Link = {
  label: string;
  url: string;
  ariaLabel?: string;
  iconName?: string;
  tracking?: Record<string, unknown>;
};

export type Button = {
  link: Link;
  variant: "primary" | "ghost";
  size?: "small" | "medium" | "large";
};

export type NavItem = {
  link: Link;
  children?: Link[];
};

export type HeaderType = {
  logo?: { url?: string; alternativeText?: string };
  logoHref?: string;
  nav?: NavItem[];
  ctas?: Button[];
};
