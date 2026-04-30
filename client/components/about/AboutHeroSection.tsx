import { ArrowRightIcon } from "@/components/home/icons";
import { Link } from "react-router-dom";

export function AboutHeroSection() {
  return (
    <section className="relative w-full min-h-[calc(70vh-85px)] overflow-hidden bg-[#FAFAF5]">
      <div className="absolute inset-0">
        <img
          src="/images/about.jpeg"
          alt="Beauty Rooms Clinic"
          className="h-full w-full object-cover"
          style={{ objectPosition: "30% 50%" }}
        />
      </div>

      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, rgba(250,250,245,0.92) 0%, rgba(250,250,245,0.90) 38.94%, rgba(250,250,245,0.40) 57.69%, rgba(250,250,245,0.00) 77.88%)",
        }}
      />

      <div className="relative z-10 flex flex-col justify-end min-h-[calc(70vh-85px)] px-6 md:px-10 lg:px-[90px] py-24 md:py-28">
        <div className="max-w-[900px] flex flex-col gap-5">
          <h1 className="font-barlow font-extralight leading-none tracking-[-0.05em] text-[clamp(36px,5vw,64px)] text-charcoal capitalize">
            About Beauty Rooms Clinic
          </h1>
          <p className="font-barlow font-light text-lg md:text-xl leading-[1.65] text-[rgba(45,41,38,0.75)] max-w-[640px]">
            Refined, natural beauty delivered with expertise in Sarasota.
          </p>
          <div className="mt-4">
            <Link
              to="/booking"
              className="inline-flex items-center gap-3 px-10 py-5 bg-primary text-primary-foreground font-barlow font-light text-xs tracking-[0.1em] uppercase hover:bg-primary/90 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              <span>Book Now</span>
              <ArrowRightIcon />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
