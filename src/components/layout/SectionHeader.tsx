import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type SectionHeaderProps = {
  eyebrow?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  /** Reading width for the header block */
  width?: "sm" | "md";
  className?: string;
  as?: "h1" | "h2";
};

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "center",
  width = "sm",
  className,
  as = "h2",
}: SectionHeaderProps) {
  const Heading = as;
  const centered = align === "center";

  return (
    <div
      className={cn(
        width === "sm" ? "max-w-2xl" : "max-w-3xl",
        centered && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow ? (
        <div className={cn("mb-3", centered && "flex justify-center")}>
          {typeof eyebrow === "string" || typeof eyebrow === "number" ? (
            <span className="section-eyebrow mb-0">
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden />
              {eyebrow}
            </span>
          ) : (
            eyebrow
          )}
        </div>
      ) : null}
      <Heading className="text-balance text-3xl font-bold tracking-tight md:text-5xl">
        {title}
      </Heading>
      {description ? (
        <p
          className={cn(
            "mt-4 text-lg leading-relaxed text-muted-foreground",
            centered && "mx-auto",
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
