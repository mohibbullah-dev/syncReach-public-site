import { Image as ImageIcon, Play, Video } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { GalleryItem } from "@/data/gallery";
import { cn } from "@/lib/utils";

export function GalleryTile({
  item,
  className,
  onOpen,
}: {
  item: GalleryItem;
  className?: string;
  onOpen: (item: GalleryItem) => void;
}) {
  const cover = item.type === "video" ? (item.thumbnailUrl ?? item.src) : item.src;

  return (
    <button
      type="button"
      onClick={() => onOpen(item)}
      className={cn(
        "group relative overflow-hidden rounded-3xl text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        "bg-card shadow-elevate ring-1 ring-border/80 transition duration-500",
        "hover:-translate-y-1 hover:shadow-glow hover:ring-brand/35",
        className,
      )}
    >
      <img
        src={cover}
        alt={item.title}
        className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
        loading="lazy"
      />

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[oklch(0.16_0.03_260_/_0.78)] via-[oklch(0.16_0.03_260_/_0.12)] to-transparent opacity-80 transition duration-500 group-hover:opacity-100" />

      {item.type === "video" && (
        <span className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-gradient-brand text-primary-foreground shadow-glow transition duration-300 group-hover:scale-110 md:h-14 md:w-14">
          <Play className="h-4 w-4 fill-current md:h-5 md:w-5" />
        </span>
      )}

      <div className="absolute inset-x-0 bottom-0 translate-y-1 p-4 opacity-95 transition duration-500 group-hover:translate-y-0 md:p-5">
        <div className="mb-2 inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white/90 backdrop-blur">
          {item.type === "video" ? <Video className="h-3 w-3" /> : <ImageIcon className="h-3 w-3" />}
          {item.type}
        </div>
        <div className="font-semibold text-white md:text-lg">{item.title}</div>
        <p className="mt-1 line-clamp-2 text-xs text-white/70 md:text-sm">{item.caption}</p>
      </div>
    </button>
  );
}

export function GalleryLightbox({
  item,
  open,
  onOpenChange,
}: {
  item: GalleryItem | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  if (!item) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl gap-0 overflow-hidden border-border p-0 sm:rounded-3xl">
        <div className="border-b border-border px-5 py-4 md:px-6">
          <DialogHeader className="text-left">
            <DialogTitle className="text-lg">{item.title}</DialogTitle>
            <DialogDescription>{item.caption}</DialogDescription>
          </DialogHeader>
        </div>
        <div className="bg-muted/40 p-3 md:p-4">
          {item.type === "video" ? (
            <video
              key={item.id}
              controls
              autoPlay
              playsInline
              poster={item.thumbnailUrl}
              className="aspect-video w-full rounded-2xl border border-border bg-black object-cover"
              src={item.src}
            />
          ) : (
            <img
              src={item.src}
              alt={item.title}
              className="max-h-[70vh] w-full rounded-2xl border border-border bg-background object-contain"
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
