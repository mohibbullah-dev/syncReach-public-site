import { ArrowRight, Check } from "lucide-react";

import type { PricingPlan } from "@/lib/pricing-quote";

type Props = {
  plan: PricingPlan;
};

export function CustomPricingCard({ plan }: Props) {
  return (
    <div
      className={`group relative flex flex-col overflow-hidden rounded-[12px] bg-background p-5 transition duration-300 hover:-translate-y-1 sm:p-6 ${
        plan.featured
          ? "border-2 border-brand shadow-glow ring-4 ring-brand/10"
          : "border border-border shadow-elevate hover:border-brand/30 hover:shadow-glow"
      }`}
    >
      {plan.featured ? (
        <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-brand/10 to-transparent" />
      ) : null}

      <div
        className={`relative inline-flex w-fit rounded-[12px] px-2.5 py-0.5 text-[10px] font-semibold tracking-wider ${
          plan.featured
            ? "bg-brand text-primary-foreground shadow-sm"
            : "bg-muted text-muted-foreground"
        }`}
      >
        {plan.badge}
      </div>

      <h3 className="relative mt-3 text-xl font-bold tracking-tight">{plan.name}</h3>
      <p className="relative mt-1 text-sm leading-snug text-muted-foreground">{plan.desc}</p>

      <div className="relative mt-6">
        <span className="text-4xl font-bold tracking-tight">Custom</span>
      </div>
      <div className="relative mt-3">
        <span className="inline-flex rounded-[12px] bg-muted px-3 py-1 text-xs font-semibold text-foreground/80">
          Based on your scope &amp; volume
        </span>
        <p className="mt-2 text-xs text-muted-foreground">
          Flexible terms · Dedicated account director
        </p>
      </div>

      <a
        href="#contact"
        className={`relative mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
          plan.featured
            ? "bg-gradient-brand text-primary-foreground shadow-glow hover:opacity-95"
            : "border border-border bg-card text-foreground group-hover:border-brand/40 group-hover:bg-brand/5"
        }`}
      >
        Talk to Us <ArrowRight className="h-4 w-4" />
      </a>

      {plan.features?.length ? (
        <div className="relative mt-4 border-t border-border pt-3">
          <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
            What&apos;s included
          </div>
          <ul className="space-y-1.5">
            {plan.features.map((f) => (
              <li key={f} className="flex items-start gap-2 text-xs text-foreground/80 sm:text-sm">
                <span className="mt-0.5 flex h-3.5 w-3.5 flex-shrink-0 items-center justify-center rounded-full bg-brand">
                  <Check className="h-2 w-2 text-primary-foreground" strokeWidth={3} />
                </span>
                <span>{f}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
