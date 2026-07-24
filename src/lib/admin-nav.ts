/** Detect Admin / SuperAdmin session for public-site header CTA. */

const TOKEN_KEY = "syncreach_api_token";
const ADMIN_VISIT_KEY = "syncreach_admin_visit";

export function getPortalUrl(path = "/") {
  const base = (import.meta.env.VITE_ADMIN_URL || "http://localhost:8081").replace(/\/$/, "");
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${base}${p}`;
}

function readCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
}

export function getAdminToken(): string | null {
  return readCookie(TOKEN_KEY);
}

/** Remember that this visitor came from the CMS (portal "View public site"). */
export function markAdminVisitFromQuery() {
  if (typeof window === "undefined") return;
  try {
    const params = new URLSearchParams(window.location.search);
    if (params.get("from") === "admin") {
      sessionStorage.setItem(ADMIN_VISIT_KEY, "1");
      params.delete("from");
      const next = `${window.location.pathname}${params.toString() ? `?${params}` : ""}${window.location.hash}`;
      window.history.replaceState({}, "", next);
    }
  } catch {
    /* ignore */
  }
}

export function isAdminVisit(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return sessionStorage.getItem(ADMIN_VISIT_KEY) === "1";
  } catch {
    return false;
  }
}

export type AdminNavState =
  | { visible: false }
  | { visible: true; mode: "dashboard" | "login"; href: string };

/**
 * Show header CTA only for staff:
 * - Logged-in Admin/SuperAdmin → Dashboard
 * - Came from portal (or prior admin visit this tab) but not logged in → Dashboard login
 */
export async function resolveAdminNavState(): Promise<AdminNavState> {
  markAdminVisitFromQuery();

  const apiBase = (import.meta.env.VITE_API_URL || "http://localhost:5000/api").replace(/\/$/, "");
  const token = getAdminToken();

  if (token) {
    try {
      const res = await fetch(`${apiBase}/auth/me`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.ok) {
        const data = await res.json();
        const role = data?.user?.role;
        if (role === "SuperAdmin" || role === "Admin") {
          try {
            sessionStorage.setItem(ADMIN_VISIT_KEY, "1");
          } catch {
            /* ignore */
          }
          return { visible: true, mode: "dashboard", href: getPortalUrl("/") };
        }
      }
    } catch {
      /* fall through */
    }
  }

  if (isAdminVisit()) {
    return { visible: true, mode: "login", href: getPortalUrl("/login") };
  }

  return { visible: false };
}
