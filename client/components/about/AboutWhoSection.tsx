export function AboutWhoSection() {
  return (
    <section className="w-full bg-[#FAFAF5] px-6 md:px-10 py-24 md:py-28 lg:py-[119px]">
      <div className="max-w-[1536px] mx-auto flex flex-col gap-16 md:gap-20 lg:gap-24">
        <div className="flex flex-col items-center gap-6 md:gap-8 text-center px-0 md:px-10">
          <h2 className="font-barlow font-light text-[clamp(32px,4vw,52px)] leading-[1.15] tracking-[-0.03em] text-charcoal max-w-[1110px]">
            Who we are
          </h2>
          <p className="font-barlow font-light text-base leading-[1.7] text-[rgba(45,41,38,0.70)] max-w-[1110px]">
            A premium beauty and aesthetics clinic focused on enhancing natural features through personalized
            treatments and expert care.
          </p>
        </div>
      </div>
    </section>
  );
}
