import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  ArrowRight, Check, Mail, Phone, MapPin, Calendar,
  BadgeDollarSign, Trophy, FileCheck2, Users,
  Facebook, Linkedin,
} from "lucide-react";
import { TestimonialsMarquee } from "@/components/reviews/TestimonialsMarquee";
import { GallerySection } from "@/components/gallery/GallerySection";
import { FeaturesBento } from "@/components/features/FeaturesBento";
import { HeroVideo } from "@/components/sections/HeroVideo";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { FaqSection } from "@/components/sections/FaqSection";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { CustomPricingCard } from "@/components/pricing/CustomPricingCard";
import { submitContactMessage } from "@/lib/api";
import { isCustomPricingPlan, QUOTE_STORAGE_KEY } from "@/lib/pricing-quote";
import { usePublicPricing, usePublicTeam } from "@/lib/use-public-content";


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
      <FaqSection />
      <SiteFooter />
    </div>
  );
}

/* ---------- HERO (Attention) — reference structure, SyncReach colors ---------- */
const HERO_TRUST = [
  { icon: BadgeDollarSign, label: "Affordable Pricing" },
  { icon: Trophy, label: "Proven Results" },
  { icon: FileCheck2, label: "No Long-Term Contract" },
] as const;

function Hero() {
  return (
    <section id="top" className="relative overflow-x-clip section-y-hero bg-hero-glow">
      <div className="container-page grid items-center gap-8 sm:gap-10 lg:grid-cols-2 lg:gap-16 xl:gap-20">
        <div className="mx-auto w-full max-w-xl text-center lg:mx-0 lg:max-w-none lg:text-left">
          <div className="mb-4 inline-flex max-w-full items-center gap-2 rounded-[12px] border border-brand/20 bg-brand/5 px-3 py-1.5 shadow-sm sm:mb-6 sm:gap-2.5 sm:px-3.5">
            <span className="h-2 w-2 shrink-0 rounded-full bg-brand" />
            <span className="text-left text-[10px] font-extrabold uppercase leading-snug tracking-[0.06em] text-brand sm:text-xs sm:tracking-[0.1em]">
              <span className="sm:hidden">#1 B2B Outbound Agency</span>
              <span className="hidden sm:inline">#1 B2B Outbound Lead Generation Agency</span>
            </span>
          </div>

          <h1 className="font-display text-[clamp(1.55rem,6.4vw,4.35rem)] font-extrabold leading-[1.1] tracking-[-0.03em] text-foreground">
            <span className="block whitespace-nowrap">
              We bring <span className="text-brand">the leads.</span>
            </span>
            <span className="mt-0.5 block whitespace-nowrap sm:mt-1">
              You close the deal.
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-[34ch] text-[0.9375rem] font-medium leading-relaxed text-foreground/80 sm:mt-6 sm:max-w-md sm:text-base md:text-lg lg:mx-0 lg:max-w-lg">
            We help B2B businesses build qualified sales pipelines through strategic cold
            email and LinkedIn outreach, powered by AI driven personalisation, lead
            qualification, and appointment setting.
          </p>

          <div className="mt-6 flex justify-center sm:mt-7 lg:justify-start">
            <a
              href="#contact"
              className="inline-flex w-full max-w-xs items-center justify-center gap-2.5 rounded-[12px] bg-brand px-6 py-3.5 text-[15px] font-semibold text-primary-foreground shadow-glow transition hover:bg-brand-deep active:scale-[0.98] sm:w-auto sm:max-w-none sm:px-7"
            >
              <Calendar className="h-[18px] w-[18px] shrink-0" strokeWidth={2.25} />
              Book a Free Consultation
            </a>
          </div>

          <ul className="mx-auto mt-7 grid w-full max-w-xs grid-cols-1 gap-2.5 sm:mt-8 sm:max-w-none sm:flex sm:flex-wrap sm:items-center sm:justify-center sm:gap-x-5 sm:gap-y-3 lg:mx-0 lg:justify-start lg:gap-x-6">
            {HERO_TRUST.map(({ icon: Icon, label }, i) => (
              <li key={label} className="flex items-center justify-center gap-2 sm:justify-start sm:gap-5 lg:gap-6">
                {i > 0 ? (
                  <span className="hidden h-4 w-px bg-border sm:block" aria-hidden />
                ) : null}
                <span className="inline-flex items-center gap-2 rounded-[12px] border border-border/70 bg-white/70 px-3 py-2 text-[13px] font-medium text-foreground/80 sm:border-0 sm:bg-transparent sm:p-0 sm:text-sm">
                  <Icon className="h-4 w-4 shrink-0 text-brand" strokeWidth={2.25} />
                  {label}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <HeroVideo className="w-full" />
      </div>
    </section>
  );
}

/* ---------- ACTION: PRICING ---------- */
function Pricing() {
  const { items: plans } = usePublicPricing();

  return (
    <section id="pricing" className="section-y bg-card/30">
      <div className="container-page">
        <SectionHeader
          align="center"
          width="md"
          eyebrow="Simple pricing"
          title={
            <>
              Pick a plan.
              <br />
              Book meetings this week.
            </>
          }
        />

        <div className="section-stack grid items-start gap-5 md:grid-cols-3">
          {plans.map((p) =>
            p.planType === "custom" || isCustomPricingPlan(p) ? (
              <CustomPricingCard key={p.id || p.name} plan={p} />
            ) : (
              <div
                key={p.id || p.name}
                className={`group relative flex flex-col overflow-hidden rounded-[12px] bg-background p-5 transition duration-300 hover:-translate-y-1 sm:p-6 ${
                  p.featured
                    ? "border-2 border-brand shadow-glow ring-4 ring-brand/10"
                    : "border border-border shadow-elevate hover:border-brand/30 hover:shadow-glow"
                }`}
              >
                {p.featured ? (
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-brand/10 to-transparent" />
                ) : null}

                <div
                  className={`relative inline-flex w-fit rounded-[12px] px-2.5 py-0.5 text-[10px] font-semibold tracking-wider ${
                    p.featured
                      ? "bg-brand text-primary-foreground shadow-sm"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {p.badge}
                </div>

                <h3 className="relative mt-3 text-xl font-bold tracking-tight">{p.name}</h3>
                <p className="relative mt-1 text-sm leading-snug text-muted-foreground">{p.desc}</p>

                <div className="relative mt-4 flex items-end gap-1.5">
                  <span className="text-3xl font-bold tracking-tight sm:text-4xl">{p.price}</span>
                  <span className="mb-1 text-xs text-muted-foreground">{p.unit}</span>
                </div>

                {p.extrasBadge ? (
                  <div
                    className={`relative mt-3 inline-flex w-fit rounded-lg px-2.5 py-1 text-xs font-semibold ${
                      p.featured
                        ? "bg-brand/15 text-brand"
                        : "bg-muted text-foreground/80"
                    }`}
                  >
                    {p.extrasBadge}
                  </div>
                ) : null}
                {p.extrasNote ? (
                  <p className="relative mt-1 text-[11px] leading-snug text-muted-foreground">
                    {p.extrasNote}
                  </p>
                ) : null}

                <a
                  href="#contact"
                  className={`relative mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
                    p.featured
                      ? "bg-gradient-brand text-primary-foreground shadow-glow hover:opacity-95"
                      : "border border-border bg-card text-foreground group-hover:border-brand/40 group-hover:bg-brand/5"
                  }`}
                >
                  {p.cta} <ArrowRight className="h-4 w-4" />
                </a>

                <div className="relative mt-4 border-t border-border pt-3">
                  <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                    What&apos;s included
                  </div>
                  <ul className="space-y-1.5">
                    {p.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-xs text-foreground/80 sm:text-sm">
                        <span className="mt-0.5 flex h-3.5 w-3.5 flex-shrink-0 items-center justify-center rounded-full bg-brand">
                          <Check className="h-2 w-2 text-primary-foreground" strokeWidth={3} />
                        </span>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ),
          )}
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
          eyebrow="The team"
          title={
            <>
              Built by outbound
              <br />
              operators, for outbound teams.
            </>
          }
        />
        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
          {team.map((m) => (
            <div key={m.id} className="group rounded-[12px] border border-border bg-card/50 p-6 text-center transition-all hover:border-brand/50 hover:shadow-glow">
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
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const applyQuotePrefill = () => {
    try {
      const stored = sessionStorage.getItem(QUOTE_STORAGE_KEY);
      if (stored) {
        setMessage(stored);
        sessionStorage.removeItem(QUOTE_STORAGE_KEY);
      }
    } catch {
      /* ignore */
    }
  };

  useEffect(() => {
    applyQuotePrefill();
    const onQuote = () => applyQuotePrefill();
    window.addEventListener("syncreach:quote-prefill", onQuote);
    return () => window.removeEventListener("syncreach:quote-prefill", onQuote);
  }, []);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setStatus("sending");
    const form = e.currentTarget;
    const data = new FormData(form);
    try {
      await submitContactMessage({
        name: String(data.get("name") || ""),
        email: String(data.get("email") || ""),
        company: String(data.get("company") || ""),
        message: String(data.get("message") || ""),
      });
      form.reset();
      setMessage("");
      setStatus("ok");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Could not send message. Try again.");
    }
  };

  return (
    <section id="contact" className="section-y bg-card/30">
      <div className="container-page grid gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <SectionHeader
            align="left"
            eyebrow="Get in touch"
            title={
              <>
                Ready to fill
                <br />
                your pipeline?
              </>
            }
            description="Send a message and our team will get back within 24 hours."
          />

          <div className="mt-8 space-y-4">
            <ContactRow
              icon={Mail}
              label="Email us"
              values={["safiq3d@gmail.com", "sabidkhan@syncrech.com"]}
            />
            <ContactRow icon={Phone} label="Call us" values={["+880 1315 121758"]} />
            <ContactRow icon={MapPin} label="Visit us" values={["Faridpur, Dhaka, Bangladesh"]} />
          </div>
        </div>

        <form
          className="space-y-4 rounded-[12px] border border-border bg-background p-6 shadow-elevate md:p-8"
          onSubmit={(e) => void onSubmit(e)}
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Name" name="name" placeholder="Your name" />
            <Field label="Email" name="email" type="email" placeholder="you@company.com" />
          </div>
          <Field label="Company" name="company" placeholder="Company name" required={false} />
          <div>
            <label className="text-sm font-medium">Message</label>
            <textarea
              name="message"
              required
              rows={6}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tell us about your outreach goals…"
              className="mt-1.5 w-full resize-none rounded-xl border border-border bg-card px-4 py-3 text-sm outline-none transition focus:border-brand"
            />
          </div>
          {status === "ok" && (
            <p className="rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
              Thanks, your message was sent. We&apos;ll be in touch shortly.
            </p>
          )}
          {status === "error" && (
            <p className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600">
              {error}
            </p>
          )}
          <button
            type="submit"
            disabled={status === "sending"}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-brand px-5 py-3.5 font-medium text-primary-foreground shadow-glow transition hover:opacity-95 disabled:opacity-60"
          >
            {status === "sending" ? "Sending…" : "Send message"}{" "}
            <ArrowRight className="h-4 w-4" />
          </button>
        </form>
      </div>
    </section>
  );
}

function ContactRow({ icon: Icon, label, values }: { icon: typeof Mail; label: string; values: string[] }) {
  return (
    <div className="flex gap-4 items-start rounded-[12px] border border-border bg-background p-4">
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

function Field({
  label,
  name,
  type = "text",
  placeholder,
  required = true,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="text-sm font-medium">{label}</label>
      <input
        required={required}
        name={name}
        type={type}
        placeholder={placeholder}
        className="mt-1.5 w-full rounded-xl border border-border bg-card px-4 py-3 text-sm outline-none transition focus:border-brand"
      />
    </div>
  );
}

