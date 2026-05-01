import { Globe, Star } from "lucide-react";
import { Link } from "react-router-dom";
import type { Professional } from "./professionals-data";

interface ProfessionalCardProps {
  professional: Professional;
  headingId: string;
}

export function ProfessionalCard({ professional, headingId }: ProfessionalCardProps) {
  const {
    name,
    title,
    rating,
    tags,
    description,
    imageSrc,
    imageAlt,
    ctaLabel,
    bookingDisabled,
    websiteUrl,
    bookingCategory,
  } = professional;

  const ratingLabel = rating.toFixed(1);
  const bookLabel = ctaLabel ?? `Book with ${name}`;
  const bookingTo =
    bookingCategory != null && bookingCategory !== ""
      ? { pathname: "/booking", search: `?category=${encodeURIComponent(bookingCategory)}` }
      : "/booking";

  return (
    <article
      className="flex h-full min-h-0 flex-col border border-[#E8E6E1] bg-white shadow-sm"
      aria-labelledby={headingId}
    >
      <div className="aspect-square w-full overflow-hidden bg-[#2a2a2a]">
        <img
          src={imageSrc}
          alt={imageAlt}
          className="h-full w-full object-cover object-center "
          loading="lazy"
        />
      </div>

      <div className="flex flex-1 flex-col gap-4 p-6 md:p-7">
        <div className="flex items-start justify-between gap-3">
          <h2
            id={headingId}
            className="font-barlow text-2xl font-extralight tracking-[-0.02em] text-charcoal md:text-[26px]"
          >
            {name}
          </h2>
          <div
            className="flex shrink-0 items-center gap-1 rounded-full bg-[#EFEEEB] px-2.5 py-1 text-charcoal"
            aria-label={`Rating ${ratingLabel} out of 5`}
          >
            <Star className="h-3.5 w-3.5 fill-charcoal/20 text-charcoal" strokeWidth={1.2} />
            <span className="font-barlow text-xs font-medium tabular-nums">{ratingLabel}</span>
          </div>
        </div>

        <p className="font-barlow text-[10px] font-light tracking-[0.14em] uppercase text-[#8A847C]">
          {title}
        </p>

        <ul className="flex list-none flex-wrap gap-2 p-0" aria-label="Focus areas">
          {tags.map((tag) => (
            <li
              key={tag}
              className="rounded-full bg-[#E4EBF5] px-3 py-1 font-barlow text-[10px] font-medium tracking-[0.08em] uppercase text-[#3D4F6F]"
            >
              {tag}
            </li>
          ))}
        </ul>

        <p className="font-barlow text-sm font-light leading-[1.65] text-[#6B6560]">{description}</p>

        <div className="mt-auto flex items-stretch gap-3 pt-2">
          {bookingDisabled ? (
            <button
              type="button"
              disabled
              className="inline-flex flex-1 items-center justify-center rounded-lg bg-primary px-4 py-3.5 text-center font-barlow text-xs font-light tracking-[0.1em] uppercase text-primary-foreground transition-colors disabled:cursor-not-allowed disabled:bg-primary/50"
            >
              {bookLabel}
            </button>
          ) : (
            <Link
              to={bookingTo}
              className="inline-flex flex-1 items-center justify-center rounded-lg bg-primary px-4 py-3.5 text-center font-barlow text-xs font-light tracking-[0.1em] uppercase text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              {bookLabel}
            </Link>
          )}
          {websiteUrl ? (
            <a
              href={websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-lg border border-[#E0DDD8] text-charcoal/70 transition-colors hover:border-[#C9C4BC] hover:text-charcoal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-charcoal"
              aria-label={`${name} — website`}
            >
              <Globe className="h-5 w-5" strokeWidth={1.25} />
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}
