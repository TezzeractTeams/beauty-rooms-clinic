import { Link } from "react-router-dom";
import { ArrowRightIcon } from "@/components/home/icons";

/** Beveled frame: top-left and bottom-right corners cut at 45° */
const imageClipPath =
  "polygon(11% 0%, 100% 0%, 100% 89%, 89% 100%, 0% 100%, 0% 11%)";

export function SpecialistsHero() {
  return (
    <section
      className="flex w-full min-h-[calc(100dvh-85px)] flex-col bg-[#F9F8F3] md:h-[calc(100dvh-85px)] md:flex-row md:items-stretch"
      aria-labelledby="specialists-page-heading"
    >
      <div className="flex w-full flex-1 flex-col justify-center px-6 py-14 md:h-full md:w-1/2 md:flex-none md:px-10 md:py-10 lg:px-[90px]">
        <div className="mx-auto w-full max-w-xl md:mx-0">
          <h1
            id="specialists-page-heading"
            className="font-barlow font-extralight text-[clamp(36px,7vw,76px)] leading-[1.05] tracking-[-0.03em] text-charcoal mb-6 md:mb-8 md:font-extralight"
          >
            Meet our
            <br />
            Specialists
          </h1>
          <p className="font-barlow font-light text-base md:text-lg leading-[1.65] text-charcoal/75 mb-10 md:mb-12 max-w-[540px]">
            Our team of certified beauty professionals combine technical expertise with an eye for natural aesthetics.
          </p>
          <div className="flex flex-col items-start gap-6 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-10 sm:gap-y-4">
            <Link
              to="/services"
              className="inline-flex w-fit items-center gap-3 px-10 py-5 bg-primary text-primary-foreground font-barlow font-light text-xs tracking-[0.1em] uppercase transition-colors hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              <span>Explore our services</span>
              <ArrowRightIcon />
            </Link>
            <Link
              to="/booking"
              className="font-barlow font-light text-xs tracking-[0.1em] uppercase text-[#6B635B] underline decoration-[#6B635B] underline-offset-[5px] transition-opacity hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-charcoal"
            >
              Book your appointment today
            </Link>
          </div>
        </div>
      </div>

      <div className="relative flex w-full flex-1 flex-col justify-center px-6 pb-14 pt-0 md:h-full md:w-1/2 md:flex-none md:min-h-0 md:px-10 md:py-10 lg:pr-[90px] lg:pl-6">
        <div
          className="relative mx-auto aspect-[4/5] w-full max-w-md min-h-[80vh] md:mx-0 md:aspect-auto  md:w-full md:max-w-none"
          style={{ clipPath: imageClipPath }}
        >
          <img
            src="/images/prof.jpeg"
            alt="Modern treatment room with professional chair, cabinetry, and natural light"
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
        </div>
      </div>
    </section>
  );
}
