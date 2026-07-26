import { Check, ChevronRight, Lock, Shield, Zap } from "lucide-react";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { cn } from "@/lib/utils";

type StepTheme = {
  num: string;
  badge: string;
  check: string;
  border: string;
  soft: string;
  iconBg: string;
};

const themes = {
  blue: {
    num: "text-[oklch(0.52_0.20_255)]",
    badge: "bg-[oklch(0.55_0.18_255)]/12 text-[oklch(0.45_0.18_255)]",
    check: "bg-[oklch(0.55_0.18_255)]",
    border: "border-b-[3px] border-b-[oklch(0.55_0.18_255)]",
    soft: "bg-[oklch(0.55_0.14_255)]/10",
    iconBg: "bg-[oklch(0.55_0.18_255)]/12 text-[oklch(0.48_0.18_255)]",
  },
  violet: {
    num: "text-[oklch(0.52_0.18_300)]",
    badge: "bg-[oklch(0.55_0.16_300)]/12 text-[oklch(0.45_0.16_300)]",
    check: "bg-[oklch(0.55_0.16_300)]",
    border: "border-b-[3px] border-b-[oklch(0.55_0.16_300)]",
    soft: "bg-[oklch(0.55_0.14_300)]/10",
    iconBg: "bg-[oklch(0.55_0.16_300)]/12 text-[oklch(0.48_0.16_300)]",
  },
  green: {
    num: "text-[oklch(0.52_0.14_155)]",
    badge: "bg-[oklch(0.55_0.13_155)]/12 text-[oklch(0.42_0.12_155)]",
    check: "bg-[oklch(0.55_0.13_155)]",
    border: "border-b-[3px] border-b-[oklch(0.55_0.13_155)]",
    soft: "bg-[oklch(0.55_0.12_155)]/10",
    iconBg: "bg-[oklch(0.55_0.13_155)]/12 text-[oklch(0.45_0.12_155)]",
  },
} as const;

function IlluTargeting() {
  return (
    <svg viewBox="0 0 200 140" className="h-full w-full" aria-hidden>
      <circle cx="100" cy="72" r="48" fill="oklch(0.55 0.14 255 / 0.08)" />
      <circle cx="100" cy="72" r="34" fill="none" stroke="oklch(0.55 0.18 255)" strokeWidth="1.5" opacity="0.35" />
      <circle cx="100" cy="72" r="20" fill="none" stroke="oklch(0.55 0.18 255)" strokeWidth="1.5" opacity="0.5" />
      <circle cx="100" cy="72" r="16" fill="oklch(0.55 0.18 255)" />
      <circle cx="100" cy="68" r="5" fill="white" />
      <path d="M92 78c3.5-4.5 8-6.5 8-6.5s4.5 2 8 6.5" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="58" cy="42" r="12" fill="white" stroke="oklch(0.55 0.16 255)" strokeWidth="1.5" />
      <circle cx="58" cy="40" r="4" fill="oklch(0.55 0.16 255)" />
      <circle cx="148" cy="40" r="12" fill="white" stroke="oklch(0.62 0.14 240)" strokeWidth="1.5" />
      <circle cx="148" cy="38" r="4" fill="oklch(0.62 0.14 240)" />
      <circle cx="150" cy="100" r="12" fill="white" stroke="oklch(0.5 0.12 255)" strokeWidth="1.5" />
      <circle cx="150" cy="98" r="4" fill="oklch(0.5 0.12 255)" />
      <circle cx="56" cy="102" r="11" fill="white" stroke="oklch(0.58 0.12 250)" strokeWidth="1.5" />
      <circle cx="56" cy="100" r="3.5" fill="oklch(0.58 0.12 250)" />
    </svg>
  );
}

function IlluExecution() {
  return (
    <svg viewBox="0 0 200 140" className="h-full w-full" aria-hidden>
      <rect x="70" y="28" width="70" height="88" rx="12" fill="white" stroke="oklch(0.55 0.14 300)" strokeWidth="1.5" />
      <rect x="82" y="44" width="46" height="6" rx="3" fill="oklch(0.55 0.12 300 / 0.25)" />
      <rect x="82" y="56" width="36" height="6" rx="3" fill="oklch(0.55 0.12 300 / 0.18)" />
      <rect x="82" y="68" width="42" height="6" rx="3" fill="oklch(0.55 0.12 300 / 0.14)" />
      <g transform="translate(36 48) rotate(-18)">
        <rect width="54" height="38" rx="8" fill="white" stroke="oklch(0.55 0.16 300)" strokeWidth="1.4" />
        <path d="M4 10l23 14 23-14" fill="none" stroke="oklch(0.55 0.16 300)" strokeWidth="1.5" />
      </g>
      <g transform="translate(128 74) rotate(14)">
        <rect width="54" height="38" rx="8" fill="oklch(0.55 0.16 300)" />
        <path d="M8 12l19 12 19-12" fill="none" stroke="white" strokeWidth="1.6" />
      </g>
    </svg>
  );
}

function IlluMeetings() {
  return (
    <svg viewBox="0 0 200 140" className="h-full w-full" aria-hidden>
      <rect x="58" y="30" width="84" height="78" rx="12" fill="white" stroke="oklch(0.55 0.12 155)" strokeWidth="1.5" />
      <rect x="58" y="30" width="84" height="22" rx="12" fill="oklch(0.55 0.13 155)" />
      <rect x="58" y="42" width="84" height="10" fill="oklch(0.55 0.13 155)" />
      <circle cx="78" cy="28" r="4" fill="oklch(0.45 0.1 155)" />
      <circle cx="122" cy="28" r="4" fill="oklch(0.45 0.1 155)" />
      <rect x="72" y="62" width="14" height="12" rx="3" fill="oklch(0.55 0.1 155 / 0.2)" />
      <rect x="93" y="62" width="14" height="12" rx="3" fill="oklch(0.55 0.1 155 / 0.2)" />
      <rect x="114" y="62" width="14" height="12" rx="3" fill="oklch(0.55 0.13 155)" />
      <path d="M117 66l3 3 6-7" fill="none" stroke="white" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="148" cy="92" r="18" fill="oklch(0.55 0.13 155)" />
      <path d="M141 92l5 5 10-11" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const steps: Array<{
  n: string;
  tip: string;
  title: string;
  desc: string;
  points: string[];
  theme: StepTheme;
  art: React.ReactNode;
}> = [
  {
    n: "01",
    tip: "Targeting",
    title: "Sync your ICP",
    desc: "Tell us who you sell to. We build a lookalike list of verified decision-makers.",
    points: ["Verified decision-makers", "Smart filters & lookalikes", "Always up-to-date"],
    theme: themes.blue,
    art: <IlluTargeting />,
  },
  {
    n: "02",
    tip: "Execution",
    title: "Launch outreach sequences",
    desc: "We write, personalize, and send from warmed up inboxes, no spam, all inbox.",
    points: ["Personalized at scale", "Warmed-up inboxes", "Deliverability built-in"],
    theme: themes.violet,
    art: <IlluExecution />,
  },
  {
    n: "03",
    tip: "Meetings",
    title: "Reach booked meetings",
    desc: "Positive replies flow straight into your calendar. Your reps just close.",
    points: ["Replies to meetings", "Calendar integration", "More meetings, less work"],
    theme: themes.green,
    art: <IlluMeetings />,
  },
];

// const bottomItems = [
//   {
//     title: "Built for deliverability",
//     desc: "Warm up and inbox health stay on so your emails land where they should.",
//     icon: Shield,
//     theme: themes.blue,
//   },
//   {
//     title: "Enterprise grade security",
//     desc: "Access controls and safe sending practices for serious outbound teams.",
//     icon: Lock,
//     theme: themes.violet,
//   },
//   {
//     title: "Save time, book more",
//     desc: "Less tool hopping. More time talking to people who already replied.",
//     icon: Zap,
//     theme: themes.green,
//   },
// ];

export function HowItWorks() {
  return (
    <section id="results" className="section-y relative overflow-hidden bg-[oklch(0.985_0.006_250)]">
      <div className="container-page relative">
        <SectionHeader
          width="md"
          eyebrow="How it works"
          title={
            <>
              From cold list to booked call
              <br />
              in <span className="text-[oklch(0.52_0.20_255)]">3 simple steps.</span>
            </>
          }
          description="A simple operating rhythm, no cluttered dashboards, no tool hopping."
        />

        <div className="section-stack relative grid gap-6 md:grid-cols-3">
          {steps.map((step, index) => (
            <div key={step.n} className="relative">
              <article
                className={cn(
                  "flex h-full flex-col rounded-[12px] border border-border/70 bg-white p-7 shadow-[0_14px_40px_-24px_oklch(0.16_0.03_260_/_0.35)]",
                  step.theme.border,
                )}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className={cn("font-display text-5xl font-bold tracking-tight", step.theme.num)}>
                    {step.n}
                  </div>
                  <span
                    className={cn(
                      "rounded-[12px] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em]",
                      step.theme.badge,
                    )}
                  >
                    {step.tip}
                  </span>
                </div>

                <h3 className="mt-5 text-xl font-semibold tracking-tight text-foreground">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.desc}</p>

                <div className={cn("mt-6 flex h-36 items-center justify-center rounded-[12px]", step.theme.soft)}>
                  <div className="h-full w-full max-w-[220px]">{step.art}</div>
                </div>

                <ul className="mt-6 space-y-2.5">
                  {step.points.map((point) => (
                    <li key={point} className="flex items-start gap-2.5 text-sm text-foreground/85">
                      <span
                        className={cn(
                          "mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full",
                          step.theme.check,
                        )}
                      >
                        <Check className="h-2.5 w-2.5 text-white" strokeWidth={3} />
                      </span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </article>

              {index < steps.length - 1 && (
                <div className="pointer-events-none absolute -right-4 top-1/2 z-10 hidden h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-white text-muted-foreground shadow-sm md:flex lg:-right-5">
                  <ChevronRight className="h-4 w-4" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* <div className="mt-10 grid gap-0 overflow-hidden rounded-[12px] border border-border/70 bg-[oklch(0.97_0.008_250)] md:grid-cols-3">
          {bottomItems.map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className={cn(
                  "flex gap-4 px-6 py-6 md:px-7",
                  i > 0 && "border-t border-border/70 md:border-t-0 md:border-l",
                )}
              >
                <div
                  className={cn(
                    "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl",
                    item.theme.iconBg,
                  )}
                >
                  <Icon className="h-5 w-5" strokeWidth={2} />
                </div>
                <div>
                  <div className="font-semibold text-foreground">{item.title}</div>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div> */}
      </div>
    </section>
  );
}
