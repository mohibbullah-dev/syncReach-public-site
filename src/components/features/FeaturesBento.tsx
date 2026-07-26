import {
  ArrowRight,
  BrainCircuit,
  CalendarCheck,
  FlaskConical,
  Mails,
  MessageSquareReply,
  UserSearch,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { SectionHeader } from "@/components/layout/SectionHeader";

const features = [
  {
    title: "ICP Research & Offer Strategy",
    desc: "We identify your ideal customers, research competitors, and craft compelling offers with clear messaging that drives qualified conversations from day one.",
    tag: "Step 1",
    icon: UserSearch,
  },
  {
    title: "Targeted List Building & AI Personalization",
    desc: "We build verified prospect lists, enrich data with AI, and personalize every message based on each company's business, needs, and fit.",
    tag: "Step 2",
    icon: BrainCircuit,
  },
  {
    title: "Outreach Infrastructure & Campaign Launch",
    desc: "We configure secure email infrastructure, then launch personalized multi-step Email and LinkedIn campaigns that consistently reach decision-makers.",
    tag: "Step 3",
    icon: Mails,
  },
  {
    title: "Testing & Performance Optimization",
    desc: "We continuously test ICPs, offers, subject lines, copy, CTAs, and channels to improve reply rates, meetings, and overall campaign performance.",
    tag: "Step 4",
    icon: FlaskConical,
  },
  {
    title: "Reply Management & CRM Automation",
    desc: "We manage replies, nurture prospects, automate follow-ups, integrate with your CRM, and ensure every qualified opportunity receives timely attention.",
    tag: "Step 5",
    icon: MessageSquareReply,
  },
  {
    title: "Qualified Appointment Booking",
    desc: "Our focus is simple: fill your calendar with qualified decision-makers who match your ICP and are genuinely interested in your solution.",
    tag: "Step 6",
    icon: CalendarCheck,
  },
] as const;

export function FeaturesBento() {
  return (
    <section id="features" className="section-y relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,oklch(0.78_0.06_245_/_0.16),transparent_55%)]" />

      <div className="container-page relative">
        <SectionHeader
          eyebrow="Why SyncReach"
          title={
            <>
              Everything you need to fill
              <br />
              your pipeline <span className="text-gradient-brand">in one place</span>.
            </>
          }
          description="Stop stitching together 6 tools. SyncReach is your all in one outbound engine."
        />

        <div className="section-stack grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <article
                key={feature.title}
                className={cn(
                  "group flex flex-col rounded-[12px] border border-border/70 bg-white p-7",
                  "shadow-[0_10px_36px_-22px_oklch(0.16_0.03_260_/_0.3)] transition duration-300",
                  "hover:-translate-y-0.5 hover:border-brand/30 hover:shadow-[0_18px_44px_-26px_oklch(0.16_0.03_260_/_0.38)]",
                )}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-[12px] bg-gradient-brand text-primary-foreground shadow-glow">
                    <Icon className="h-5 w-5" strokeWidth={2} />
                  </div>
                  <span className="rounded-[12px] bg-brand/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-brand">
                    {feature.tag}
                  </span>
                </div>

                <h3 className="mt-6 text-xl font-semibold tracking-tight text-foreground">
                  {feature.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {feature.desc}
                </p>

                <a
                  href="#results"
                  className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-brand transition hover:gap-2"
                >
                  How it works <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
