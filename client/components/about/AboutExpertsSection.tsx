import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export function AboutExpertsSection() {
  return (
    <section className="w-full bg-[#FAFAF5] flex flex-col md:flex-row min-h-[400px] md:min-h-[480px]">
      <div className="flex-1 bg-[#F4F4EF] flex flex-col justify-center px-8 md:px-12 lg:px-16 xl:px-20 py-14 md:py-16">
        <p className="font-barlow font-light text-[10px] tracking-[0.15em] uppercase text-warm-brown/70 mb-5">
          Our experts
        </p>
        <h2 className="font-barlow font-light text-[clamp(28px,3.5vw,44px)] leading-[1.15] tracking-[-0.03em] text-charcoal mb-8 max-w-[520px]">
          Meet our certified specialists in lash artistry, PMU, and skin treatments.
        </h2>
        <div>
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
          src="https://api.builder.io/api/v1/image/assets/TEMP/311c7b6313d6b19839dbb5fd6c0d417d258f9130?width=1600"
          alt="Beauty Rooms Clinic interior"
          className="w-full h-full object-cover object-center"
        />
      </div>
    </section>
  );
}
