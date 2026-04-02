import { Link } from "react-router-dom";
import { ArrowRightIcon } from "./icons";

export function HeroSection() {
  return (
    <section className="relative w-full min-h-[calc(100vh-85px)] overflow-hidden bg-[#FAFAF5]">
      <div className="absolute inset-0">
        <video
          className="w-full h-full object-cover object-center"
          src="/video/hero%20video.webm"
          autoPlay
          muted
          loop
          playsInline
          aria-hidden
        />
      </div>

      <div className="relative z-10 flex flex-col justify-end min-h-[calc(100vh-85px)] px-6 md:px-10 lg:px-[90px] py-32">
        <div className="max-w-[900px] flex flex-col gap-4">
          <h1 className="font-barlow font-light leading-[1.05] tracking-[-0.05em] text-[clamp(42px,6vw,72px)] text-white flex flex-col">
            <span>Advanced</span>
            <span>Beauty &amp; Aesthetic</span>
            <span>Clinic in Sarasota, FL</span>
          </h1>

          <div className="mt-6">
            <Link
              to="/services"
              className="inline-flex items-center gap-3 px-10 py-5 bg-primary text-primary-foreground font-barlow font-light text-xs tracking-[0.1em] uppercase hover:bg-primary/90 transition-colors"
            >
              <span>Explore our services</span>
              <ArrowRightIcon />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
