// src/lib/strapi.ts
const rawBase = import.meta.env.STRAPI_URL || "";
const base = rawBase.replace(/\/+$/, "");
const token = import.meta.env.STRAPI_TOKEN;

function authHeaders() {
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function strapi(path: string, init: RequestInit = {}) {
  const url = `${base}${path.startsWith("/") ? path : `/${path}`}`;
  const res = await fetch(url, { ...init, headers: { ...(init.headers || {}), ...authHeaders() } });
  if (!res.ok) {
    let detail = "";
    try {
      const body = await res.json();
      detail = body?.error?.message || JSON.stringify(body);
    } catch { detail = await res.text(); }
    throw new Error(`Strapi ${res.status} for ${path} :: ${detail}`);
  }
  return res.json();
}

/** Works with Strapi v4 (data.attributes) and v5 (data) */
export function unwrap<T = any>(json: any): T | null {
  const d = json?.data;
  if (!d) return null;
  if (typeof d === "object" && "attributes" in d && d.attributes) return d.attributes as T; // v4
  return d as T; // v5
}

export function mediaUrl(m?: string) {
  if (!m) return "";
  return m.startsWith("http") ? m : `${base}${m}`;
}
