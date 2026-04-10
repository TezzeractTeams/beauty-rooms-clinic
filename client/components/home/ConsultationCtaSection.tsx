import { openMainMenuBoulevardBooking } from "@/lib/boulevardBooking";
import { Link } from "react-router-dom";

const DEFAULT_LINES = ["Ready to transform", "your look?"] as const;
const DEFAULT_SUBTEXT = "Secure your consultation at our Sarasota today.";
const DEFAULT_CTA = "Book a consultation";

const ctaClassName = `font-barlow font-light text-[11px] md:text-xs tracking-[0.12em] uppercase text-white border border-white bg-transparent px-10 py-4 md:px-12 md:py-5 rounded-none inline-block transition-colors hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white`;

export interface ConsultationCtaSectionProps {
  /** Unique id for aria-labelledby on the section heading */
  headingId?: string;
  /** Each string renders as a block line in the heading */
  titleLines?: readonly string[];
  subtext?: string | null;
  ctaLabel?: string;
  /**
   * When set, the CTA navigates to this route. When omitted, the CTA opens the Boulevard booking overlay
   * (same behavior as the header “Book Now” control).
   */
  ctaTo?: string;
}

export function ConsultationCtaSection({
  headingId = "consultation-cta-heading",
  titleLines = DEFAULT_LINES,
  subtext = DEFAULT_SUBTEXT,
  ctaLabel = DEFAULT_CTA,
  ctaTo,
}: ConsultationCtaSectionProps) {
  const lines = [...titleLines];

  const marginTopClass =
    subtext == null || subtext === "" ? "mt-4 md:mt-6" : "";

  const cta =
    ctaTo != null ? (
      <Link to={ctaTo} className={`${ctaClassName} ${marginTopClass}`}>
        {ctaLabel}
      </Link>
    ) : (
      <button
        type="button"
        onClick={() => openMainMenuBoulevardBooking()}
        className={`${ctaClassName} ${marginTopClass}`}
      >
        {ctaLabel}
      </button>
    );

  return (
    <section
      className="w-full bg-[#696969] flex flex-col items-center justify-center text-center px-6 py-28 md:py-36 lg:py-60"
      aria-labelledby={headingId}
    >
      <h2
        id={headingId}
        className="font-barlow font-extralight text-white text-5xl sm:text-6xl lg:text-7xl leading-[1.12] tracking-[-0.03em] mb-5"
      >
        {lines.map((line) => (
          <span key={line} className="block">
            {line}
          </span>
        ))}
      </h2>
      {subtext != null && subtext !== "" && (
        <p className="font-barlow font-extralight text-lg md:text-2xl text-white/75 max-w-xl mb-10 pt-10 md:mb-12">
          {subtext}
        </p>
      )}
      {cta}
    </section>
  );
}
