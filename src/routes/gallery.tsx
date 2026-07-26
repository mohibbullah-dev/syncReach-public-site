import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowLeft } from "lucide-react";

import { GalleryLightbox, GalleryTile } from "@/components/gallery/GalleryMedia";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { type GalleryItem, type GalleryMediaType } from "@/data/gallery";
import { usePublicGallery } from "@/lib/use-public-content";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/gallery")({
  component: GalleryPage,
});

type Filter = "all" | GalleryMediaType;

const FILTERS: Array<{ id: Filter; label: string }> = [
  { id: "all", label: "All" },
  { id: "photo", label: "Photos" },
  { id: "video", label: "Videos" },
];

function GalleryPage() {
  const { items } = usePublicGallery();
  const [filter, setFilter] = useState<Filter>("all");
  const [selected, setSelected] = useState<GalleryItem | null>(null);
  const [open, setOpen] = useState(false);

  const filtered = useMemo(
    () => (filter === "all" ? items : items.filter((item) => item.type === filter)),
    [filter, items],
  );

  const featured = filtered.find((item) => item.featured) ?? filtered[0];
  const rest = filtered.filter((item) => item.id !== featured?.id);

  const openItem = (item: GalleryItem) => {
    setSelected(item);
    setOpen(true);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="section-y-page relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,oklch(0.75_0.15_245_/_0.18),transparent_50%)]" />

        <div className="container-page relative">
          <div className="mb-6">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground transition hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" /> Back to home
            </Link>
          </div>
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <SectionHeader
              as="h1"
              eyebrow="Gallery"
              title={
                <>
                  Moments from the
                  <br />
                  <span className="text-gradient-brand">outbound floor</span>.
                </>
              }
              description="Photos and videos managed from the admin CMS. Upload once, publish everywhere."
            />

            <div className="flex flex-wrap gap-2">
              {FILTERS.map((f) => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setFilter(f.id)}
                  className={cn(
                    "rounded-[12px] px-4 py-2 text-sm font-medium transition",
                    filter === f.id
                      ? "bg-gradient-brand text-primary-foreground shadow-glow"
                      : "border border-border bg-card/70 text-muted-foreground hover:text-foreground",
                  )}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="section-stack rounded-[12px] border border-dashed border-border bg-card/40 px-6 py-16 text-center text-muted-foreground">
              No gallery items yet. Upload photos or videos from the admin panel.
            </div>
          ) : (
            <div className="section-stack grid gap-4 md:grid-cols-12 md:gap-5">
              {featured && (
                <GalleryTile
                  item={featured}
                  onOpen={openItem}
                  className="h-72 md:col-span-7 md:h-[28rem] lg:col-span-8"
                />
              )}

              <div className="grid gap-4 md:col-span-5 md:gap-5 lg:col-span-4">
                {rest.slice(0, 2).map((item) => (
                  <GalleryTile
                    key={item.id}
                    item={item}
                    onOpen={openItem}
                    className="h-44 md:h-[13.25rem]"
                  />
                ))}
              </div>

              {rest.slice(2).map((item, index) => (
                <GalleryTile
                  key={item.id}
                  item={item}
                  onOpen={openItem}
                  className={cn(
                    "h-52 md:h-64",
                    index % 3 === 0
                      ? "md:col-span-4"
                      : index % 3 === 1
                        ? "md:col-span-5"
                        : "md:col-span-3",
                  )}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <GalleryLightbox item={selected} open={open} onOpenChange={setOpen} />
    </div>
  );
}
