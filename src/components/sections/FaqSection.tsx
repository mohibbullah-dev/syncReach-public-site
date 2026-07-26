import { useEffect, useState } from "react";
import { Headphones, Minus, Plus, ShieldCheck, Zap } from "lucide-react";

import { SectionHeader } from "@/components/layout/SectionHeader";
import { usePublicFaq } from "@/lib/use-public-content";

export function FaqSection() {
  const { items } = usePublicFaq();
  const [openId, setOpenId] = useState<string | null>(null);

  useEffect(() => {
    if (openId === null && items[0]?.id) setOpenId(items[0].id);
  }, [items, openId]);

  return (
    <section id="faq" className="section-y bg-[oklch(0.985_0.008_250)]">
      <div className="container-page">
        <SectionHeader
          align="center"
          width="md"
          className="mb-10 md:mb-12"
          eyebrow="FAQ"
          title={
            <>
              Answers before{" "}
              <span className="text-brand">you ask.</span>
            </>
          }
          description="Everything you need to know about working with SyncReach."
        />

        <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-8 xl:grid-cols-[300px_minmax(0,1fr)]">
          {/* Left CTA card */}
          <aside className="h-fit rounded-[12px] border border-border/70 bg-white p-6 shadow-[0_16px_48px_-28px_oklch(0.16_0.03_260_/_0.35)] lg:sticky lg:top-24">
            <div className="relative mx-auto h-16 w-20">
              <div className="absolute left-1 top-2 h-12 w-14 rotate-[-8deg] rounded-2xl bg-brand/15" />
              <div className="absolute right-0 top-0 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand text-2xl font-bold text-primary-foreground shadow-glow">
                ?
              </div>
            </div>
            <h3 className="mt-5 text-center text-lg font-bold tracking-tight">
              Still have questions?
            </h3>
            <p className="mt-2 text-center text-sm leading-relaxed text-muted-foreground">
              Our team is here to help you find the right solution.
            </p>
            <a
              href="#contact"
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-brand px-5 py-3 text-sm font-semibold text-primary-foreground shadow-glow transition hover:opacity-95"
            >
              <Headphones className="h-4 w-4" />
              Book a Free Consultation
            </a>
          </aside>

          {/* Accordion */}
          <div className="space-y-3">
            {items.map((it) => {
              const isOpen = openId === it.id;
              return (
                <div
                  key={it.id}
                  className="overflow-hidden rounded-[12px] border border-border/70 bg-white shadow-[0_10px_30px_-22px_oklch(0.16_0.03_260_/_0.28)]"
                >
                  <button
                    type="button"
                    onClick={() => setOpenId(isOpen ? "" : it.id)}
                    className="flex w-full items-center gap-3 px-4 py-4 text-left sm:gap-4 sm:px-5 sm:py-5"
                    aria-expanded={isOpen}
                  >
                    <span
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition ${
                        isOpen ? "bg-brand text-primary-foreground" : "bg-brand/10 text-brand"
                      }`}
                    >
                      {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                    </span>
                    <span className="text-sm font-semibold sm:text-base">{it.question}</span>
                  </button>
                  {isOpen ? (
                    <div className="px-4 pb-4 sm:px-5 sm:pb-5">
                      <div className="flex gap-3 rounded-xl bg-brand/[0.06] px-4 py-3.5">
                        <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand text-primary-foreground">
                          <Zap className="h-3.5 w-3.5" fill="currentColor" />
                        </span>
                        <p className="text-sm leading-relaxed text-foreground/80">{it.answer}</p>
                      </div>
                    </div>
                  ) : null}
                </div>
              );
            })}

            <div className="flex items-center justify-center gap-2 pt-4 text-center text-xs text-muted-foreground sm:text-sm">
              <ShieldCheck className="h-4 w-4 shrink-0 text-brand" />
              <span>We&apos;re committed to your success with proven strategies and real results.</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
