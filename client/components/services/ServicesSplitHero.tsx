import type { ReactNode } from "react";

export interface ServicesSplitHeroProps {
  /** Used for `aria-labelledby` on the section and as the main heading `id` */
  headingId: string;
  eyebrow: string;
  title: ReactNode;
  body?: ReactNode;
  imageSrc: string;
  imageAlt: string;
  cta?: ReactNode;
}

export function ServicesSplitHero({
  headingId,
  eyebrow,
  title,
  body,
  imageSrc,
  imageAlt,
  cta,
}: ServicesSplitHeroProps) {
  return (
    <section
      className="flex w-full min-h-[calc(100dvh-85px)] flex-col bg-[#F9F8F6] md:h-[calc(100dvh-85px)] md:flex-row md:items-stretch"
      aria-labelledby={headingId}
    >
      <div className="flex w-full flex-1 flex-col justify-center px-6 py-14 md:h-full md:w-1/2 md:flex-none md:px-10 md:py-10 lg:px-[90px]">
        <div className="mx-auto w-full max-w-xl md:mx-0">
          <p className="font-barlow font-light text-[10px] md:text-xs tracking-[0.15em] uppercase text-[#757575] mb-5 md:mb-6">
            {eyebrow}
          </p>
          <h1
            id={headingId}
            className="font-barlow font-light text-[clamp(40px,8vw,96px)] leading-[1.05] tracking-[-0.04em] text-charcoal mb-6 md:mb-8"
          >
            {title}
          </h1>
          {body != null && body !== "" ? (
            <p className="font-barlow font-light text-base md:text-lg leading-[1.65] text-[#757575] mb-10 md:mb-12 max-w-[540px]">
              {body}
            </p>
          ) : null}
          {cta}
        </div>
      </div>

      <div className="relative w-full min-h-[45vh] flex-1 md:h-full md:w-1/2 md:flex-none md:min-h-0">
        <img
          src={imageSrc}
          alt={imageAlt}
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
      </div>
    </section>
  );
}
