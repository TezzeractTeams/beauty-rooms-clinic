import { BenefitCard } from "@/components/home/BenefitCard";
import { aboutApproachItems } from "./approach-data";

export function AboutApproachSection() {
  return (
    <section className="w-full bg-[#FAFAF5] px-6 md:px-10 pb-24 md:pb-28 lg:pb-[100px]">
      <div className="max-w-[1536px] mx-auto flex flex-col gap-14 md:gap-16">
        <div className="flex flex-col items-center gap-4 text-center px-0 md:px-10">
          <p className="font-barlow font-light text-xs tracking-[0.083em] uppercase text-warm-brown">
            Our approach
          </p>
          <h2 className="font-barlow font-extralight text-[clamp(28px,3.5vw,44px)] leading-[1.15] tracking-[-0.03em] text-charcoal max-w-[720px]">
            How we care for you
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
          {aboutApproachItems.map((item) => (
            <BenefitCard key={item.title} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}
