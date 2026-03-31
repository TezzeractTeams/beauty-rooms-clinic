import { Link } from "react-router-dom";
import { ArrowRightIcon, ClockIcon } from "@/components/home/icons";
import type { FeaturedServiceCardData } from "./service-category-detail-sample";

interface ServiceFeaturedCardProps {
  service: FeaturedServiceCardData;
}

export function ServiceFeaturedCard({ service }: ServiceFeaturedCardProps) {
  const { name, description, duration, imageSrc, imageAlt } = service;

  return (
    <section
      className="w-full bg-[#F9F8F6] border-t border-[rgba(103,92,83,0.12)]"
      aria-labelledby="featured-service-heading"
    >
      <div className="mx-auto flex w-full max-w-[1100px] flex-col items-center gap-8 px-6 py-10 md:flex-row md:justify-center md:items-center md:gap-12 md:px-10 md:py-12 lg:px-[90px]">
        <div className="w-full max-w-[520px] text-center">
          <h2
            id="featured-service-heading"
            className="font-barlow font-light text-[clamp(22px,3vw,34px)] leading-[1.2] tracking-[-0.02em] text-charcoal mb-4"
          >
            {name}
          </h2>
          <p className="font-barlow font-light text-sm md:text-base leading-[1.65] text-[rgba(45,41,38,0.72)] mb-5 mx-auto max-w-[480px]">
            {description}
          </p>
          <div className="flex justify-center items-center gap-2.5 mb-5">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[rgba(103,92,83,0.25)] text-warm-brown/70">
              <span className="scale-[0.75]">
                <ClockIcon />
              </span>
            </span>
            <span className="font-barlow font-light text-[10px] md:text-xs tracking-[0.15em] uppercase text-[#8E8E8E]">
              {duration}
            </span>
          </div>
          <div className="border-t border-[rgba(103,92,83,0.15)] pt-5 flex justify-center">
            <Link
              to="/bookings"
              className="inline-flex items-center gap-3 px-8 py-4 bg-charcoal text-cream font-barlow font-light text-xs tracking-[0.1em] uppercase hover:bg-charcoal/90 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-charcoal"
            >
              <span>Book now</span>
              <ArrowRightIcon />
            </Link>
          </div>
        </div>

        <div className="w-full max-w-[320px] shrink-0 md:max-w-[300px] lg:max-w-[340px] mx-auto md:mx-0">
          <img
            src={imageSrc}
            alt={imageAlt}
            className="aspect-[4/3] max-h-[220px] w-full rounded-sm object-cover object-center md:max-h-[260px] md:aspect-square lg:max-h-[280px] mx-auto"
          />
        </div>
      </div>
    </section>
  );
}
