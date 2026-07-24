/** Public site API helper — reads published content from MERN backend. */
const API_URL = (import.meta.env.VITE_API_URL || "http://localhost:5000/api").replace(/\/$/, "");

export function getApiUrl(path = "") {
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${API_URL}${p}`;
}

export async function apiFetch(path, options = {}) {
  const res = await fetch(getApiUrl(path), {
    headers: { "Content-Type": "application/json", ...(options.headers || {}) },
    ...options,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.message || `Request failed (${res.status})`);
  }
  return data;
}

export async function fetchPublicReviews(params = {}) {
  const q = new URLSearchParams(params).toString();
  return apiFetch(`/reviews/public${q ? `?${q}` : ""}`);
}

export async function fetchPublicGallery() {
  return apiFetch("/gallery/public");
}

export async function fetchPublicTeam() {
  return apiFetch("/team/public");
}

export async function fetchPublicPricing() {
  return apiFetch("/pricing/public");
}

export async function submitContactMessage(payload) {
  return apiFetch("/contact", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}
