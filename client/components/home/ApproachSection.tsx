const steps = [
  {
    num: "01",
    title: "Consultation & Mapping",
    description:
      "We map your brows using the Golden Ratio to ensure perfect symmetry and facial harmony.",
  },
  {
    num: "02",
    title: "Pigment Selection",
    description:
      "Custom-blended pigments are selected to match your skin's undertone and natural hair color.",
  },
  {
    num: "03",
    title: "Precision Application",
    description:
      "Using specialized tools, we create ultra-fine strokes that are indistinguishable from real hair.",
  },
] as const;

export function ApproachSection() {
  return (
    <section className="w-full bg-[#FAFAF5] flex flex-col md:flex-row min-h-[480px] md:min-h-[560px]">
      <div className="w-full md:w-[48%] lg:w-[50%] aspect-[4/3] md:aspect-auto overflow-hidden flex-shrink-0">
        <img
          src="/images/our-products.png"
          alt="Beauty treatment in progress at Beauty Rooms Clinic"
          className="w-full h-full object-cover object-center"
        />
      </div>

      <div className="flex-1 bg-[#F4F4EF] flex flex-col justify-center px-8 md:px-12 lg:px-16 xl:px-20 py-14 md:py-16">
        <p className="font-barlow font-light text-[10px] tracking-[0.15em] uppercase text-warm-brown/70 mb-5">
          Our Process
        </p>
        <h2 className="font-barlow font-light text-[clamp(32px,4vw,52px)] leading-[1.15] tracking-[-0.03em] text-charcoal mb-10 max-w-[520px]">
          The Beauty Rooms Clinic Approach
        </h2>

        <ul className="flex flex-col gap-8 md:gap-10 max-w-[520px] list-none p-0 m-0">
          {steps.map((step) => (
            <li key={step.num} className="flex gap-4 md:gap-6">
              <span
                className="font-barlow font-light text-[clamp(36px,5vw,52px)] leading-none text-charcoal/20 tabular-nums flex-shrink-0"
                aria-hidden
              >
                {step.num}
              </span>
              <div className="min-w-0 pt-1">
                <h3 className="font-barlow font-normal text-lg md:text-xl text-charcoal mb-2">
                  {step.title}
                </h3>
                <p className="font-barlow font-light text-base leading-[1.7] text-[rgba(45,41,38,0.70)]">
                  {step.description}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
