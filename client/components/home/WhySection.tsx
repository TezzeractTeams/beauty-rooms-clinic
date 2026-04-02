export function WhySection() {
  return (
    <section className="w-full bg-[#FAFAF5] flex flex-col md:flex-row min-h-[480px] md:min-h-[560px]">
      <div className="w-full md:w-[48%] lg:w-[50%] aspect-[4/3] md:aspect-auto overflow-hidden flex-shrink-0">
        <img
          src="/images/curated.webp"
          alt="Curated care tailored to your features"
          className="w-full h-full object-cover object-center"
        />
      </div>

      <div className="flex-1 bg-[#F4F4EF] flex flex-col justify-center px-8 md:px-12 lg:px-16 xl:px-20 py-14 md:py-16">
        <p className="font-barlow font-light text-[10px] tracking-[0.15em] uppercase text-warm-brown/70 mb-5">
          Why Beauty Rooms Clinics?
        </p>
        <h2 className="font-barlow font-light text-[clamp(32px,4vw,52px)] leading-[1.15] tracking-[-0.03em] text-charcoal mb-8 max-w-[480px]">
          Curated Care for Your Unique Features
        </h2>
        <p className="font-barlow font-light text-base leading-[1.7] text-[rgba(45,41,38,0.70)] max-w-[440px] mb-6">
          We believe beauty is an intimate expression of self. Our approach transcends standard aesthetics, focusing instead on the subtle harmony of your natural features.
        </p>
        <p className="font-barlow font-light text-base leading-[1.7] text-[rgba(45,41,38,0.70)] max-w-[440px]">
          Every treatment plan is a collaboration—a personalized journey toward results that look as authentic as they feel. We provide a sanctuary where medical precision meets editorial artistry.
        </p>
      </div>
    </section>
  );
}
