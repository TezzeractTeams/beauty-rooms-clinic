interface ServiceCategoryIntroProps {
  /** Short category label, e.g. "Lash" */
  title: string;
  /** Supporting copy below the title (optional) */
  description?: string;
}

export function ServiceCategoryIntro({ title, description }: ServiceCategoryIntroProps) {
  return (
    <section
      className="w-full bg-[#F9F8F6] px-6 pt-14 pb-12 md:pt-16 md:pb-14 lg:pt-20 lg:pb-16 text-center border-t border-[rgba(103,92,83,0.1)]"
      aria-labelledby="category-intro-heading"
    >
      <div className="mx-auto max-w-[640px]">
        <h2
          id="category-intro-heading"
          className="font-barlow font-extralight text-[clamp(28px,4.5vw,44px)] leading-[1.15] tracking-[-0.03em] text-charcoal mb-5 md:mb-6"
        >
          {title}
        </h2>
        {description ? (
          <p className="font-barlow font-light text-base md:text-lg leading-[1.65] text-[#757575]">
            {description}
          </p>
        ) : null}
      </div>
    </section>
  );
}
