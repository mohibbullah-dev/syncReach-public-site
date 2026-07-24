/** Seed pricing plans — API overrides when available. */

export type PricingPlan = {
  id: string;
  badge: string;
  name: string;
  desc: string;
  price: string;
  unit: string;
  extrasBadge: string;
  extrasNote: string;
  features: string[];
  cta: string;
  featured: boolean;
  sortOrder: number;
  published: boolean;
};

export const pricingPlans: PricingPlan[] = [
  {
    id: "p1",
    badge: "STARTER",
    name: "Starter",
    desc: "For founders launching outbound and validating their offer.",
    price: "$500",
    unit: "/ month",
    extrasBadge: "14-day free trial",
    extrasNote: "No credit card required to start",
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
  },
  {
    id: "p3",
    badge: "SCALE",
    name: "Scale",
    desc: "For agencies and outbound-heavy revenue teams.",
    price: "$2,000",
    unit: "/ month",
    extrasBadge: "Dedicated success manager",
    extrasNote: "Custom SLAs and security review included",
    features: [
      "Unlimited emails",
      "Unlimited seats & inboxes",
      "Dedicated deliverability manager",
      "Custom playbook training",
      "Slack support",
      "SLA + security review",
    ],
    cta: "Talk to sales",
    featured: false,
    sortOrder: 3,
    published: true,
  },
];
