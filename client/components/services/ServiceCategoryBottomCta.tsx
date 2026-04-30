import { getCategoryBottomCta } from "./services-from-json";
import { Link } from "react-router-dom";

interface ServiceCategoryBottomCtaProps {
  categoryId: string;
}

export function ServiceCategoryBottomCta({ categoryId }: ServiceCategoryBottomCtaProps) {
  const copy = getCategoryBottomCta(categoryId);
  if (!copy) return null;

  const headingId = `category-bottom-cta-${categoryId}`;

  return (
    <section
      className="w-full min-h-[70vh] bg-charcoal flex flex-col items-center justify-center px-6 py-16 md:py-20 text-center"
      aria-labelledby={headingId}
    >
      <h2
        id={headingId}
        className="font-barlow font-extralight text-white text-[clamp(32px,5vw,56px)] leading-[1.12] tracking-[-0.03em] mb-6 md:mb-8 max-w-4xl"
      >
        Ready for effortless {copy.headingHighlight}?
      </h2>
      <p className="font-barlow font-extralight text-base md:text-xl text-white/80 max-w-2xl mb-10 md:mb-12 leading-relaxed">
        {copy.subtext}
      </p>
      <Link
        to="/booking"
        className="font-barlow font-light text-[11px] md:text-xs tracking-[0.14em] uppercase bg-white text-charcoal px-10 py-4 md:px-12 md:py-5 rounded-none inline-block transition-colors hover:bg-white/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
      >
        {copy.buttonLabel}
      </Link>
    </section>
  );
}
