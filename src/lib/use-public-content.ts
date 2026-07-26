import { useEffect, useState } from "react";

import {
  fetchPublicFaq,
  fetchPublicGallery,
  fetchPublicPricing,
  fetchPublicReviews,
  fetchPublicTeam,
} from "@/lib/api";
import { faqItems as seedFaq, type FaqItem } from "@/data/faq";
import { galleryItems as seedGallery, type GalleryItem } from "@/data/gallery";
import { pricingPlans as seedPricing, type PricingPlan } from "@/data/pricing";
import { reviews as seedReviews, type Review } from "@/data/reviews";
import { teamMembers as seedTeam, type TeamMember } from "@/data/team";
import { sanitizeProfileImage } from "@/lib/profile-image";
import { normalizePricingPlans } from "@/lib/pricing-quote";

function withFallback<T>(promise: Promise<T>, fallback: T): Promise<T> {
  return promise.catch((err) => {
    console.warn("API unavailable, using seed data:", err);
    return fallback;
  });
}

export function usePublicReviews(opts?: { featuredOnly?: boolean }) {
  const [items, setItems] = useState<Review[]>(() =>
    seedReviews
      .map((r) => ({ ...r, avatar: sanitizeProfileImage(r.avatar) }))
      .filter((r) => (opts?.featuredOnly ? r.featured : true)),
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    void withFallback(
      fetchPublicReviews(opts?.featuredOnly ? { featured: "true" } : {}).then((list) =>
        (list as Review[]).map((r) => ({
          ...r,
          type: (r.type as string) === "audio" ? "image" : r.type,
          avatar: sanitizeProfileImage(r.avatar),
        })),
      ),
      seedReviews
        .map((r) => ({ ...r, avatar: sanitizeProfileImage(r.avatar) }))
        .filter((r) => (opts?.featuredOnly ? r.featured : true)),
    ).then((list) => {
      if (!cancelled) {
        setItems(list);
        setLoading(false);
      }
    });
    return () => {
      cancelled = true;
    };
  }, [opts?.featuredOnly]);

  return { items, loading };
}

export function usePublicGallery() {
  const [items, setItems] = useState<GalleryItem[]>(() =>
    seedGallery.filter((g) => g.published).sort((a, b) => a.sortOrder - b.sortOrder),
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    void withFallback(
      fetchPublicGallery() as Promise<GalleryItem[]>,
      seedGallery.filter((g) => g.published).sort((a, b) => a.sortOrder - b.sortOrder),
    ).then((list) => {
      if (!cancelled) {
        setItems(list.filter((g) => g.published !== false).sort((a, b) => a.sortOrder - b.sortOrder));
        setLoading(false);
      }
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return { items, loading };
}

export function usePublicTeam() {
  const [items, setItems] = useState<TeamMember[]>(() =>
    seedTeam.filter((m) => m.published).sort((a, b) => a.sortOrder - b.sortOrder),
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    void withFallback(
      fetchPublicTeam() as Promise<TeamMember[]>,
      seedTeam.filter((m) => m.published).sort((a, b) => a.sortOrder - b.sortOrder),
    ).then((list) => {
      if (!cancelled) {
        setItems(list.filter((m) => m.published !== false).sort((a, b) => a.sortOrder - b.sortOrder));
        setLoading(false);
      }
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return { items, loading };
}

export function usePublicFaq() {
  const [items, setItems] = useState<FaqItem[]>(() =>
    seedFaq.filter((f) => f.published).sort((a, b) => a.sortOrder - b.sortOrder),
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    void withFallback(
      fetchPublicFaq() as Promise<FaqItem[]>,
      seedFaq.filter((f) => f.published).sort((a, b) => a.sortOrder - b.sortOrder),
    ).then((list) => {
      if (!cancelled) {
        setItems(
          list
            .filter((f) => f.published !== false)
            .sort((a, b) => a.sortOrder - b.sortOrder),
        );
        setLoading(false);
      }
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return { items, loading };
}

export function usePublicPricing() {
  const [items, setItems] = useState<PricingPlan[]>(() =>
    normalizePricingPlans(
      seedPricing.filter((p) => p.published).sort((a, b) => a.sortOrder - b.sortOrder),
    ),
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    void withFallback(
      fetchPublicPricing() as Promise<PricingPlan[]>,
      seedPricing.filter((p) => p.published).sort((a, b) => a.sortOrder - b.sortOrder),
    ).then((list) => {
      if (!cancelled) {
        setItems(
          normalizePricingPlans(
            list
              .filter((p) => p.published !== false)
              .sort((a, b) => a.sortOrder - b.sortOrder),
          ),
        );
        setLoading(false);
      }
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return { items, loading };
}
