import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowRight, Check, Mail, Phone, MapPin, Sparkles,
  TrendingUp, Users, Inbox, Facebook, Linkedin,
  Plus, Minus,
} from "lucide-react";
import costOfWaitingUrl from "@/assets/cost-of-waiting.png";
import { TestimonialsMarquee } from "@/components/reviews/TestimonialsMarquee";
import { GallerySection } from "@/components/gallery/GallerySection";
import { FeaturesBento } from "@/components/features/FeaturesBento";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { usePublicTeam } from "@/lib/use-public-content";


export const Route = createFileRoute("/")({
  component: LandingPage,
});

function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Hero />
      <FeaturesBento />
      <HowItWorks />
      <TestimonialsMarquee />
      <GallerySection />
      <Pricing />
      <Team />
      <Contact />
      <FAQ />
      <SiteFooter />
    </div>
  );
}

/* ---------- HERO (Attention) ---------- */
function Hero() {
  return (
    <section id="top" className="relative section-y-hero bg-hero-glow">
      <div className="container-page grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card/50 px-3 py-1.5 text-xs font-medium backdrop-blur">
            <Sparkles className="h-3.5 w-3.5 text-brand-glow" />
            <span className="text-muted-foreground">B2B cold outreach · Built for 2026</span>
          </div>
          <h1 className="text-4xl font-bold leading-[1.05] tracking-tight md:text-6xl lg:text-7xl">
            Cold outreach that <span className="text-gradient-brand">books meetings</span> while you sleep.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
            SyncReach finds your ideal prospects, warms up your inboxes, personalizes every email, and delivers reply-ready conversations to your calendar. Sync today, reach tomorrow.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#pricing" className="inline-flex items-center gap-2 rounded-xl bg-gradient-brand px-6 py-3.5 font-medium text-primary-foreground shadow-glow transition hover:opacity-95">
              Start booking meetings <ArrowRight className="h-4 w-4" />
            </a>
            <a href="#features" className="inline-flex items-center gap-2 rounded-xl border border-border bg-card/40 px-6 py-3.5 font-medium backdrop-blur transition hover:bg-card">
              See how it works
            </a>
          </div>
        </div>

        {/* Hero visual — Cost of Waiting campaign */}
        <div className="relative">
          <div className="absolute -inset-8 bg-gradient-brand opacity-25 blur-3xl rounded-full" />
          <div className="relative animate-float">
            <img
              src={costOfWaitingUrl}
              alt="The cost of waiting — every day you delay, opportunities move on"
              className="w-full max-w-lg mx-auto rounded-3xl shadow-elevate ring-1 ring-white/10"
            />
          </div>
          <div className="absolute -left-4 top-8 hidden md:block rounded-2xl border border-border bg-card/90 backdrop-blur px-4 py-3 shadow-elevate">
            <div className="flex items-center gap-2 text-xs text-muted-foreground"><Inbox className="w-3.5 h-3.5 text-brand-glow" /> New reply</div>
            <div className="text-sm font-medium mt-1">"Let's book a call this week."</div>
          </div>
          <div className="absolute -right-2 bottom-6 hidden md:block rounded-2xl border border-border bg-card/90 backdrop-blur px-4 py-3 shadow-elevate">
            <div className="flex items-center gap-2 text-xs text-muted-foreground"><TrendingUp className="w-3.5 h-3.5 text-brand-glow" /> Reply rate</div>
            <div className="text-2xl font-bold text-gradient-brand">+312%</div>
          </div>
        </div>

      </div>
    </section>
  );
}

/* ---------- ACTION: PRICING ---------- */
function Pricing() {
  const plans = [
    {
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
    },
    {
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
    },
    {
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
    },
  ];

  return (
    <section id="pricing" className="section-y bg-card/30">
      <div className="container-page">
        <SectionHeader
          align="center"
          width="md"
          eyebrow="Simple pricing"
          title="Pick a plan. Book meetings this week."
          description="Every plan includes a 14-day free trial. No credit card required."
        />

        <div className="section-stack grid items-stretch gap-6 md:grid-cols-3">
          {plans.map((p) => (
            <div
              key={p.name}
              className={`relative flex flex-col rounded-3xl bg-background p-8 shadow-elevate ${
                p.featured
                  ? "border-2 border-brand shadow-glow"
                  : "border border-border"
              }`}
            >
              <div
                className={`inline-flex w-fit rounded-full px-3 py-1 text-[11px] font-semibold tracking-wider ${
                  p.featured
                    ? "bg-brand text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {p.badge}
              </div>

              <h3 className="mt-5 text-2xl font-bold tracking-tight">{p.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.desc}</p>

              <div className="mt-6 flex items-end gap-2">
                <span className="text-5xl font-bold tracking-tight">{p.price}</span>
                <span className="mb-1.5 text-sm text-muted-foreground">{p.unit}</span>
              </div>

              <div
                className={`mt-4 inline-flex w-fit rounded-lg px-3 py-1.5 text-xs font-semibold ${
                  p.featured
                    ? "bg-brand/15 text-brand"
                    : "bg-muted text-foreground/80"
                }`}
              >
                {p.extrasBadge}
              </div>
              <p className="mt-2 text-xs text-muted-foreground">{p.extrasNote}</p>

              <a
                href="#contact"
                className={`mt-7 inline-flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3.5 text-sm font-semibold transition ${
                  p.featured
                    ? "bg-gradient-brand text-primary-foreground shadow-glow hover:opacity-95"
                    : "border border-border bg-card text-foreground hover:border-brand/40 hover:bg-brand/5"
                }`}
              >
                {p.cta} <ArrowRight className="h-4 w-4" />
              </a>

              <div className="mt-8 border-t border-border pt-6">
                <div className="mb-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                  What&apos;s included
                </div>
                <ul className="space-y-3">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-foreground/80">
                      <span className="mt-0.5 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-brand">
                        <Check className="h-2.5 w-2.5 text-primary-foreground" strokeWidth={3} />
                      </span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- TEAM ---------- */
function Team() {
  const { items: team } = usePublicTeam();
  return (
    <section id="team" className="section-y">
      <div className="container-page">
        <SectionHeader
          align="center"
          className="mb-12"
          eyebrow={
            <span className="inline-flex items-center justify-center gap-2 text-sm font-medium text-brand-glow">
              <Users className="h-4 w-4" /> The team
            </span>
          }
          title="Built by outbound operators, for outbound teams."
        />
        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
          {team.map((m) => (
            <div key={m.id} className="group rounded-3xl border border-border bg-card/50 p-6 text-center transition-all hover:border-brand/50 hover:shadow-glow">
              <div className="relative mx-auto h-40 w-40">
                <div className="absolute inset-0 rounded-full bg-gradient-brand opacity-40 blur-xl transition group-hover:opacity-70" />
                {m.img ? (
                  <img src={m.img} alt={m.name} className="relative h-40 w-40 rounded-full border-2 border-brand/40 object-cover" />
                ) : (
                  <div className="relative flex h-40 w-40 items-center justify-center rounded-full border-2 border-brand/40 bg-muted text-muted-foreground">
                    <Users className="h-16 w-16" />
                  </div>
                )}
              </div>
              <h3 className="mt-5 text-lg font-semibold">{m.name}</h3>
              <div className="text-sm text-muted-foreground">{m.role}</div>
              <div className="mt-4 flex items-center justify-center gap-2">
                <a href={m.facebookUrl} target="_blank" rel="noreferrer" aria-label={`${m.name} on Facebook`} className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-background transition hover:border-transparent hover:bg-gradient-brand">
                  <Facebook className="h-4 w-4" />
                </a>
                <a href={m.linkedinUrl} target="_blank" rel="noreferrer" aria-label={`${m.name} on LinkedIn`} className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-background transition hover:border-transparent hover:bg-gradient-brand">
                  <Linkedin className="h-4 w-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- CONTACT ---------- */
function Contact() {
  return (
    <section id="contact" className="section-y bg-card/30">
      <div className="container-page grid gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <SectionHeader
            eyebrow="Get in touch"
            title="Ready to fill your pipeline?"
            description="Send a message and our team will get back within 24 hours."
          />

          <div className="mt-8 space-y-4">
            <ContactRow icon={Mail} label="Email us" values={["Sabidkhan@gmail.com", "safiq3d@gmail.com"]} />
            <ContactRow icon={Phone} label="Call us" values={["+880 1315 121758", "+880 1833 559415"]} />
            <ContactRow icon={MapPin} label="Visit us" values={["Faridpur, Dhaka, Bangladesh"]} />
          </div>
        </div>

        <form
          className="space-y-4 rounded-3xl border border-border bg-background p-6 shadow-elevate md:p-8"
          onSubmit={(e) => { e.preventDefault(); alert("Thanks — we'll be in touch shortly."); }}
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Name" name="name" placeholder="Your name" />
            <Field label="Email" name="email" type="email" placeholder="you@company.com" />
          </div>
          <Field label="Company" name="company" placeholder="Company name" />
          <div>
            <label className="text-sm font-medium">Message</label>
            <textarea name="message" required rows={4} placeholder="Tell us about your outreach goals…" className="mt-1.5 w-full resize-none rounded-xl border border-border bg-card px-4 py-3 text-sm outline-none transition focus:border-brand" />
          </div>
          <button type="submit" className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-brand px-5 py-3.5 font-medium text-primary-foreground shadow-glow transition hover:opacity-95">
            Send message <ArrowRight className="h-4 w-4" />
          </button>
        </form>
      </div>
    </section>
  );
}

function ContactRow({ icon: Icon, label, values }: { icon: typeof Mail; label: string; values: string[] }) {
  return (
    <div className="flex gap-4 items-start rounded-2xl border border-border bg-background p-4">
      <div className="w-10 h-10 rounded-xl bg-gradient-brand flex items-center justify-center shadow-glow flex-shrink-0">
        <Icon className="w-5 h-5 text-primary-foreground" />
      </div>
      <div>
        <div className="text-xs uppercase tracking-wider text-muted-foreground">{label}</div>
        {values.map((v) => <div key={v} className="text-sm font-medium">{v}</div>)}
      </div>
    </div>
  );
}

function Field({ label, name, type = "text", placeholder }: { label: string; name: string; type?: string; placeholder?: string }) {
  return (
    <div>
      <label className="text-sm font-medium">{label}</label>
      <input required name={name} type={type} placeholder={placeholder} className="mt-1.5 w-full rounded-xl bg-card border border-border px-4 py-3 text-sm outline-none focus:border-brand transition" />
    </div>
  );
}

/* ---------- FAQ ---------- */
function FAQ() {
  const items = [
    { q: "How fast can SyncReach launch our first campaign?", a: "Most clients are live within 14 days. Infrastructure setup and warm-up takes the first 10, copy and targeting the rest." },
    { q: "What kind of reply rates should we expect?", a: "Well-targeted campaigns average 8–15% reply rates in the first 60 days, with positive replies typically 2–4% of sends." },
    { q: "Do you handle deliverability and inbox warm-up?", a: "Yes — every inbox is warmed on our private network and monitored 24/7 so your sends land in the primary inbox, not spam." },
    { q: "Which industries do you specialize in?", a: "B2B SaaS, agencies, professional services, and fintech. If your ACV is above $2k, we can build a pipeline for you." },
    { q: "What if it doesn't work?", a: "We work in 90-day cycles with clear KPIs. If we miss the target, we keep working — at no extra cost — until we hit it." },
  ];
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="section-y">
      <div className="container-page">
        <div className="mx-auto max-w-3xl">
          <SectionHeader
            align="center"
            className="mb-12"
            eyebrow="FAQ"
            title="Answers before you ask."
          />
          <div className="space-y-3">
            {items.map((it, i) => {
              const isOpen = open === i;
              return (
                <div key={it.q} className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                  >
                    <span className="text-base font-semibold md:text-lg">{it.q}</span>
                    {isOpen ? <Minus className="h-5 w-5 flex-shrink-0 text-brand" /> : <Plus className="h-5 w-5 flex-shrink-0 text-brand" />}
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-6 leading-relaxed text-muted-foreground">{it.a}</div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- FOOTER moved to SiteFooter component ---------- */
