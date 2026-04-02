import { Link } from "react-router-dom";
import { Clock, HelpCircle } from "lucide-react";

export function BookNowUnsureCta() {
  return (
    <section
      className="w-full border-t border-charcoal/[0.1] bg-[#FAF9F6] py-16 md:py-24 lg:py-28"
      aria-labelledby="book-now-unsure-heading"
    >
      <div className="mx-auto grid w-[90%] grid-cols-1 gap-14 lg:grid-cols-2 lg:items-start lg:gap-x-20 lg:gap-y-0">
        <div className="text-left">
          <h2
            id="book-now-unsure-heading"
            className="flex items-start gap-3 font-barlow text-[clamp(1.5rem,3vw,2rem)] font-extralight leading-snug tracking-[-0.02em] text-charcoal"
          >
            <HelpCircle
              className="mt-2 h-7 w-7 shrink-0 text-charcoal/70"
              strokeWidth={1.15}
              aria-hidden
            />
            <span>Not sure what to book?</span>
          </h2>
          <p className="mt-6 max-w-xl font-barlow text-base font-light leading-[1.7] text-charcoal/70 md:text-[17px]">
            Every face is unique. If you&apos;re uncertain about which treatment will best achieve your goals, we highly recommend starting with a consultation. Our specialists will guide you through a personalized plan.
          </p>
          <p className="mt-10 flex items-center gap-2 font-barlow text-[10px] font-light uppercase tracking-[0.18em] text-charcoal/45 md:text-[11px]">
            <Clock className="h-3.5 w-3.5 shrink-0 text-charcoal/40" strokeWidth={1.5} aria-hidden />
            <span>Rapid response during business hours.</span>
          </p>
        </div>

        <div className="flex flex-col items-center gap-6 lg:items-end">
          <Link
            to="/contact"
            className="flex w-full max-w-md items-center justify-center bg-primary px-10 py-5 font-barlow text-xs font-light uppercase tracking-[0.1em] text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary lg:max-w-[320px]"
          >
            Contact specialist
          </Link>
          <Link
            to="/gallery"
            className="font-barlow text-[10px] font-light uppercase tracking-[0.18em] text-charcoal/45 transition-colors hover:text-charcoal/65 md:text-[11px]"
          >
            View results gallery
          </Link>
        </div>
      </div>
    </section>
  );
}
