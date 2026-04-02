import { Link } from "react-router-dom";
import { ClockIcon } from "@/components/home/icons";
import type { FeaturedServiceCardData } from "./service-category-detail-sample";

interface ServiceFeaturedCardProps {
  service: FeaturedServiceCardData;
  /** Unique id for heading + aria-labelledby when multiple cards render on one page */
  headingId?: string;
}

export function ServiceFeaturedCard({ service, headingId = "featured-service-heading" }: ServiceFeaturedCardProps) {
  const { name, description, duration, imageSrc, imageAlt } = service;

  return (
    <section className="w-full bg-[#FAF9F6]" aria-labelledby={headingId}>
      <div className="mx-auto flex w-full max-w-[1400px] flex-col gap-6 px-6 py-8 md:flex-row md:items-center md:gap-10 lg:gap-12 md:px-12 md:py-10 lg:px-[90px] lg:py-12">
        <div className="min-w-0 w-full md:w-[56%] lg:max-w-[640px] text-left">
          <h2
            id={headingId}
            className="font-barlow font-extralight text-[clamp(22px,2.8vw,34px)] leading-[1.2] tracking-[-0.02em] text-charcoal mb-3"
          >
            {name}
          </h2>
          <p className="font-barlow font-light text-sm md:text-[15px] leading-[1.6] text-[#757575] mb-4 max-w-[540px]">
            {description}
          </p>
          {duration ? (
            <div className="flex items-center gap-2.5 mb-4">
              <span
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[rgba(109,99,91,0.35)] text-[#6D635B]"
                aria-hidden
              >
                <span className="scale-[0.75] opacity-80">
                  <ClockIcon />
                </span>
              </span>
              <span className="font-barlow font-light text-[10px] md:text-[11px] tracking-[0.2em] uppercase text-[#8E8E8E]">
                {duration}
              </span>
            </div>
          ) : null}
          <div className="border-t border-[rgba(103,92,83,0.18)] pt-4">
            <Link
              to="/bookings"
              className="inline-flex items-center justify-center min-w-[160px] px-8 py-3 bg-primary text-primary-foreground font-barlow font-light text-xs tracking-[0.12em] uppercase hover:bg-primary/90 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              Book now
            </Link>
          </div>
        </div>

        <div className="flex w-full shrink-0 justify-center md:flex-1 md:min-w-0 md:justify-end">
          <div className="h-[220px] w-[165px] shrink-0 md:h-[260px] md:w-[195px] lg:h-[280px] lg:w-[210px]">
            <img
              src={imageSrc}
              alt={imageAlt}
              className="h-full w-full rounded-none object-cover object-center"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
