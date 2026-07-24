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
  align = "left",
  width = "sm",
  className,
  as = "h2",
}: SectionHeaderProps) {
  const Heading = as;

  return (
    <div
      className={cn(
        width === "sm" ? "max-w-2xl" : "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow ? (
        <div className={typeof eyebrow === "string" || typeof eyebrow === "number" ? "section-eyebrow" : "mb-3"}>
          {eyebrow}
        </div>
      ) : null}
      <Heading className="text-3xl font-bold tracking-tight md:text-5xl">{title}</Heading>
      {description ? (
        <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{description}</p>
      ) : null}
    </div>
  );
}
