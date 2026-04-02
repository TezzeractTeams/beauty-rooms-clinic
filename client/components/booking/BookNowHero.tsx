export function BookNowHero() {
  return (
    <section
      className="w-full bg-[#F9F9F7] pt-16 pb-10 text-center md:pt-20 md:pb-14 lg:pt-24 lg:pb-16"
      aria-labelledby="book-now-heading"
    >
      <div className="mx-auto w-[90%]">
        <p className="mb-4 font-barlow text-[10px] font-light uppercase tracking-[0.2em] text-charcoal/45 md:text-xs">
          Reservation portal
        </p>
        <h1
          id="book-now-heading"
          className="mx-auto mb-6 max-w-5xl font-barlow text-[clamp(2rem,5vw,3.5rem)] font-extralight leading-[1.1] tracking-[-0.02em] text-charcoal"
        >
          Book Your Appointment
        </h1>
        <p className="mx-auto max-w-3xl font-barlow text-base font-light leading-[1.65] text-charcoal/60 md:text-lg">
          Step into a world of bespoke aesthetic excellence. Select your desired treatment path below to begin your journey with Beauty Rooms Clinic.
        </p>
      </div>
    </section>
  );
}
