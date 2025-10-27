// types/legal.ts

export interface PolicySection {
  title: string;
  content: unknown;
}

export interface APIPolicy {
  title: string;
  slug: string;
  effective_date: string;
  summary?: string;
  contact_email: string;
  section: PolicySection[];
  publishedAt?: string;
}
