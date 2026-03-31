export function AboutWhoSection() {
  return (
    <section className="w-full bg-[#FAFAF5] px-6 md:px-10 py-24 md:py-28 lg:py-[100px]">
      <div className="max-w-[1536px] mx-auto flex flex-col items-center gap-4 text-center px-0 md:px-10">
        <p className="font-barlow font-light text-xs tracking-[0.083em] uppercase text-warm-brown">
          Who we are
        </p>
        <p className="font-barlow font-light text-[clamp(20px,3vw,36px)] leading-[1.65] tracking-[-0.067em] text-charcoal max-w-[1110px]">
          A premium beauty and aesthetics clinic focused on enhancing natural features through personalized
          treatments and expert care.
        </p>
      </div>
    </section>
  );
}
