// src/lib/strapi.ts
const rawBase = import.meta.env.STRAPI_URL || "";
const base = rawBase.replace(/\/+$/, "");
const token = import.meta.env.STRAPI_TOKEN;

function authHeaders() {
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function strapi(path: string, init: RequestInit = {}) {
  // ✅ same join logic you had
  const url = `${base}${path.startsWith("/") ? path : `/${path}`}`;
  const headers = { ...(init.headers as any), ...authHeaders() };

  // ✅ read the body ONCE to avoid “Body has already been read”
  const res = await fetch(url, { ...init, headers });
  const raw = await res.text();

  let data: any = null;
  try { data = raw ? JSON.parse(raw) : null; } catch { /* non-JSON */ }

  if (!res.ok) {
    const detail =
      data?.error?.message ||
      data?.message ||
      raw?.slice(0, 500);
    throw new Error(`Strapi ${res.status} for ${path} :: ${detail}`);
  }

  return data;
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
