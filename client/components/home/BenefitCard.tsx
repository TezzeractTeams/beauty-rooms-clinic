import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface BenefitCardProps {
  /** Full-bleed image in the top half of the card (home / about style). */
  imageSrc?: string;
  imageAlt?: string;
  icon?: ReactNode;
  title: string;
  description?: string;
  titleWeight?: string;
  /** Tighter icon layout for service category grids. */
  compact?: boolean;
  /** Text and icon alignment; defaults to centered (home / about). */
  align?: "center" | "left";
}

export function BenefitCard({
  imageSrc,
  imageAlt = "",
  icon,
  title,
  description,
  titleWeight = "font-extralight",
  compact,
  align = "center",
}: BenefitCardProps) {
  const hasImage = Boolean(imageSrc);
  const isLeft = align === "left";

  return (
    <article
      className={cn(
        "flex flex-col overflow-hidden bg-[#F4F4EF]",
        isLeft ? "text-left" : "text-center",
        compact ? "h-full" : "h-full min-h-0",
      )}
    >
      {hasImage ? (
        <div className="relative w-full shrink-0 aspect-[4/3] overflow-hidden bg-[#2D2926]/5">
          <img src={imageSrc} alt={imageAlt} className="h-full w-full object-cover object-center" />
        </div>
      ) : null}

      <div
        className={cn(
          "flex flex-1 flex-col",
          isLeft ? "items-start" : "items-center",
          compact ? "px-5 py-6 md:px-6 md:py-7" : "px-7 py-8 md:px-9 md:py-10",
        )}
      >
        {!hasImage && icon ? (
          <div
            className={cn(
              compact
                ? "mb-4 inline-block origin-top scale-[0.88] [&_svg]:block"
                : "mb-8 [&_svg]:block",
            )}
          >
            {icon}
          </div>
        ) : null}

        <h3
          className={cn(
            "font-barlow text-[#2D2926] mb-3 max-w-full",
            !isLeft && "mx-auto",
            compact
              ? `${titleWeight} text-xl leading-snug tracking-[-0.02em]`
              : "font-extralight text-[clamp(1.2rem,2vw,1.5rem)] leading-snug tracking-[-0.02em]",
          )}
        >
          {title}
        </h3>

        {description ? (
          <p
            className={cn(
              "font-barlow font-light text-[#2D2926]/65 leading-relaxed ",
              !isLeft && "mx-auto",
              compact ? "text-sm leading-[1.55]" : "text-[0.9375rem] leading-[1.65]",
            )}
          >
            {description}
          </p>
        ) : null}
      </div>
    </article>
  );
}
