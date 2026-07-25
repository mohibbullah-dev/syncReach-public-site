import { useMemo, useState } from "react";
import { ArrowRight, Check, Minus, Plus } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import {
  type PricingPlan,
  type QuoteValues,
  buildQuoteMessage,
  computeCustomPrice,
  defaultCustomConfig,
  formatLeverValue,
  formatMoney,
  initQuoteValues,
  QUOTE_STORAGE_KEY,
} from "@/lib/pricing-quote";

type Props = {
  plan: PricingPlan;
};

export function CustomPricingCard({ plan }: Props) {
  const config = useMemo(
    () => plan.customConfig ?? defaultCustomConfig(),
    [plan.customConfig],
  );
  const [values, setValues] = useState<QuoteValues>(() =>
    initQuoteValues(plan.customConfig ?? defaultCustomConfig()),
  );

  const estimate = useMemo(() => computeCustomPrice(config, values), [config, values]);

  const setNumber = (id: string, next: number, min: number, max: number, step: number) => {
    const s = step > 0 ? step : 1;
    const clamped = Math.min(max, Math.max(min, next));
    const snapped = min + Math.round((clamped - min) / s) * s;
    setValues((v) => ({ ...v, [id]: snapped }));
  };

  const onGetQuote = () => {
    const message = buildQuoteMessage(plan.name, config, values, estimate);
    try {
      sessionStorage.setItem(QUOTE_STORAGE_KEY, message);
    } catch {
      /* ignore */
    }
    const el = document.getElementById("contact");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      window.dispatchEvent(new CustomEvent("syncreach:quote-prefill"));
    } else {
      window.location.hash = "contact";
    }
  };

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

      <div className="relative mt-4 flex items-end gap-1.5">
        <span className="text-3xl font-bold tracking-tight tabular-nums sm:text-4xl">
          {formatMoney(estimate, config.currencyPrefix)}
        </span>
        <span className="mb-1 text-xs text-muted-foreground">{config.unitLabel}</span>
      </div>
      {config.estimateNote ? (
        <p className="relative mt-1 text-[11px] leading-snug text-muted-foreground">
          {config.estimateNote}
        </p>
      ) : null}

      <div className="relative mt-4 space-y-2.5 rounded-xl border border-border/80 bg-muted/30 p-3">
        {config.levers.map((lever) => {
          const raw = values[lever.id];
          if (lever.kind === "toggle") {
            const on = Boolean(raw);
            return (
              <div key={lever.id} className="flex items-center justify-between gap-2">
                <div className="min-w-0">
                  <div className="truncate text-xs font-medium sm:text-sm">{lever.label}</div>
                  <div className="text-[11px] text-muted-foreground">
                    +{formatMoney(lever.unitPrice, config.currencyPrefix)}
                  </div>
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={on}
                  onClick={() => setValues((v) => ({ ...v, [lever.id]: !on }))}
                  className={`relative h-6 w-10 shrink-0 rounded-full transition ${
                    on ? "bg-brand" : "bg-muted-foreground/25"
                  }`}
                >
                  <span
                    className={`absolute top-0.5 h-5 w-5 rounded-full bg-background shadow transition ${
                      on ? "left-4" : "left-0.5"
                    }`}
                  />
                </button>
              </div>
            );
          }

          const num = typeof raw === "number" ? raw : Number(raw) || lever.min;

          if (lever.kind === "slider") {
            return (
              <div key={lever.id} className="space-y-1.5">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-medium sm:text-sm">{lever.label}</span>
                  <span className="text-xs font-semibold tabular-nums text-brand sm:text-sm">
                    {formatLeverValue(lever, num)}
                  </span>
                </div>
                <Slider
                  min={lever.min}
                  max={lever.max}
                  step={lever.step}
                  value={[num]}
                  onValueChange={([v]) =>
                    setNumber(lever.id, v ?? lever.min, lever.min, lever.max, lever.step)
                  }
                />
              </div>
            );
          }

          return (
            <div key={lever.id} className="flex items-center justify-between gap-2">
              <span className="text-xs font-medium sm:text-sm">{lever.label}</span>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  aria-label={`Decrease ${lever.label}`}
                  disabled={num <= lever.min}
                  onClick={() =>
                    setNumber(lever.id, num - lever.step, lever.min, lever.max, lever.step)
                  }
                  className="flex h-7 w-7 items-center justify-center rounded-md border border-border bg-background text-foreground transition hover:border-brand/40 disabled:opacity-40"
                >
                  <Minus className="h-3 w-3" />
                </button>
                <span className="min-w-[2rem] text-center text-xs font-semibold tabular-nums sm:text-sm">
                  {formatLeverValue(lever, num)}
                </span>
                <button
                  type="button"
                  aria-label={`Increase ${lever.label}`}
                  disabled={num >= lever.max}
                  onClick={() =>
                    setNumber(lever.id, num + lever.step, lever.min, lever.max, lever.step)
                  }
                  className="flex h-7 w-7 items-center justify-center rounded-md border border-border bg-background text-foreground transition hover:border-brand/40 disabled:opacity-40"
                >
                  <Plus className="h-3 w-3" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <button
        type="button"
        onClick={onGetQuote}
        className={`relative mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
          plan.featured
            ? "bg-gradient-brand text-primary-foreground shadow-glow hover:opacity-95"
            : "border border-border bg-card text-foreground group-hover:border-brand/40 group-hover:bg-brand/5"
        }`}
      >
        {plan.cta || "Get this quote"} <ArrowRight className="h-4 w-4" />
      </button>

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
