import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export function AboutExpertsSection() {
  return (
    <section className="w-full bg-[#FAFAF5] flex flex-col md:flex-row min-h-[400px] md:min-h-[480px]">
      <div className="flex-1 bg-[#F4F4EF] flex flex-col justify-center px-8 md:px-12 lg:px-16 xl:px-20 py-14 md:py-16">
        <div className="flex flex-col gap-6 md:gap-8 max-w-[520px]">
          <h2 className="font-barlow font-light text-[clamp(32px,4vw,52px)] leading-[1.15] tracking-[-0.03em] text-charcoal">
            Our experts
          </h2>
          <p className="font-barlow font-light text-base leading-[1.7] text-[rgba(45,41,38,0.70)]">
            Meet our certified specialists in lash artistry, PMU, and skin treatments.
          </p>
        </div>
        <div className="mt-8">
          <Link
            to="/experts"
            className="inline-flex items-center gap-2 font-barlow font-light text-xs tracking-[0.1em] uppercase text-charcoal border-b border-charcoal/30 pb-1 hover:border-charcoal transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-charcoal"
          >
            Meet Our Experts
            <ArrowRight className="h-4 w-4" strokeWidth={1.5} aria-hidden />
          </Link>
        </div>
      </div>

      <div className="w-full md:w-[48%] lg:w-[50%] aspect-[4/3] md:aspect-auto overflow-hidden flex-shrink-0">
        <img
          src="/images/experts.webp"
          alt="Beauty Rooms Clinic interior"
          className="w-full h-full object-cover object-center"
        />
      </div>
    </section>
  );
}
