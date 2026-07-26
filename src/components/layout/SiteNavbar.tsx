import { useEffect, useMemo, useState } from "react";
import { useRouterState } from "@tanstack/react-router";
import {
  ArrowRight,
  BarChart3,
  HelpCircle,
  Images,
  LayoutDashboard,
  LayoutGrid,
  LogIn,
  Mail,
  Menu,
  MessageSquareQuote,
  Phone,
  Tag,
  Users,
} from "lucide-react";

import { BrandLogo } from "@/components/layout/BrandLogo";
import {
  resolveAdminNavState,
  type AdminNavState,
} from "@/lib/admin-nav";
import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const NAV_LINKS = [
  { id: "features", label: "Features", icon: LayoutGrid, homeHash: "/#features" },
  { id: "results", label: "Results", icon: BarChart3, homeHash: "/#results" },
  { id: "reviews", label: "Reviews", icon: MessageSquareQuote, homeHash: "/#reviews", pagePath: "/reviews" },
  { id: "gallery", label: "Gallery", icon: Images, homeHash: "/#gallery", pagePath: "/gallery" },
  { id: "pricing", label: "Pricing", icon: Tag, homeHash: "/#pricing" },
  { id: "team", label: "Team", icon: Users, homeHash: "/#team" },
  { id: "faq", label: "FAQ", icon: HelpCircle, homeHash: "/#faq" },
  { id: "contact", label: "Contact", icon: Mail, homeHash: "/#contact" },
] as const;

function useActiveSection(ids: string[], enabled: boolean) {
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    if (!enabled) {
      setActive("");
      return;
    }

    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]?.target?.id) {
          setActive(visible[0].target.id);
        }
      },
      {
        rootMargin: "-25% 0px -55% 0px",
        threshold: [0.1, 0.25, 0.5],
      },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids, enabled]);

  return active;
}

function useScrolled(threshold = 24) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return scrolled;
}

function useAdminNav() {
  const [state, setState] = useState<AdminNavState>({ visible: false });

  useEffect(() => {
    let cancelled = false;
    void resolveAdminNavState().then((next) => {
      if (!cancelled) setState(next);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return state;
}

function AdminCta({
  state,
  className,
  compact,
}: {
  state: Extract<AdminNavState, { visible: true }>;
  className?: string;
  compact?: boolean;
}) {
  const isDashboard = state.mode === "dashboard";
  return (
    <a
      href={state.href}
      className={cn(
        "inline-flex items-center justify-center gap-1.5 rounded-[12px] border border-brand/25 bg-white/90 font-semibold text-brand shadow-sm backdrop-blur-sm transition",
        "hover:border-brand/40 hover:bg-brand/5 hover:shadow-md",
        compact ? "px-3 py-2 text-xs" : "px-4 py-2.5 text-sm",
        className,
      )}
    >
      {isDashboard ? (
        <LayoutDashboard className={cn(compact ? "h-3.5 w-3.5" : "h-4 w-4")} />
      ) : (
        <LogIn className={cn(compact ? "h-3.5 w-3.5" : "h-4 w-4")} />
      )}
      {isDashboard ? "Dashboard" : "Dashboard login"}
    </a>
  );
}

export function SiteNavbar() {
  const [open, setOpen] = useState(false);
  const scrolled = useScrolled();
  const adminNav = useAdminNav();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isHome = pathname === "/";
  const sectionActive = useActiveSection(
    NAV_LINKS.map((l) => l.id),
    isHome,
  );

  const activeId = useMemo(() => {
    if (pathname === "/gallery") return "gallery";
    if (pathname === "/reviews") return "reviews";
    return sectionActive;
  }, [pathname, sectionActive]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-transparent">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:h-[4.25rem]">
        <BrandLogo className="shrink-0 transition-transform duration-300 hover:scale-[1.02]" />

        <nav
          aria-label="Primary"
          className={cn(
            "hidden items-center gap-1 transition-all duration-300 lg:flex",
            scrolled
              ? "rounded-[12px] border border-border/70 bg-white/80 p-1 shadow-sm backdrop-blur-md"
              : "bg-transparent",
          )}
        >
          {NAV_LINKS.map((link) => {
            const isActive = activeId === link.id;
            return (
              <a
                key={link.id}
                href={link.homeHash}
                className={cn(
                  "relative rounded-[12px] px-3 py-2 text-[13px] font-medium transition-colors duration-200 xl:px-3.5 xl:text-sm",
                  isActive
                    ? "bg-brand/10 text-brand"
                    : "text-muted-foreground hover:bg-muted/60 hover:text-foreground",
                )}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          {adminNav.visible ? <AdminCta state={adminNav} /> : null}
      
          <a
            href="/#pricing"
            className="inline-flex items-center gap-1.5 rounded-[12px] bg-gradient-brand px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-glow transition hover:opacity-95 hover:shadow-[0_12px_28px_-12px_oklch(0.58_0.22_260_/_0.65)]"
          >
            Book a demo
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          {adminNav.visible ? (
            <AdminCta state={adminNav} compact className="hidden sm:inline-flex" />
          ) : null}
          <a
            href="/#pricing"
            className="hidden items-center rounded-[12px] bg-gradient-brand px-3.5 py-2 text-xs font-semibold text-primary-foreground shadow-glow sm:inline-flex"
          >
            Book a demo
          </a>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button
                type="button"
                aria-label="Open menu"
                className={cn(
                  "inline-flex h-10 w-10 items-center justify-center rounded-[12px] border border-border bg-card/80 text-foreground shadow-sm backdrop-blur transition",
                  "hover:border-brand/40 hover:bg-brand/5 active:scale-95",
                )}
              >
                <Menu className="h-5 w-5" />
              </button>
            </SheetTrigger>

            <SheetContent
              side="right"
              className="flex w-[min(100%,22rem)] flex-col gap-0 border-l border-border bg-background p-0 sm:max-w-sm"
            >
              <SheetHeader className="border-b border-border px-5 py-5 text-left">
                <SheetTitle className="sr-only">SyncReach</SheetTitle>
                <BrandLogo toHome={false} />
                <SheetDescription className="mt-2 text-xs">Navigate the site</SheetDescription>
              </SheetHeader>

              <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4" aria-label="Mobile">
                {NAV_LINKS.map((link) => {
                  const Icon = link.icon;
                  const isActive = activeId === link.id;
                  return (
                    <a
                      key={link.id}
                      href={link.homeHash}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition",
                        isActive
                          ? "bg-brand/10 text-brand"
                          : "text-foreground/80 hover:bg-muted hover:text-foreground",
                      )}
                    >
                      <span
                        className={cn(
                          "flex h-9 w-9 items-center justify-center rounded-lg border",
                          isActive
                            ? "border-brand/30 bg-brand/15 text-brand"
                            : "border-border bg-card text-muted-foreground",
                        )}
                      >
                        <Icon className="h-4 w-4" />
                      </span>
                      <span className="flex-1">{link.label}</span>
                      {isActive && <span className="h-1.5 w-1.5 rounded-full bg-brand" />}
                    </a>
                  );
                })}
              </nav>

              <div className="space-y-3 border-t border-border bg-card/40 px-5 py-5">
                {adminNav.visible ? (
                  <AdminCta state={adminNav} className="w-full rounded-xl py-3.5" />
                ) : null}
                <a
                  href="/#pricing"
                  onClick={() => setOpen(false)}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-brand px-5 py-3.5 text-sm font-semibold text-primary-foreground shadow-glow"
                >
                  Book a demo <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href="tel:+8801315121758"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-background px-5 py-3 text-sm font-medium text-foreground transition hover:bg-muted"
                >
                  <Phone className="h-4 w-4 text-brand" />
                  Call us
                </a>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
