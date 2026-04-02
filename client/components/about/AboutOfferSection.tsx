import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const offers = [
  { title: "Lash Services", to: "/services/lash" },
  { title: "Head Spa Treatments", to: "/services/head-spa" },
  { title: "Permanent Makeup (PMU)", to: "/services/pmu" },
  { title: "Esthetician", to: "/services/esthetician" },
] as const;

export function AboutOfferSection() {
  return (
    <section className="w-full bg-[#FAFAF5] px-6 md:px-10 pb-24 md:pb-28">
      <div className="max-w-[1536px] mx-auto flex flex-col gap-12 md:gap-14">
        <div className="flex flex-col items-center gap-4 text-center px-0 md:px-10">
          <p className="font-barlow font-light text-xs tracking-[0.083em] uppercase text-warm-brown">
            What we offer
          </p>
          <h2 className="font-barlow font-extralight text-[clamp(28px,3.5vw,44px)] leading-[1.15] tracking-[-0.03em] text-charcoal max-w-[720px]">
            Treatments &amp; services
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[rgba(103,92,83,0.10)] border border-[rgba(103,92,83,0.10)]">
          {offers.map(({ title, to }) => (
            <Link
              key={to}
              to={to}
              className="group bg-[#FAFAF5] flex flex-col justify-between min-h-[160px] px-10 md:px-12 py-10 transition-colors hover:bg-[#F4F4EF] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-charcoal"
            >
              <h3 className="font-barlow font-extralight text-[clamp(22px,2.5vw,28px)] leading-[1.2] tracking-[-0.02em] text-charcoal pr-8">
                {title}
              </h3>
              <span className="inline-flex items-center gap-2 font-barlow font-light text-[10px] tracking-[0.15em] uppercase text-warm-brown/80 group-hover:text-warm-brown mt-6">
                View service
                <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} aria-hidden />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
