import {
  ChevronRight,
  Facebook,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Twitter,
} from "lucide-react";

import { BrandLogo } from "@/components/layout/BrandLogo";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const companyLinks = [
  { href: "/#features", label: "Features", tip: "See product capabilities" },
  { href: "/#results", label: "Process", tip: "How SyncReach works" },
  { href: "/#reviews", label: "Reviews", tip: "Customer reviews" },
  { href: "/#gallery", label: "Gallery", tip: "Photos & videos" },
  { href: "/#pricing", label: "Pricing", tip: "Plans & pricing" },
  { href: "/#team", label: "Team", tip: "Meet the team" },
  { href: "/#faq", label: "FAQ", tip: "Frequently asked questions" },
] as const;

const socials = [
  { icon: Facebook, href: "https://www.facebook.com/SyncReachai", label: "Facebook", tip: "Follow us on Facebook" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/emailmarketerr/", label: "LinkedIn", tip: "Connect on LinkedIn" },
  { icon: Twitter, href: "https://x.com/ismail3dartist", label: "X", tip: "Follow us on X" },
] as const;

const legalLinks = [
  { href: "#", label: "Privacy", tip: "Privacy policy" },
  { href: "#", label: "Terms", tip: "Terms of service" },
  { href: "/#contact", label: "Book a demo", tip: "Book a demo with our team" },
] as const;

function TipLink({
  href,
  tip,
  className,
  children,
  external,
}: {
  href: string;
  tip: string;
  className?: string;
  children: React.ReactNode;
  external?: boolean;
}) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <a
          href={href}
          className={className}
          {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
        >
          {children}
        </a>
      </TooltipTrigger>
      <TooltipContent side="top" className="bg-foreground text-background">
        {tip}
      </TooltipContent>
    </Tooltip>
  );
}

export function SiteFooter() {
  // const year = new Date().getFullYear();
const year = 2024
  return (
    <TooltipProvider delayDuration={200}>
      <footer className="relative overflow-hidden bg-[oklch(0.985_0.008_250)] pt-10 pb-6 md:pt-12 md:pb-8">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,oklch(0.75_0.1_245_/_0.12),transparent_55%)]" />

        <div className="container-page relative space-y-3">
          {/* Main card */}
          <div className="rounded-[12px] border border-border/70 bg-white p-6 shadow-[0_16px_48px_-28px_oklch(0.16_0.03_260_/_0.35)] md:p-8">
            <div className="grid gap-8 md:grid-cols-12 md:gap-8 md:items-start">
              {/* Brand */}
              <div className="md:col-span-5">
                <BrandLogo />
                <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">
                  Sync today, reach tomorrow. Funnel-driven cold email that turns cold inboxes into a
                  predictable revenue channel.
                </p>
                <div className="mt-5 flex items-center gap-2.5">
                  {socials.map((s) => (
                    <TipLink
                      key={s.label}
                      href={s.href}
                      tip={s.tip}
                      external
                      className="flex h-9 w-9 items-center justify-center rounded-xl border border-border/80 bg-white text-foreground shadow-sm transition hover:border-brand/40 hover:bg-brand/5 hover:text-brand"
                    >
                      <s.icon className="h-4 w-4" />
                      <span className="sr-only">{s.label}</span>
                    </TipLink>
                  ))}
                </div>
              </div>

              {/* Company — two columns to keep footer compact */}
              <div className="md:col-span-4">
                <div className="font-semibold text-foreground">Company</div>
                <div className="mt-2 h-0.5 w-8 rounded-full bg-brand" />
                <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-0.5">
                  {companyLinks.map((link) => (
                    <li key={link.href}>
                      <TipLink
                        href={link.href}
                        tip={link.tip}
                        className="group flex items-center justify-between rounded-lg py-1.5 text-sm text-muted-foreground transition hover:bg-brand/5 hover:px-2 hover:text-foreground"
                      >
                        <span>{link.label}</span>
                        <ChevronRight className="h-3.5 w-3.5 shrink-0 text-brand opacity-70 transition group-hover:translate-x-0.5 group-hover:opacity-100" />
                      </TipLink>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contact */}
              <div className="md:col-span-3">
                <div className="font-semibold text-foreground">Contact</div>
                <div className="mt-2 h-0.5 w-8 rounded-full bg-brand" />
                <ul className="mt-4 divide-y divide-border/70">
                  <li className="py-2 first:pt-0">
                    <TipLink
                      href="https://maps.google.com/?q=Faridpur,Dhaka,Bangladesh"
                      tip="Open location on map"
                      external
                      className="flex items-start gap-3 text-sm text-muted-foreground transition hover:text-foreground"
                    >
                      <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                      <span>Faridpur, Dhaka, Bangladesh</span>
                    </TipLink>
                  </li>
                  <li className="py-2">
                    <TipLink
                      href="mailto:safiq3d@gmail.com"
                      tip="Send an email"
                      className="flex items-start gap-3 text-sm text-muted-foreground transition hover:text-foreground"
                    >
                      <Mail className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                      <span>safiq3d@gmail.com</span>
                    </TipLink>
                  </li>
                  <li className="py-2 last:pb-0">
                    <TipLink
                      href="tel:+8801315121758"
                      tip="Call SyncReach"
                      className="flex items-start gap-3 text-sm text-muted-foreground transition hover:text-foreground"
                    >
                      <Phone className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                      <span>+880 1315 121758</span>
                    </TipLink>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Bottom bar card */}
          <div className="flex flex-col items-center justify-between gap-4 rounded-[12px] border border-border/70 bg-white px-6 py-4 text-xs text-muted-foreground shadow-[0_10px_30px_-22px_oklch(0.16_0.03_260_/_0.3)] sm:flex-row md:px-8">
            <div>© {year} SyncReach · All rights reserved.</div>
            <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2">
              {legalLinks.map((link, i) => (
                <span key={link.label} className="inline-flex items-center gap-3">
                  {i > 0 && <span className="text-border">|</span>}
                  <TipLink
                    href={link.href}
                    tip={link.tip}
                    className="transition hover:text-brand"
                  >
                    {link.label}
                  </TipLink>
                </span>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </TooltipProvider>
  );
}
