import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

import { GalleryLightbox, GalleryTile } from "@/components/gallery/GalleryMedia";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { Marquee } from "@/components/ui/marquee";
import type { GalleryItem } from "@/data/gallery";
import { usePublicGallery } from "@/lib/use-public-content";

/** Repeat items so each marquee row always fills the viewport. */
function padRow(items: GalleryItem[], min = 6): GalleryItem[] {
  if (items.length === 0) return items;
  if (items.length >= min) return items;
  const out: GalleryItem[] = [];
  let i = 0;
  while (out.length < min) {
    const item = items[i % items.length]!;
    out.push({ ...item, id: `${item.id}__pad-${out.length}` });
    i += 1;
  }
  return out;
}

/** Homepage preview — few items + marquee/hover, full grid lives on /gallery */
export function GallerySection() {
  const { items: all } = usePublicGallery();
  const items = all.slice(0, 6);
  const [selected, setSelected] = useState<GalleryItem | null>(null);
  const [open, setOpen] = useState(false);

  const openItem = (item: GalleryItem) => {
    setSelected(item);
    setOpen(true);
  };

  const rowA = padRow(items.filter((_, i) => i % 2 === 0));
  const rowB = padRow(items.filter((_, i) => i % 2 === 1));

  return (
    <section id="gallery" className="section-y relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,oklch(0.75_0.15_245_/_0.16),transparent_55%)]" />

      <div className="container-page relative">
        <SectionHeader
          align="center"
          eyebrow="Campaigns"
          title={
            <>
            PERFORMANCE GALLERY
              <br />
              <span className="text-gradient-brand">Built on data. Driven by results.</span>.
            </>
          }
          description="Recent campaign performance from real outbound systems."
        />
      </div>

      <div className="section-stack relative mt-10 w-full space-y-4">
        <Marquee pauseOnHover className="[--duration:45s] [--gap:1.25rem]">
          {(rowA.length > 0 ? rowA : padRow(items)).map((item) => (
            <GalleryTile
              key={`a-${item.id}`}
              item={item}
              onOpen={openItem}
              className="h-52 w-72 shrink-0 md:h-60 md:w-80"
            />
          ))}
        </Marquee>

        <Marquee reverse pauseOnHover className="[--duration:50s] [--gap:1.25rem]">
          {(rowB.length > 0 ? rowB : padRow(items)).map((item) => (
            <GalleryTile
              key={`b-${item.id}`}
              item={item}
              onOpen={openItem}
              className="h-52 w-72 shrink-0 md:h-60 md:w-80"
            />
          ))}
        </Marquee>

        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-background to-transparent md:w-28" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-background to-transparent md:w-28" />
      </div>

      <div className="container-page relative mt-10 flex justify-center">
        <Link
          to="/gallery"
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-brand px-6 py-3.5 text-sm font-medium text-primary-foreground shadow-glow transition hover:opacity-95"
        >
          Explore full gallery <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <GalleryLightbox item={selected} open={open} onOpenChange={setOpen} />
    </section>
  );
}
