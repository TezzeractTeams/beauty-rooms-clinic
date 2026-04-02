import { BenefitCard } from "./BenefitCard";
import { benefits } from "./benefits-data";

export function WelcomeSection() {
  return (
    <section className="w-full bg-[#FAFAF5] px-6 md:px-10 py-24 md:py-28 lg:py-[119px]">
      <div className="max-w-[1536px] mx-auto flex flex-col gap-16 md:gap-20 lg:gap-24">
        <div className="flex flex-col items-center gap-6 md:gap-8 text-center px-0 md:px-10">
          <h2 className="font-barlow font-extralight text-[clamp(32px,4vw,52px)] leading-[1.15] tracking-[-0.03em] text-charcoal max-w-[1110px]">
            Welcome to Beauty Rooms Clinic
          </h2>
          <p className="font-barlow font-light text-base leading-[1.7] text-[rgba(45,41,38,0.70)] max-w-[1110px]">
            At Beauty Rooms Clinic, we specialize in natural-looking results that enhance your features without looking overdone. Our experienced professionals provide personalized treatments tailored to your goals, ensuring safe, high-quality care in a comfortable environment.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 border border-[rgba(103,92,83,0.10)] gap-px bg-[rgba(103,92,83,0.10)]">
          {benefits.map((b, i) => (
            <BenefitCard key={i} {...b} />
          ))}
        </div>
      </div>
    </section>
  );
}
