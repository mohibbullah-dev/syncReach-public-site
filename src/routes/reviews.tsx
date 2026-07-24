import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowLeft, Mic, Play, Quote, Star, Type, Video } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ProfileAvatar } from "@/components/ProfileAvatar";
import { type Review, type ReviewType } from "@/data/reviews";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { isRealProfileImage } from "@/lib/profile-image";
import { usePublicReviews } from "@/lib/use-public-content";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/reviews")({
  component: ReviewsPage,
});

const filters: Array<{ id: "all" | ReviewType; label: string }> = [
  { id: "all", label: "All" },
  { id: "text", label: "Text" },
  { id: "audio", label: "Audio" },
  { id: "video", label: "Video" },
];

function TypeIcon({ type }: { type: ReviewType }) {
  if (type === "audio") return <Mic className="h-3.5 w-3.5" />;
  if (type === "video") return <Video className="h-3.5 w-3.5" />;
  return <Type className="h-3.5 w-3.5" />;
}

function ReviewsPage() {
  const [filter, setFilter] = useState<"all" | ReviewType>("all");
  const [selected, setSelected] = useState<Review | null>(null);
  const [open, setOpen] = useState(false);
  const { items: reviews } = usePublicReviews();

  const list = useMemo(
    () => (filter === "all" ? reviews : reviews.filter((r) => r.type === filter)),
    [filter, reviews],
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container-page section-y-page">
        <Link
          to="/"
          className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground transition hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> Back to home
        </Link>

        <SectionHeader
          as="h1"
          eyebrow="Reviews"
          title="All reviews"
          description="Browse text, audio, and video testimonials. Content is prepared for the upcoming admin CMS."
        />

        <div className="mt-8 flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setFilter(f.id)}
              className={cn(
                "rounded-full border px-4 py-2 text-sm font-medium transition",
                filter === f.id
                  ? "border-transparent bg-gradient-brand text-primary-foreground shadow-glow"
                  : "border-border bg-card/50 text-muted-foreground hover:text-foreground",
              )}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="section-stack grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((review) => (
            <button
              key={review.id}
              type="button"
              onClick={() => {
                setSelected(review);
                setOpen(true);
              }}
              className="rounded-2xl border border-border bg-card/60 p-5 text-left shadow-elevate transition hover:-translate-y-0.5 hover:border-brand/50 hover:shadow-glow"
            >
              <div className="mb-4 flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <ProfileAvatar name={review.name} src={review.avatar} className="h-10 w-10 border border-border" />
                  <div>
                    <div className="font-semibold">{review.name}</div>
                    <div className="text-xs text-muted-foreground">{review.role}</div>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1 rounded-full border border-border px-2 py-0.5 text-[10px] uppercase tracking-wide text-muted-foreground">
                  <TypeIcon type={review.type} />
                  {review.type}
                </span>
              </div>

              {review.type === "video" && (
                <div className="relative mb-4 overflow-hidden rounded-xl border border-border bg-muted">
                  {review.thumbnailUrl || isRealProfileImage(review.avatar) ? (
                    <img
                      src={review.thumbnailUrl || review.avatar}
                      alt=""
                      className="h-36 w-full object-cover"
                    />
                  ) : (
                    <div className="h-36 w-full bg-muted" />
                  )}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-brand text-primary-foreground">
                      <Play className="h-4 w-4 fill-current" />
                    </span>
                  </div>
                </div>
              )}

              {review.type === "audio" && (
                <div className="mb-4 flex items-center gap-3 rounded-xl border border-border bg-muted/50 px-3 py-3">
                  <Mic className="h-4 w-4 text-brand-glow" />
                  <span className="text-xs text-muted-foreground">Click to play audio review</span>
                </div>
              )}

              {review.type === "text" && <Quote className="mb-2 h-4 w-4 text-brand-glow/70" />}

              <p className="line-clamp-4 text-sm leading-relaxed">"{review.body}"</p>
              <div className="mt-4 flex gap-0.5">
                {Array.from({ length: review.rating }).map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-brand-glow text-brand-glow" />
                ))}
              </div>
            </button>
          ))}
        </div>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg gap-0 overflow-hidden p-0 sm:rounded-2xl">
          {selected && (
            <>
              <div className="border-b border-border px-6 py-5">
                <DialogHeader className="text-left">
                  <div className="flex items-center gap-3">
                    <ProfileAvatar
                      name={selected.name}
                      src={selected.avatar}
                      className="h-11 w-11 border border-border"
                      iconClassName="h-5 w-5"
                    />
                    <div>
                      <DialogTitle>{selected.name}</DialogTitle>
                      <DialogDescription>
                        {selected.role} · {selected.username}
                      </DialogDescription>
                    </div>
                  </div>
                </DialogHeader>
              </div>
              <div className="space-y-4 px-6 py-5">
                {selected.type === "video" && selected.mediaUrl && (
                  <video
                    key={selected.id}
                    controls
                    playsInline
                    poster={selected.thumbnailUrl}
                    className="aspect-video w-full rounded-xl border border-border bg-black"
                    src={selected.mediaUrl}
                  />
                )}
                {selected.type === "audio" && selected.mediaUrl && (
                  <audio key={selected.id} controls className="w-full" src={selected.mediaUrl} />
                )}
                <p className="text-sm leading-relaxed">"{selected.body}"</p>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
