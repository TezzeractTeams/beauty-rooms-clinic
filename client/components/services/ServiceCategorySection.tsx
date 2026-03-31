import { Link } from "react-router-dom";
import { BenefitCard } from "@/components/home/BenefitCard";
import { ArrowRightIcon, BadgeCheckIcon, ClockIcon, SparkleIcon } from "@/components/home/icons";
import type { ServiceCategory } from "./services-data";

const benefitIcons = [<SparkleIcon key="s" />, <BadgeCheckIcon key="b" />, <ClockIcon key="c" />] as const;
const benefitTitleWeights: ("font-light" | "font-normal")[] = ["font-light", "font-normal", "font-light"];

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
    imageClassName,
    imageOnLeft,
  } = category;

  return (
    <section
      id={category.id}
      className="w-full bg-[#FAFAF5] flex flex-col md:flex-row min-h-[480px] md:min-h-[560px] scroll-mt-24"
      aria-labelledby={`${category.id}-heading`}
    >
      <div
        className={`w-full md:w-[48%] lg:w-[50%] aspect-[4/3] md:aspect-auto overflow-hidden flex-shrink-0 ${
          imageOnLeft ? "" : "md:order-2"
        }`}
      >
        <img
          src={imageSrc}
          alt={imageAlt}
          className={`w-full h-full object-cover object-center ${imageClassName ?? ""}`}
        />
      </div>

      <div
        className={`flex-1 bg-[#F4F4EF] flex flex-col justify-center px-8 md:px-12 lg:px-16 xl:px-20 py-14 md:py-16 min-w-0 ${
          imageOnLeft ? "" : "md:order-1"
        }`}
      >
        <p className="font-barlow font-light text-[10px] tracking-[0.15em] uppercase text-warm-brown/70 mb-5">
          {eyebrow}
        </p>
        <h2
          id={`${category.id}-heading`}
          className="font-barlow font-light text-[clamp(32px,4vw,52px)] leading-[1.15] tracking-[-0.03em] text-charcoal mb-8 max-w-[520px]"
        >
          <Link
            to={`/services/${category.id}`}
            className="text-inherit no-underline transition-opacity hover:opacity-85 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-charcoal rounded-sm"
          >
            {title}
          </Link>
        </h2>

        <ul
          className="flex flex-col gap-3 md:gap-4 max-w-[520px] list-none p-0 m-0 mb-10"
          aria-label={`${title} — included treatments`}
        >
          {treatments.map((item) => (
            <li
              key={item}
              className="font-barlow font-light text-base leading-[1.7] text-[rgba(45,41,38,0.70)] pl-0 border-l-0"
            >
              {item}
            </li>
          ))}
        </ul>

        <p className="font-barlow font-light text-[10px] tracking-[0.15em] uppercase text-warm-brown/70 mb-4">
          Benefits
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 border border-[rgba(103,92,83,0.10)] gap-px bg-[rgba(103,92,83,0.10)] mb-10">
          {benefits.map((b, i) => (
            <BenefitCard
              key={b.title}
              icon={benefitIcons[i % 3]}
              title={b.title}
              description={b.description || undefined}
              titleWeight={benefitTitleWeights[i % 3]}
            />
          ))}
        </div>

        <div>
          <Link
            to="/bookings"
            className="inline-flex items-center gap-3 px-10 py-5 bg-charcoal text-cream font-barlow font-light text-xs tracking-[0.1em] uppercase hover:bg-charcoal/90 transition-colors"
          >
            <span>{ctaLabel}</span>
            <ArrowRightIcon />
          </Link>
        </div>
      </div>
    </section>
  );
}
