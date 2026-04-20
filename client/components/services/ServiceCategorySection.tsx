import { Link } from "react-router-dom";
import { BenefitCard } from "@/components/home/BenefitCard";
import { openMainMenuBoulevardBooking } from "@/lib/boulevardBooking";
import { ArrowRightIcon, BadgeCheckIcon, ClockIcon, SparkleIcon } from "@/components/home/icons";
import type { ServiceCategory } from "./service-types";

const benefitIcons = [<SparkleIcon key="s" />, <BadgeCheckIcon key="b" />, <ClockIcon key="c" />] as const;

interface ServiceCategorySectionProps {
  category: ServiceCategory;
}

export function ServiceCategorySection({ category }: ServiceCategorySectionProps) {
  const {
    eyebrow,
    title,
    treatments,
    benefits,
    ctaLabel,
    imageSrc,
    imageAlt,
    listingImageSrc,
    listingImageAlt,
    imageClassName,
    imageOnLeft,
  } = category;

  const splitImageSrc = listingImageSrc ?? imageSrc;
  const splitImageAlt = listingImageAlt ?? imageAlt;

  return (
    <section
      id={category.id}
      className="w-full bg-[#FAFAF5] flex flex-col md:flex-row md:items-stretch min-h-[80vh] scroll-mt-24"
      aria-labelledby={`${category.id}-heading`}
    >
      <div
        className={`w-full md:w-[48%] lg:w-[50%] aspect-[4/3] min-h-[45vh] md:min-h-0 md:aspect-auto overflow-hidden flex-shrink-0 ${
          imageOnLeft ? "" : "md:order-2"
        }`}
      >
        <img
          src={splitImageSrc}
          alt={splitImageAlt}
          className={`w-full h-full object-cover object-center ${imageClassName ?? ""}`}
        />
      </div>

      <div
        className={`flex-1 bg-[#F4F4EF] flex flex-col justify-center px-8 md:px-12 lg:px-16 xl:px-20 py-14 md:py-16 min-w-0 ${
          imageOnLeft ? "" : "md:order-1"
        }`}
      >
      
        <h2
          id={`${category.id}-heading`}
          className="font-barlow font-extralight text-[clamp(32px,4vw,52px)] leading-[1.15] tracking-[-0.03em] text-charcoal mb-8 max-w-[520px]"
        >
          <Link
            to={`/services/${category.id}`}
            className="text-inherit no-underline transition-opacity hover:opacity-85 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-charcoal rounded-sm"
          >
            {title}
          </Link>
        </h2>

    

        <h3 className="font-barlow font-extralight text-2xl leading-8 tracking-[-0.02em] text-[#2D2926] mb-4">
          Benefits
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 mb-10">
          {benefits.map((b, i) => (
            <BenefitCard
              key={b.title}
              icon={benefitIcons[i % 3]}
              title={b.title}
              description={b.description || undefined}
              titleWeight="font-extralight"
              compact
              align="left"
            />
          ))}
        </div>

        <div>
          <button
            type="button"
            onClick={() => openMainMenuBoulevardBooking()}
            className="inline-flex items-center gap-3 px-10 py-5 bg-primary text-primary-foreground font-barlow font-light text-xs tracking-[0.1em] uppercase hover:bg-primary/90 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            <span>{ctaLabel}</span>
            <ArrowRightIcon />
          </button>
        </div>
      </div>
    </section>
  );
}
