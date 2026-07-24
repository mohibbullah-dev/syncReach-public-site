/**
 * Public website content helpers.
 * Until the MERN API is live, serve seed data shipped with this app.
 * Later: fetch from VITE_CMS_API_URL.
 */

import { sanitizeProfileImage } from "@/lib/profile-image";
import { galleryItems, type GalleryItem } from "@/data/gallery";
import { reviews, type Review } from "@/data/reviews";
import { teamMembers, type TeamMember } from "@/data/team";

const apiBase = () =>
  (typeof import.meta !== "undefined" && import.meta.env?.VITE_CMS_API_URL
    ? String(import.meta.env.VITE_CMS_API_URL).replace(/\/$/, "")
    : "") || "";

export async function fetchPublishedReviews(): Promise<Review[]> {
  const base = apiBase();
  if (base) {
    try {
      const res = await fetch(`${base}/reviews`);
      if (res.ok) {
        const list = (await res.json()) as Review[];
        return list.map((r) => ({ ...r, avatar: sanitizeProfileImage(r.avatar) }));
      }
    } catch {
      /* fall through to seed */
    }
  }
  return reviews.map((r) => ({ ...r, avatar: sanitizeProfileImage(r.avatar) }));
}

export function getFeaturedReviewsSync(): Review[] {
  return reviews
    .map((r) => ({ ...r, avatar: sanitizeProfileImage(r.avatar) }))
    .filter((r) => r.featured);
}

export function getPublishedGallerySync(): GalleryItem[] {
  return galleryItems
    .filter((g) => g.published)
    .sort((a, b) => a.sortOrder - b.sortOrder);
}

export function getPublishedTeamSync(): TeamMember[] {
  return teamMembers
    .filter((m) => m.published)
    .sort((a, b) => a.sortOrder - b.sortOrder);
}
