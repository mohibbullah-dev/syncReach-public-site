import { useRef, useState } from "react";
import { Play } from "lucide-react";

import heroThumbUrl from "@/assets/hero-video-thumb.png";
import type { HeroContent } from "@/data/hero";
import { cn } from "@/lib/utils";

const FALLBACK_VIDEO_SRC =
  (import.meta.env.VITE_HERO_VIDEO_URL as string | undefined)?.trim() ||
  "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4";

type HeroMediaProps = {
  hero: HeroContent;
  className?: string;
};

export function HeroMedia({ hero, className }: HeroMediaProps) {
  if (hero.mediaType === "image") {
    return <HeroImage hero={hero} className={className} />;
  }
  return <HeroVideo hero={hero} className={className} />;
}

function HeroImage({ hero, className }: HeroMediaProps) {
  const src = hero.mediaUrl?.trim() || heroThumbUrl;

  return (
    <div
      className={cn(
        "relative mx-auto w-full max-w-lg overflow-hidden rounded-[12px] shadow-[0_20px_50px_-24px_rgba(15,23,42,0.4)] ring-1 ring-black/5 sm:max-w-xl sm:shadow-[0_28px_70px_-28px_rgba(15,23,42,0.35)] lg:max-w-none",
        className,
      )}
    >
      <img
        src={src}
        alt=""
        className="aspect-[16/10] w-full bg-slate-900 object-cover object-center sm:aspect-[16/11]"
      />
    </div>
  );
}

function HeroVideo({ hero, className }: HeroMediaProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const videoSrc = hero.mediaUrl?.trim() || FALLBACK_VIDEO_SRC;
  const poster = hero.posterUrl?.trim() || heroThumbUrl;

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
    <div
      className={cn(
        "relative mx-auto w-full max-w-lg overflow-hidden rounded-[12px] shadow-[0_20px_50px_-24px_rgba(15,23,42,0.4)] ring-1 ring-black/5 sm:max-w-xl sm:shadow-[0_28px_70px_-28px_rgba(15,23,42,0.35)] lg:max-w-none",
        className,
      )}
    >
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
          <img
            src={poster}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
          />
          <span className="absolute inset-0 bg-slate-950/20 transition group-hover:bg-slate-950/30" />
          <span className="relative z-10 flex h-14 w-14 items-center justify-center sm:h-[4.5rem] sm:w-[4.5rem] md:h-20 md:w-20">
            <span
              className="absolute inset-0 rounded-full bg-brand/30 animate-hero-play-ring"
              aria-hidden
            />
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
