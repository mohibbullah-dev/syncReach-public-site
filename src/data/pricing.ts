/** Seed pricing plans — API overrides when available. */

export type {
  PricingPlan,
  CustomConfig,
  CustomLever,
  PlanType,
} from "@/lib/pricing-quote";
export { defaultCustomConfig } from "@/lib/pricing-quote";

import type { PricingPlan } from "@/lib/pricing-quote";
import { defaultCustomConfig } from "@/lib/pricing-quote";

export const pricingPlans: PricingPlan[] = [
  {
    id: "p1",
    badge: "STARTER",
    name: "Starter",
    desc: "For founders launching outbound and validating their offer.",
    price: "$500",
    unit: "/ month",
    extrasBadge: "",
    extrasNote: "",
    features: [
      "5,000 emails / mo",
      "5 warmed inboxes",
      "Email copywriter",
      "Lead finder (2k credits)",
      "Basic analytics",
      "Email support",
    ],
    cta: "Start with Starter",
    featured: false,
    sortOrder: 1,
    published: true,
    planType: "fixed",
  },
  {
    id: "p2",
    badge: "MOST POPULAR",
    name: "Growth",
    desc: "For growing teams booking qualified meetings every week.",
    price: "$1,000",
    unit: "/ month",
    extrasBadge: "Unlimited warmed inboxes",
    extrasNote: "Best value for scaling outbound teams",
    features: [
      "25,000 emails / mo",
      "Unlimited warmed inboxes",
      "Personalization + LinkedIn",
      "Multi-channel sequences",
      "10k lead credits",
      "CRM integrations",
      "Priority support",
    ],
    cta: "Choose Growth",
    featured: true,
    sortOrder: 2,
    published: true,
    planType: "fixed",
  },
  {
    id: "p3",
    badge: "CUSTOM",
    name: "Custom",
    desc: "Build your own outbound stack. Pick volume, seats, and add ons.",
    price: "Custom",
    unit: "/ month",
    extrasBadge: "",
    extrasNote: "",
    features: [
      "Flexible email volume",
      "Warmed inboxes on demand",
      "Seats for your team",
      "Optional LinkedIn outreach",
      "Dedicated success support",
    ],
    cta: "Get this quote",
    featured: false,
    sortOrder: 3,
    published: true,
    planType: "custom",
    customConfig: defaultCustomConfig(),
  },
];
