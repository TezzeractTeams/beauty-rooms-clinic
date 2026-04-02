export function AboutExperienceSection() {
  return (
    <section className="w-full bg-[#FAFAF5] flex flex-col md:flex-row min-h-[400px] md:min-h-[480px]">
      <div className="w-full md:w-[48%] lg:w-[50%] aspect-[4/3] md:aspect-auto overflow-hidden flex-shrink-0 order-2 md:order-1">
        <img
          src="/images/our-products.png"
          alt="Treatment experience at Beauty Rooms Clinic"
          className="w-full h-full object-cover object-center"
        />
      </div>

      <div className="flex-1 bg-[#FAFAF5] md:bg-[#F4F4EF] flex flex-col justify-center px-8 md:px-12 lg:px-16 xl:px-20 py-14 md:py-16 order-1 md:order-2">
        <p className="font-barlow font-light text-[10px] tracking-[0.15em] uppercase text-warm-brown/70 mb-5">
          The experience
        </p>
        <h2 className="font-barlow font-extralight text-[clamp(28px,3.5vw,44px)] leading-[1.15] tracking-[-0.03em] text-charcoal mb-6 max-w-[480px]">
          A space designed for you
        </h2>
        <p className="font-barlow font-light text-base leading-[1.7] text-[rgba(45,41,38,0.70)] max-w-[440px]">
          A calm, clean, and professional environment designed for comfort, safety, and high-quality results.
        </p>
      </div>
    </section>
  );
}
