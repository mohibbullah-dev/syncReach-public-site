import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Image as ImageIcon, Play, Quote, Star, Type, Video } from "lucide-react";

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
    image: { icon: ImageIcon, label: "Image" },
    video: { icon: Video, label: "Video" },
  } as const;
  const { icon: Icon, label } = map[type];
  return (
    <span className="inline-flex items-center gap-1 rounded-[12px] border border-border bg-background/80 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-muted-foreground backdrop-blur">
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
        "group relative w-[17rem] cursor-pointer overflow-hidden rounded-[12px] border border-border bg-white p-4 text-left shadow-[0_14px_36px_-18px_rgba(15,23,42,0.32)] backdrop-blur transition sm:w-[18.5rem] sm:p-[1.125rem]",
        "hover:-translate-y-0.5 hover:border-brand/50 hover:shadow-glow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
      )}
    >
      <div className="mb-3 flex items-start justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <ProfileAvatar name={review.name} src={review.avatar} className="h-10 w-10 border border-border" />
          <div className="min-w-0">
            <div className="truncate text-sm font-bold">{review.name}</div>
            <div className="truncate text-xs text-muted-foreground">{review.username}</div>
          </div>
        </div>
        <TypeBadge type={review.type} />
      </div>

      {review.type === "video" && (
        <div className="relative mb-3 overflow-hidden rounded-[12px] border border-border bg-muted">
          {review.thumbnailUrl || isRealProfileImage(review.avatar) ? (
            <img
              src={review.thumbnailUrl || review.avatar}
              alt=""
              className="h-32 w-full object-cover opacity-90"
            />
          ) : (
            <div className="h-32 w-full bg-muted" />
          )}
          <div className="absolute inset-0 flex items-center justify-center bg-black/35">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-brand text-primary-foreground shadow-glow">
              <Play className="h-4 w-4 fill-current" />
            </span>
          </div>
        </div>
      )}

      {review.type === "image" && review.mediaUrl && (
        <div className="relative mb-3 overflow-hidden rounded-[12px] border border-border bg-muted">
          <img
            src={review.mediaUrl}
            alt=""
            className="h-32 w-full object-cover transition duration-500 group-hover:scale-[1.03]"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
        </div>
      )}

      {review.type === "text" && (
        <Quote className="mb-2 h-4 w-4 text-brand-glow/70" />
      )}

      <p className="line-clamp-3 text-sm leading-relaxed text-foreground/90">
        &ldquo;{review.body}&rdquo;
      </p>
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
      <DialogContent className="max-w-lg gap-0 overflow-hidden p-0 sm:rounded-[12px]">
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

          {review.type === "image" && review.mediaUrl && (
            <div className="overflow-hidden rounded-[12px] border border-border">
              <img
                key={review.id}
                src={review.mediaUrl}
                alt={`${review.name} review`}
                className="max-h-72 w-full object-cover"
              />
            </div>
          )}

          <p className="text-sm leading-relaxed text-foreground">"{review.body}"</p>
        </div>
      </DialogContent>
    </Dialog>
  );
}

/** Fill every column evenly so shorter cols don’t leave a blank top gap. */
function columnReviews(reviews: Review[], colIndex: number, colCount: number, min = 6): Review[] {
  if (reviews.length === 0) return [];
  const base = reviews.filter((_, i) => i % colCount === colIndex);
  const pool = base.length > 0 ? base : reviews;
  const out = [...pool];
  let i = 0;
  while (out.length < min) {
    out.push(pool[i % pool.length]);
    i += 1;
  }
  return out;
}

export function TestimonialsMarquee() {
  const { items: featured } = usePublicReviews({ featuredOnly: true });
  const [selected, setSelected] = useState<Review | null>(null);
  const [open, setOpen] = useState(false);

  const c1 = columnReviews(featured, 0, 4);
  const c2 = columnReviews(featured, 1, 4);
  const c3 = columnReviews(featured, 2, 4);
  const c4 = columnReviews(featured, 3, 4);

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
          title={
            <>
              TRUSTED BY B2B FOUNDERS
              <br />
              Real clients. Real results.
            </>
          }
          description="Hear directly from founders growing through outbound."
        />

        <div className="relative mx-auto flex h-[26rem] w-full flex-row items-stretch justify-center gap-3 overflow-hidden rounded-[12px] border border-border bg-card/20 p-3 sm:h-[30rem] sm:gap-5 sm:p-4 md:h-[34rem]">
          <Marquee pauseOnHover vertical repeat={5} className="h-full w-auto shrink-0 p-0 [--duration:55s] [--gap:1.25rem]">
            {c1.map((review, i) => (
              <ReviewCard key={`c1-${review.id}-${i}`} review={review} onOpen={openReview} />
            ))}
          </Marquee>
          <Marquee reverse pauseOnHover vertical repeat={5} className="h-full w-auto shrink-0 p-0 [--duration:62s] [--gap:1.25rem]">
            {c2.map((review, i) => (
              <ReviewCard key={`c2-${review.id}-${i}`} review={review} onOpen={openReview} />
            ))}
          </Marquee>
          <Marquee pauseOnHover vertical repeat={5} className="hidden h-full w-auto shrink-0 p-0 [--duration:58s] [--gap:1.25rem] md:flex">
            {c3.map((review, i) => (
              <ReviewCard key={`c3-${review.id}-${i}`} review={review} onOpen={openReview} />
            ))}
          </Marquee>
          <Marquee reverse pauseOnHover vertical repeat={5} className="hidden h-full w-auto shrink-0 p-0 [--duration:66s] [--gap:1.25rem] lg:flex">
            {c4.map((review, i) => (
              <ReviewCard key={`c4-${review.id}-${i}`} review={review} onOpen={openReview} />
            ))}
          </Marquee>

          <div className="pointer-events-none absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-background to-transparent sm:h-14" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-background to-transparent sm:h-14" />
          <div className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-background to-transparent sm:w-14" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-background to-transparent sm:w-14" />
        </div>

        <div className="mt-10 flex justify-center">
          <Link
            to="/reviews"
            className="inline-flex items-center gap-2 rounded-[12px] bg-gradient-brand px-6 py-3.5 text-sm font-medium text-primary-foreground shadow-glow transition hover:opacity-95"
          >
            Explore all reviews <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      <ReviewDetailDialog review={selected} open={open} onOpenChange={setOpen} />
    </section>
  );
}
