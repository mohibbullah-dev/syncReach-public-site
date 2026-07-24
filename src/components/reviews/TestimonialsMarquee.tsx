import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Mic, Play, Quote, Star, Type, Video } from "lucide-react";

import { Marquee } from "@/components/ui/marquee";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ProfileAvatar } from "@/components/ProfileAvatar";
import { cn } from "@/lib/utils";
import { isRealProfileImage } from "@/lib/profile-image";
import { type Review, type ReviewType } from "@/data/reviews";
import { usePublicReviews } from "@/lib/use-public-content";
import { SectionHeader } from "@/components/layout/SectionHeader";

function TypeBadge({ type }: { type: ReviewType }) {
  const map = {
    text: { icon: Type, label: "Text" },
    audio: { icon: Mic, label: "Audio" },
    video: { icon: Video, label: "Video" },
  } as const;
  const { icon: Icon, label } = map[type];
  return (
    <span className="inline-flex items-center gap-1 rounded-full border border-border bg-background/80 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-muted-foreground backdrop-blur">
      <Icon className="h-3 w-3 text-brand-glow" />
      {label}
    </span>
  );
}

function ReviewCard({
  review,
  onOpen,
}: {
  review: Review;
  onOpen: (review: Review) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onOpen(review)}
      className={cn(
        "relative w-64 cursor-pointer overflow-hidden rounded-2xl border border-border bg-card/80 p-4 text-left shadow-elevate backdrop-blur transition",
        "hover:-translate-y-0.5 hover:border-brand/50 hover:shadow-glow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
      )}
    >
      <div className="mb-3 flex items-start justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <ProfileAvatar name={review.name} src={review.avatar} className="h-9 w-9 border border-border" />
          <div className="min-w-0">
            <div className="truncate text-sm font-semibold">{review.name}</div>
            <div className="truncate text-xs text-muted-foreground">{review.username}</div>
          </div>
        </div>
        <TypeBadge type={review.type} />
      </div>

      {review.type === "video" && (
        <div className="relative mb-3 overflow-hidden rounded-xl border border-border bg-muted">
          {review.thumbnailUrl || isRealProfileImage(review.avatar) ? (
            <img
              src={review.thumbnailUrl || review.avatar}
              alt=""
              className="h-28 w-full object-cover opacity-90"
            />
          ) : (
            <div className="h-28 w-full bg-muted" />
          )}
          <div className="absolute inset-0 flex items-center justify-center bg-black/35">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-brand text-primary-foreground shadow-glow">
              <Play className="h-4 w-4 fill-current" />
            </span>
          </div>
        </div>
      )}

      {review.type === "audio" && (
        <div className="mb-3 flex items-center gap-3 rounded-xl border border-border bg-muted/60 px-3 py-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-brand text-primary-foreground">
            <Mic className="h-4 w-4" />
          </span>
          <div className="flex flex-1 items-end gap-0.5">
            {[4, 8, 5, 10, 6, 9, 4, 7, 5, 8, 6, 9].map((h, i) => (
              <span
                key={i}
                className="w-1 rounded-full bg-brand-glow/80"
                style={{ height: `${h * 2}px` }}
              />
            ))}
          </div>
        </div>
      )}

      {review.type === "text" && (
        <Quote className="mb-2 h-4 w-4 text-brand-glow/70" />
      )}

      <p className="line-clamp-3 text-sm leading-relaxed text-foreground/90">"{review.body}"</p>
      <div className="mt-3 flex items-center gap-0.5">
        {Array.from({ length: review.rating }).map((_, i) => (
          <Star key={i} className="h-3.5 w-3.5 fill-brand-glow text-brand-glow" />
        ))}
      </div>
    </button>
  );
}

function ReviewDetailDialog({
  review,
  open,
  onOpenChange,
}: {
  review: Review | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  if (!review) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg gap-0 overflow-hidden p-0 sm:rounded-2xl">
        <div className="border-b border-border bg-card/50 px-6 py-5">
          <DialogHeader className="space-y-3 text-left">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <ProfileAvatar
                  name={review.name}
                  src={review.avatar}
                  className="h-11 w-11 border border-border"
                  iconClassName="h-5 w-5"
                />
                <div>
                  <DialogTitle className="text-base">{review.name}</DialogTitle>
                  <DialogDescription className="text-xs">
                    {review.role} · {review.username}
                  </DialogDescription>
                </div>
              </div>
              <TypeBadge type={review.type} />
            </div>
          </DialogHeader>
        </div>

        <div className="space-y-4 px-6 py-5">
          {review.type === "video" && review.mediaUrl && (
            <video
              key={review.id}
              controls
              playsInline
              poster={review.thumbnailUrl}
              className="aspect-video w-full rounded-xl border border-border bg-black object-cover"
              src={review.mediaUrl}
            />
          )}

          {review.type === "audio" && review.mediaUrl && (
            <div className="rounded-xl border border-border bg-muted/50 p-4">
              <audio key={review.id} controls className="w-full" src={review.mediaUrl}>
                Your browser does not support the audio element.
              </audio>
            </div>
          )}

          <p className="text-sm leading-relaxed text-foreground">"{review.body}"</p>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function TestimonialsMarquee() {
  const { items: featured } = usePublicReviews({ featuredOnly: true });
  const [selected, setSelected] = useState<Review | null>(null);
  const [open, setOpen] = useState(false);

  const col1 = featured.filter((_, i) => i % 4 === 0);
  const col2 = featured.filter((_, i) => i % 4 === 1);
  const col3 = featured.filter((_, i) => i % 4 === 2);
  const col4 = featured.filter((_, i) => i % 4 === 3);

  // Ensure each column has items for a full 3D look
  const pad = (col: Review[], fallback: Review[]) =>
    col.length > 0 ? col : fallback.slice(0, Math.max(2, Math.ceil(featured.length / 4)));

  const c1 = pad(col1, featured);
  const c2 = pad(col2, featured);
  const c3 = pad(col3, featured);
  const c4 = pad(col4, featured);

  const openReview = (review: Review) => {
    setSelected(review);
    setOpen(true);
  };

  return (
    <section id="reviews" className="section-y overflow-hidden">
      <div className="container-page">
        <SectionHeader
          align="center"
          className="mb-12"
          eyebrow="Loved by outbound teams"
          title="Real teams. Real replies. Real revenue."
          description="Text, audio, and video reviews — managed from the admin CMS, click any card to watch or listen."
        />

        <div className="relative mx-auto flex h-[28rem] w-full flex-row items-center justify-center gap-4 overflow-hidden rounded-3xl border border-border bg-card/20 [perspective:300px] md:h-[32rem]">
          <div
            className="flex flex-row items-center gap-4"
            style={{
              transform:
                "translateX(-80px) translateY(0px) translateZ(-80px) rotateX(18deg) rotateY(-12deg) rotateZ(18deg)",
            }}
          >
            <Marquee pauseOnHover vertical className="h-[160%] [--duration:28s]">
              {c1.map((review) => (
                <ReviewCard key={`c1-${review.id}`} review={review} onOpen={openReview} />
              ))}
            </Marquee>
            <Marquee reverse pauseOnHover vertical className="h-[160%] [--duration:32s]">
              {c2.map((review) => (
                <ReviewCard key={`c2-${review.id}`} review={review} onOpen={openReview} />
              ))}
            </Marquee>
            <Marquee pauseOnHover vertical className="hidden h-[160%] [--duration:26s] md:flex">
              {c3.map((review) => (
                <ReviewCard key={`c3-${review.id}`} review={review} onOpen={openReview} />
              ))}
            </Marquee>
            <Marquee reverse pauseOnHover vertical className="hidden h-[160%] [--duration:34s] lg:flex">
              {c4.map((review) => (
                <ReviewCard key={`c4-${review.id}`} review={review} onOpen={openReview} />
              ))}
            </Marquee>
          </div>

          <div className="pointer-events-none absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-background" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-background" />
          <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background" />
        </div>

        <div className="mt-10 flex justify-center">
          <Link
            to="/reviews"
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-brand px-6 py-3.5 text-sm font-medium text-primary-foreground shadow-glow transition hover:opacity-95"
          >
            Explore all reviews <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      <ReviewDetailDialog review={selected} open={open} onOpenChange={setOpen} />
    </section>
  );
}
