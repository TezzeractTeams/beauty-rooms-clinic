export default function ComingSoon() {
  return (
    <section className="relative w-full min-h-dvh overflow-hidden bg-charcoal">
      <div className="absolute inset-0">
        <img
          src="/images/commingsoon.jpeg"
          alt=""
          className="h-full w-full object-cover object-center"
        />
      </div>
      <div
        className="absolute inset-0 bg-black/25"
        aria-hidden
      />

      <div className="relative z-10 flex min-h-dvh flex-col justify-end px-6 py-24 md:px-10 md:py-32 lg:px-[90px]">
        <div className="max-w-[900px] flex flex-col gap-4">
          <p className="font-barlow font-light text-xs tracking-[0.1em] uppercase text-white/80">
            Beauty Rooms Clinic
          </p>
          <h1 className="font-barlow font-extralight leading-[1.05] tracking-[-0.05em] text-[clamp(42px,6vw,72px)] text-white">
            Coming Soon
          </h1>
          <p className="font-barlow font-light max-w-md text-base leading-6 text-white/75">
            We are preparing something new. Please check back shortly.
          </p>
        </div>
      </div>
    </section>
  );
}
