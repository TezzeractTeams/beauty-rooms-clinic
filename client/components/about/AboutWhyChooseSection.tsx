const reasons = [
  "Certified professionals",
  "Customized treatments",
  "Premium products",
  "Trusted in Sarasota",
] as const;

export function AboutWhyChooseSection() {
  return (
    <section className="w-full bg-[#FAFAF5] px-6 md:px-10 py-24 md:py-28 lg:py-[100px]">
      <div className="max-w-[1536px] mx-auto flex flex-col md:flex-row gap-14 md:gap-20 lg:gap-24 items-start">
        <div className="md:w-[42%] lg:w-[40%] flex-shrink-0">
          <p className="font-barlow font-light text-[10px] tracking-[0.15em] uppercase text-warm-brown/70 mb-5">
            Why choose us
          </p>
          <h2 className="font-barlow font-light text-[clamp(28px,3.5vw,44px)] leading-[1.15] tracking-[-0.03em] text-charcoal max-w-[400px]">
            The Beauty Rooms difference
          </h2>
        </div>

        <ul className="flex-1 list-none p-0 m-0 flex flex-col gap-6 md:gap-8 max-w-[520px]">
          {reasons.map((text) => (
            <li key={text} className="flex gap-4 items-baseline">
              <span className="font-barlow font-light text-xl text-charcoal/25 flex-shrink-0" aria-hidden>
                —
              </span>
              <span className="font-barlow font-light text-lg md:text-xl text-charcoal leading-[1.5]">{text}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
