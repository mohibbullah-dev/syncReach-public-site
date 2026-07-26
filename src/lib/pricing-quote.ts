/** Shared pricing / custom quote types + calculator */

export type PlanType = "fixed" | "custom";

export type CustomLeverKind = "slider" | "stepper" | "toggle";

export type CustomLever = {
  id: string;
  label: string;
  kind: CustomLeverKind;
  min: number;
  max: number;
  step: number;
  unitPrice: number;
};

export type CustomConfig = {
  basePrice: number;
  currencyPrefix: string;
  unitLabel: string;
  roundTo: number;
  estimateNote: string;
  defaults: Record<string, number | boolean>;
  levers: CustomLever[];
};

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
  planType?: PlanType;
  customConfig?: CustomConfig | null;
};

export function defaultCustomConfig(): CustomConfig {
  return {
    basePrice: 1500,
    currencyPrefix: "$",
    unitLabel: "/ month",
    roundTo: 50,
    estimateNote: "Estimated monthly · final quote confirmed by team",
    defaults: { emails: 50000, inboxes: 10, seats: 3, linkedin: false },
    levers: [
      {
        id: "emails",
        label: "Emails / month",
        kind: "slider",
        min: 25000,
        max: 200000,
        step: 25000,
        unitPrice: 0.008,
      },
      {
        id: "inboxes",
        label: "Warmed inboxes",
        kind: "stepper",
        min: 5,
        max: 50,
        step: 1,
        unitPrice: 40,
      },
      {
        id: "seats",
        label: "Seats",
        kind: "stepper",
        min: 1,
        max: 20,
        step: 1,
        unitPrice: 75,
      },
      {
        id: "linkedin",
        label: "LinkedIn outreach",
        kind: "toggle",
        min: 0,
        max: 1,
        step: 1,
        unitPrice: 300,
      },
    ],
  };
}

export type QuoteValues = Record<string, number | boolean>;

export function initQuoteValues(config: CustomConfig): QuoteValues {
  const values: QuoteValues = {};
  for (const lever of config.levers) {
    const d = config.defaults?.[lever.id];
    if (lever.kind === "toggle") {
      values[lever.id] = typeof d === "boolean" ? d : Boolean(d);
    } else {
      const n = typeof d === "number" ? d : lever.min;
      values[lever.id] = clampStep(n, lever.min, lever.max, lever.step);
    }
  }
  return values;
}

function clampStep(value: number, min: number, max: number, step: number) {
  const s = step > 0 ? step : 1;
  const clamped = Math.min(max, Math.max(min, value));
  const steps = Math.round((clamped - min) / s);
  return min + steps * s;
}

export function computeCustomPrice(config: CustomConfig, values: QuoteValues): number {
  let total = Number(config.basePrice) || 0;
  for (const lever of config.levers) {
    const v = values[lever.id];
    if (lever.kind === "toggle") {
      if (v) total += Number(lever.unitPrice) || 0;
      continue;
    }
    const num = typeof v === "number" ? v : Number(v) || 0;
    total += num * (Number(lever.unitPrice) || 0);
  }
  const roundTo = Number(config.roundTo) > 0 ? Number(config.roundTo) : 1;
  return Math.round(total / roundTo) * roundTo;
}

export function formatMoney(amount: number, prefix = "$") {
  return `${prefix}${amount.toLocaleString("en-US")}`;
}

export function formatLeverValue(lever: CustomLever, value: number | boolean) {
  if (lever.kind === "toggle") return value ? "Yes" : "No";
  const n = typeof value === "number" ? value : Number(value) || 0;
  return n.toLocaleString("en-US");
}

export function buildQuoteMessage(
  planName: string,
  config: CustomConfig,
  values: QuoteValues,
  estimate: number,
) {
  const lines = [
    "Custom quote request:",
    ...config.levers.map(
      (l) => `- ${l.label}: ${formatLeverValue(l, values[l.id] ?? (l.kind === "toggle" ? false : l.min))}`,
    ),
    `- Estimated: ${formatMoney(estimate, config.currencyPrefix)} ${config.unitLabel}`.trim(),
    "",
    `(Plan: ${planName})`,
  ];
  return lines.join("\n");
}

export const QUOTE_STORAGE_KEY = "syncreach_custom_quote_message";

/** True when a plan should render the quote builder (API or seed). */
export function isCustomPricingPlan(plan: Pick<PricingPlan, "planType" | "customConfig" | "badge" | "name" | "price">) {
  if (plan.planType === "custom") return true;
  if (plan.customConfig?.levers?.length) return true;
  const badge = (plan.badge || "").trim().toLowerCase();
  const name = (plan.name || "").trim().toLowerCase();
  const price = (plan.price || "").trim().toLowerCase();
  return badge === "custom" || name === "custom" || price === "custom";
}

/** Ensure custom plans always have a usable config after API load. */
export function normalizePricingPlan(plan: PricingPlan): PricingPlan {
  if (!isCustomPricingPlan(plan)) {
    return { ...plan, planType: plan.planType === "custom" ? "custom" : "fixed" };
  }
  const customConfig =
    plan.customConfig?.levers?.length ? plan.customConfig : defaultCustomConfig();
  return {
    ...plan,
    planType: "custom",
    customConfig,
    price: plan.price?.trim() ? plan.price : "Custom",
  };
}

export function normalizePricingPlans(plans: PricingPlan[]): PricingPlan[] {
  return plans.map(normalizePricingPlan);
}