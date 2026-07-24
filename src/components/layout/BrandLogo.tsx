import { Link } from "@tanstack/react-router";

import markUrl from "@/assets/syncreach-mark.png";
import { cn } from "@/lib/utils";

type BrandLogoProps = {
  className?: string;
  markClassName?: string;
  textClassName?: string;
  /** Use router Link to home when true */
  toHome?: boolean;
};

export function BrandLogo({
  className,
  markClassName,
  textClassName,
  toHome = true,
}: BrandLogoProps) {
  const content = (
    <>
      <img
        src={markUrl}
        alt=""
        aria-hidden
        className={cn(
          "h-9 w-9 shrink-0 object-contain object-center sm:h-10 sm:w-10",
          markClassName,
        )}
      />
      <span
        aria-hidden
        className={cn(
          "font-display text-[1.2rem] font-bold leading-tight tracking-tight sm:text-[1.4rem]",
          textClassName,
        )}
      >
        <span className="text-[#0a1628]">Sync</span>
        <span className="text-brand-glow">Reach</span>
      </span>
      <span className="sr-only">SyncReach</span>
    </>
  );

  const classes = cn(
    "group inline-flex items-center gap-2.5 overflow-visible rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
    className,
  );

  if (toHome) {
    return (
      <Link to="/" className={classes}>
        {content}
      </Link>
    );
  }

  return <div className={classes}>{content}</div>;
}
