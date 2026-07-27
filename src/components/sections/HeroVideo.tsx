import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";

import heroThumbUrl from "@/assets/hero-video-thumb.png";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import {
  defaultHeroCarousel,
  type HeroContent,
  type HeroSlide,
} from "@/data/hero";
import { cn } from "@/lib/utils";

const FALLBACK_VIDEO_SRC =
  (import.meta.env.VITE_HERO_VIDEO_URL as string | undefined)?.trim() ||
  "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4";

type HeroMediaProps = {
  hero: HeroContent;
  className?: string;
};

const shellClass =
  "relative mx-auto w-full max-w-lg overflow-hidden rounded-[12px] shadow-[0_20px_50px_-24px_rgba(15,23,42,0.4)] ring-1 ring-black/5 sm:max-w-xl sm:shadow-[0_28px_70px_-28px_rgba(15,23,42,0.35)] lg:max-w-none";

export function HeroMedia({ hero, className }: HeroMediaProps) {
  const slides = hero.slides?.length
    ? [...hero.slides].sort((a, b) => a.sortOrder - b.sortOrder)
    : [];

  if (slides.length === 0) {
    return <HeroFallback className={className} />;
  }

  if (slides.length === 1) {
    return <HeroSingleSlide slide={slides[0]} className={className} />;
  }

  return <HeroSlidesCarousel hero={hero} slides={slides} className={className} />;
}

function HeroFallback({ className }: { className?: string }) {
  return (
    <div className={cn(shellClass, className)}>
      <video
        className="aspect-[16/10] w-full bg-slate-900 object-cover object-center sm:aspect-[16/11]"
        poster={heroThumbUrl}
        src={FALLBACK_VIDEO_SRC}
        playsInline
        preload="metadata"
        muted
      />
    </div>
  );
}

function HeroSingleSlide({ slide, className }: { slide: HeroSlide; className?: string }) {
  return (
    <div className={cn(shellClass, className)}>
      {slide.type === "image" ? (
        <img
          src={slide.mediaUrl || heroThumbUrl}
          alt=""
          className="aspect-[16/10] w-full bg-slate-900 object-cover object-center sm:aspect-[16/11]"
        />
      ) : (
        <HeroVideoSlide slide={slide} active />
      )}
    </div>
  );
}

function HeroSlidesCarousel({
  hero,
  slides,
  className,
}: HeroMediaProps & { slides: HeroSlide[] }) {
  const carousel = hero.carousel ?? defaultHeroCarousel;
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const intervalRef = useRef<number | null>(null);

  const onSelect = useCallback((nextApi: CarouselApi) => {
    setCurrent(nextApi.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!api) return;
    onSelect(api);
    api.on("select", onSelect);
    api.on("reInit", onSelect);
    return () => {
      api.off("select", onSelect);
      api.off("reInit", onSelect);
    };
  }, [api, onSelect]);

  useEffect(() => {
    if (!api || !carousel.autoplay || slides.length <= 1) return;

    const tick = () => {
      if (paused) return;
      if (carousel.loop || api.canScrollNext()) {
        api.scrollNext();
      } else {
        api.scrollTo(0);
      }
    };

    intervalRef.current = window.setInterval(tick, carousel.autoplayIntervalMs);
    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
    };
  }, [api, carousel.autoplay, carousel.autoplayIntervalMs, carousel.loop, paused, slides.length]);

  return (
    <div
      className={cn(shellClass, className)}
      onMouseEnter={() => carousel.pauseOnHover && setPaused(true)}
      onMouseLeave={() => carousel.pauseOnHover && setPaused(false)}
    >
      <Carousel
        setApi={setApi}
        opts={{ loop: carousel.loop, align: "start" }}
        className="relative w-full"
      >
        <CarouselContent className="-ml-0">
          {slides.map((slide, index) => (
            <CarouselItem key={slide.id ?? `hero-slide-${index}`} className="pl-0">
              {slide.type === "image" ? (
                <img
                  src={slide.mediaUrl || heroThumbUrl}
                  alt=""
                  className="aspect-[16/10] w-full bg-slate-900 object-cover object-center sm:aspect-[16/11]"
                />
              ) : (
                <HeroVideoSlide slide={slide} active={current === index} />
              )}
            </CarouselItem>
          ))}
        </CarouselContent>

        {carousel.showArrows ? (
          <>
            <button
              type="button"
              aria-label="Previous slide"
              onClick={() => api?.scrollPrev()}
              className="absolute left-3 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-white/90 text-slate-800 shadow-sm transition hover:bg-white"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              aria-label="Next slide"
              onClick={() => api?.scrollNext()}
              className="absolute right-3 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-white/90 text-slate-800 shadow-sm transition hover:bg-white"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </>
        ) : null}
      </Carousel>

      {carousel.showDots ? (
        <div className="absolute bottom-3 left-0 right-0 z-20 flex justify-center gap-1.5">
          {slides.map((slide, index) => (
            <button
              key={slide.id ?? `dot-${index}`}
              type="button"
              aria-label={`Go to slide ${index + 1}`}
              onClick={() => api?.scrollTo(index)}
              className={cn(
                "h-2 rounded-full transition-all",
                current === index ? "w-5 bg-brand" : "w-2 bg-white/70 hover:bg-white",
              )}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}

function HeroVideoSlide({ slide, active }: { slide: HeroSlide; active: boolean }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const videoSrc = slide.mediaUrl?.trim() || FALLBACK_VIDEO_SRC;
  const poster = slide.posterUrl?.trim() || heroThumbUrl;

  useEffect(() => {
    if (!active && videoRef.current) {
      videoRef.current.pause();
      setPlaying(false);
    }
  }, [active]);

  const play = async () => {
    const video = videoRef.current;
    if (!video) return;
    try {
      await video.play();
      setPlaying(true);
    } catch {
      setPlaying(false);
    }
  };

  return (
    <div className="relative">
      <video
        ref={videoRef}
        className="aspect-[16/10] w-full bg-slate-900 object-cover object-center sm:aspect-[16/11]"
        poster={poster}
        src={videoSrc}
        playsInline
        preload="metadata"
        controls={playing}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => setPlaying(false)}
      />

      {!playing ? (
        <button
          type="button"
          onClick={() => void play()}
          aria-label="Play video"
          className="group absolute inset-0 flex items-center justify-center"
        >
          <img src={poster} alt="" className="absolute inset-0 h-full w-full object-cover" />
          <span className="absolute inset-0 bg-slate-950/20 transition group-hover:bg-slate-950/30" />
          <span className="relative z-10 flex h-14 w-14 items-center justify-center sm:h-[4.5rem] sm:w-[4.5rem] md:h-20 md:w-20">
            <span className="absolute inset-0 rounded-full bg-brand/30 animate-hero-play-ring" aria-hidden />
            <span
              className="absolute -inset-1.5 rounded-full border border-white/35 animate-hero-play-ring [animation-delay:0.35s] sm:-inset-2"
              aria-hidden
            />
            <span
              className="absolute -inset-3 rounded-full border border-brand/25 animate-hero-play-ring [animation-delay:0.7s] sm:-inset-5"
              aria-hidden
            />
            <span className="relative flex h-12 w-12 items-center justify-center rounded-full bg-white text-brand shadow-[0_12px_40px_-10px_rgba(0,97,255,0.55)] transition duration-300 group-hover:scale-105 group-active:scale-95 sm:h-16 sm:w-16 md:h-[4.25rem] md:w-[4.25rem]">
              <Play className="ml-0.5 h-5 w-5 fill-current sm:h-7 sm:w-7" />
            </span>
          </span>
        </button>
      ) : null}
    </div>
  );
}

/** @deprecated Use HeroMedia */
export { HeroMedia as HeroVideo };
