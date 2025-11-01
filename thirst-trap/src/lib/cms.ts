// src/lib/cms.ts
type StrapiResp<T> = { data: T[]; meta?: { pagination?: { page: number; pageSize: number; total: number; pageCount: number } } };

const STRAPI_URL = import.meta.env.STRAPI_URL;
const STRAPI_TOKEN = import.meta.env.STRAPI_TOKEN;

if (!STRAPI_URL || !STRAPI_TOKEN) {
  throw new Error("Missing STRAPI_URL or STRAPI_TOKEN in build environment.");
}

let _companiesCache: any[] | null = null;

async function strapiFetch<T>(path: string): Promise<T> {
  const url = `${STRAPI_URL}${path}`;
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${STRAPI_TOKEN}` },
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Strapi ${res.status} for ${path} :: ${body}`);
  }
  return res.json() as Promise<T>;
}

export async function fetchAllCompanies(): Promise<any[]> {
  if (_companiesCache) return _companiesCache;

  const base =
    "/api/companies"
    + "?publicationState=live"
    + "&fields=name,slug,about,how_to_boycott,Reasoning"
    + "&populate=logo,category,tags,Evaluation,contact"
    + "&populate[Evaluation][populate]=reasoning_tags"
    + "&populate[Evaluation][populate][reasoning_tags][fields]=name,slug,color"
    + "&populate[logo][fields]=url,alternativeText,formats"
    + "&populate[contact][populate]=*";

  const pageSize = 100;
  let page = 1;
  let out: any[] = [];

  // fetch first page to know totals
  let first = await strapiFetch<StrapiResp<any>>(`${base}&pagination[page]=${page}&pagination[pageSize]=${pageSize}`);
  out = out.concat(first.data ?? []);
  const pageCount = first.meta?.pagination?.pageCount ?? 1;

  // fetch remaining pages if any
  while (page < pageCount) {
    page++;
    const next = await strapiFetch<StrapiResp<any>>(`${base}&pagination[page]=${page}&pagination[pageSize]=${pageSize}`);
    out = out.concat(next.data ?? []);
  }

  _companiesCache = out;
  return out;
}

export async function fetchCompanyBySlug(slug: string) {
  const all = await fetchAllCompanies();
  return all.find((c) => (c.slug ?? c?.attributes?.slug) === slug);
}

export async function getCompanySlugs(): Promise<string[]> {
  const all = await fetchAllCompanies();
  return all
    .map((c) => c.slug ?? c?.attributes?.slug)
    .filter(Boolean);
}
