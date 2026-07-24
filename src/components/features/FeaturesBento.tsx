import {
  ArrowRight,
  BarChart3,
  Inbox,
  PenLine,
  ShieldCheck,
  Target,
  Waypoints,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { SectionHeader } from "@/components/layout/SectionHeader";

const features = [
  {
    title: "Smart Lead Finder",
    desc: "Pull hyper-targeted B2B prospects with verified emails from 400M+ contacts in seconds.",
    tag: "Prospecting",
    icon: Target,
  },
  {
    title: "Personalization at Scale",
    desc: "Every email is tailored using your prospect's site, LinkedIn, and recent activity — at scale.",
    tag: "Copy",
    icon: PenLine,
  },
  {
    title: "Unlimited Inboxes",
    desc: "Rotate across unlimited warmed-up mailboxes to hit the inbox, not the spam folder.",
    tag: "Sending",
    icon: Inbox,
  },
  {
    title: "Auto Warm-Up",
    desc: "Our warmup network keeps deliverability sky-high automatically, 24/7.",
    tag: "Inbox health",
    icon: ShieldCheck,
  },
  {
    title: "Multi-Channel Sequences",
    desc: "Blend email, LinkedIn, and SMS steps into one seamless outreach flow.",
    tag: "Workflow",
    icon: Waypoints,
  },
  {
    title: "Reply-First Analytics",
    desc: "Real dashboards that show what's booking meetings — not just open rates.",
    tag: "Reporting",
    icon: BarChart3,
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
              Everything you need to fill your pipeline —{" "}
              <span className="text-gradient-brand">in one place</span>.
            </>
          }
          description="Stop stitching together 6 tools. SyncReach is your all-in-one outbound engine."
        />

        <div className="section-stack grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <article
                key={feature.title}
                className={cn(
                  "group flex flex-col rounded-[1.75rem] border border-border/70 bg-white p-7",
                  "shadow-[0_10px_36px_-22px_oklch(0.16_0.03_260_/_0.3)] transition duration-300",
                  "hover:-translate-y-0.5 hover:border-brand/30 hover:shadow-[0_18px_44px_-26px_oklch(0.16_0.03_260_/_0.38)]",
                )}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-brand text-primary-foreground shadow-glow">
                    <Icon className="h-5 w-5" strokeWidth={2} />
                  </div>
                  <span className="rounded-full bg-brand/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-brand">
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
