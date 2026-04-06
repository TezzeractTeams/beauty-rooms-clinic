import { FaqServiceAccordion } from "@/components/FaqServiceAccordion";
import { FinishedLooksGallerySection } from "@/components/FinishedLooksGallerySection";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import {
  FAQ_DATA_SERVICE_MICRONEEDLING,
  getFaqItemsForCategoryService,
} from "@/lib/faq-from-json";
import { MICRONEEDLING_HERO_BOOKING_URL_PARAMS, openBoulevardBookingWidget } from "@/lib/boulevardBooking";
import { cn } from "@/lib/utils";
import { Clock, ScanLine, Shield, Sparkles, TrendingUp } from "lucide-react";
import { type ComponentProps } from "react";
import { Link, useNavigate } from "react-router-dom";

/** Fallback when `window.blvd` is not ready (e.g. injector still loading). Hero uses overlay + PMU path via `openBoulevardBookingWidget`. */
const BOOKING_MICRONEEDLING_LAUNCH = "/bookings?specialist=Erica#booking-embed";

const cardBorder = "border border-[rgba(103,92,83,0.12)]";
const mutedBody = "font-barlow text-base font-light leading-[1.65] text-[rgba(45,41,38,0.78)] md:text-lg";

const faqCardClass =
  "border border-[rgba(103,92,83,0.12)] bg-[#FAFAF5] px-6 py-8 md:px-10 md:py-10";

/** Full-face lifestyle hero — glowing skin, not treatment close-up */
const HERO_LIFESTYLE_SRC = "/images/about.jpeg";

/** Placeholder slots for before & after; swap src when assets are ready */
const TRANSFORMATION_SLOTS: { src: string; alt: string }[] = [
  {
    src: "/images/commingsoon.jpeg",
    alt: "Microneedling result — skin texture before and after (image coming soon)",
  },
  {
    src: "/images/commingsoon.jpeg",
    alt: "Microneedling result — clarity and tone before and after (image coming soon)",
  },
  {
    src: "/images/commingsoon.jpeg",
    alt: "Microneedling result — fine lines and glow before and after (image coming soon)",
  },
];

function SectionContainer({ children, className, ...rest }: ComponentProps<"div">) {
  return (
    <div className={cn("mx-auto w-full max-w-6xl px-6 md:px-10", className)} {...rest}>
      {children}
    </div>
  );
}

const radiantBenefits = [
  {
    title: "Smoother, Clearer Skin",
    body: "Target texture and blemishes.",
    Icon: Sparkles,
  },
  {
    title: "Reduce Fine Lines",
    body: "Stimulate natural collagen.",
    Icon: TrendingUp,
  },
  {
    title: "Minimal Downtime",
    body: "Advanced techniques for faster recovery.",
    Icon: Clock,
  },
  {
    title: "Customized For You",
    body: "Treatments tailored to your skin type.",
    Icon: ScanLine,
  },
] as const;

export default function MicroneedlingSpecial() {
  const navigate = useNavigate();
  const microneedlingFaqItems = getFaqItemsForCategoryService("PMU", FAQ_DATA_SERVICE_MICRONEEDLING);

  const openMicroneedlingHeroBooking = () => {
    const opened = openBoulevardBookingWidget(MICRONEEDLING_HERO_BOOKING_URL_PARAMS);
    if (!opened) {
      navigate(BOOKING_MICRONEEDLING_LAUNCH);
    }
  };

  return (
    <Layout>
      <article>
        {/* Hero — LuxeLookLashOffer split: copy left, lifestyle right */}
        <section className="w-full bg-[#FAFAF5]" aria-labelledby="microneedling-hero-heading">
          <div className="flex min-h-[min(100dvh,720px)] flex-col md:min-h-[calc(100dvh-85px)] md:flex-row">
            <div className="flex w-full flex-col justify-center bg-[#FAFAF5] px-6 pb-10 pt-24 md:w-1/2 md:max-w-[50%] md:py-16 md:pl-10 md:pr-8 lg:pl-14 lg:pr-10 xl:pl-20">
              <div className="mx-auto w-full max-w-xl md:mx-0">
                <p className="font-barlow text-[10px] font-light uppercase tracking-[0.15em] text-warm-brown/85 md:text-xs">
                  Medical-grade microneedling · Erica&apos;s launch
                </p>
                <h1
                  id="microneedling-hero-heading"
                  className="mt-3 font-barlow font-extralight text-[clamp(32px,5vw,56px)] leading-[1.05] tracking-[-0.05em] text-charcoal md:mt-4"
                >
                  Get Smoother, Clearer Skin: Erica&apos;s Medical-Grade Microneedling Launch Offer.
                </h1>
                <p className={`mt-4 ${mutedBody}`}>
                  Reduce fine lines and wrinkles with a medical-grade treatment customized for your skin. Experience
                  radiant results with minimal downtime.
                </p>
                <div className="mt-6">
                  <p className="font-barlow text-2xl font-light tracking-[-0.02em] text-charcoal md:text-3xl">
                    [Price TBD] Launch Special
                  </p>
                </div>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <Button
                    type="button"
                    size="lg"
                    className="w-full min-h-[48px] rounded-none px-8 py-6 font-barlow text-xs font-light uppercase tracking-[0.1em] sm:w-auto"
                    onClick={openMicroneedlingHeroBooking}
                  >
                    Claim the offer
                  </Button>
                </div>
              </div>
            </div>
            <div className="relative min-h-[min(42vh,380px)] w-full md:w-1/2 md:max-w-[50%] md:min-h-[calc(100dvh-85px)] md:flex-1">
              <img
                src={HERO_LIFESTYLE_SRC}
                alt="Woman with healthy, radiant skin — lifestyle portrait at Beauty Rooms Clinic"
                className="absolute inset-0 h-full w-full object-cover object-[center_22%]"
                fetchPriority="high"
                decoding="async"
              />
            </div>
          </div>
        </section>

        <FinishedLooksGallerySection sectionHeadingId="microneedling-gallery-heading" />

        {/* Radiant Results — feature grid */}
        <section
          className="w-full bg-[#F9F8F6] py-14 md:py-20 lg:py-24"
          aria-labelledby="radiant-results-heading"
        >
          <SectionContainer>
            <h2
              id="radiant-results-heading"
              className="mb-10 text-center font-barlow text-[clamp(26px,3.5vw,36px)] font-extralight tracking-[-0.03em] text-charcoal md:mb-14"
            >
              Radiant results
            </h2>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
              {radiantBenefits.map(({ title, body, Icon }) => (
                <div
                  key={title}
                  className={`flex flex-col items-center text-center ${cardBorder} bg-[#FAFAF5] px-6 py-8 md:px-8 md:py-10`}
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center border border-[rgba(103,92,83,0.15)] bg-white/60">
                    <Icon className="h-6 w-6 text-warm-brown" strokeWidth={1.25} aria-hidden />
                  </div>
                  <h3 className="font-barlow text-lg font-extralight tracking-[-0.02em] text-charcoal">{title}</h3>
                  <p className="mt-2 font-barlow text-sm font-light leading-relaxed text-[rgba(45,41,38,0.72)] md:text-base">
                    {body}
                  </p>
                </div>
              ))}
            </div>
          </SectionContainer>
        </section>

        {/* Knowledge — LuxeLookLashOffer science section: media + copy */}
        <section
          className="w-full bg-[#F4F4EF] px-6 py-14 md:px-10 md:py-20 lg:py-24"
          aria-labelledby="science-skin-heading"
        >
          <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-2 lg:items-start lg:gap-14">
            <div>
              <h2
                id="science-skin-heading"
                className="mb-6 font-barlow text-[clamp(26px,3.5vw,36px)] font-extralight tracking-[-0.03em] text-charcoal lg:mb-8"
              >
                The Science of Skin Renewal.
              </h2>
              <div className={`overflow-hidden rounded-sm ${cardBorder} bg-[#2a2a2a]`}>
                <div className="relative aspect-[9/16] max-h-[min(520px,70dvh)] w-full sm:aspect-video sm:max-h-none">
                  <img
                    src="/images/Permanent%20Makeup.webp"
                    alt=""
                    aria-hidden
                    className="absolute inset-0 h-full w-full object-cover object-center opacity-90"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-black/35 px-6 text-center">
                    <p className="font-barlow text-sm font-light uppercase tracking-[0.12em] text-white/95">
                      Video coming soon
                    </p>
                    <p className="max-w-sm font-barlow text-xs font-light leading-relaxed text-white/85">
                      Erica demonstrating the medical-grade microneedling process — check back shortly.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-6 font-barlow font-light leading-[1.7] text-[rgba(45,41,38,0.78)]">
              <p className="text-base md:text-lg">
                Microneedling creates controlled micro-channels in the skin. That signal tells your body to renew:
                collagen and elastin increase naturally, so texture, fine lines, and clarity can improve over a series
                of treatments.
              </p>
              <p className="text-base md:text-lg">
                Medical-grade care means sterile, single-use needle protocols, clinical hygiene standards, and a
                treatment plan matched to your skin — not a one-size-fits-all pass.
              </p>
              <Button
                type="button"
                className="w-full min-h-[48px] rounded-none px-8 py-5 font-barlow text-xs font-light uppercase tracking-[0.1em] sm:w-auto"
                asChild
              >
                <Link to={BOOKING_MICRONEEDLING_LAUNCH}>Claim the offer</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Transformation gallery — three B&A slots */}
        <section
          className="w-full bg-[#F9F8F6] py-14 md:py-20 lg:py-24"
          aria-labelledby="transformation-gallery-heading"
        >
          <SectionContainer>
            <h2
              id="transformation-gallery-heading"
              className="mb-3 text-center font-barlow text-[clamp(28px,4vw,40px)] font-extralight tracking-[-0.03em] text-charcoal"
            >
              Real Results: Smoother, Clearer Skin.
            </h2>
            <p className="mb-10 text-center font-barlow text-sm font-light text-[rgba(45,41,38,0.65)] md:mb-12 md:text-base">
              Results may vary based on skin type, goals, and series completion.
            </p>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
              {TRANSFORMATION_SLOTS.map((img, i) => (
                <div
                  key={i}
                  className={`overflow-hidden rounded-sm ${cardBorder} bg-[#F4F4EF]`}
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="aspect-[4/5] w-full object-cover object-center"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              ))}
            </div>
          </SectionContainer>
        </section>

        {/* Meet Erica — same split pattern as LuxeLookLashOffer “Meet Andrezza” */}
        <section
          className="flex w-full flex-col bg-[#FAFAF5] md:min-h-[480px] md:flex-row"
          aria-labelledby="erica-microneedling-heading"
        >
          <div className="order-2 flex flex-1 flex-col justify-center px-8 py-12 md:order-1 md:px-12 lg:px-16 xl:px-20">
            <div className="mx-auto flex max-w-[540px] flex-col gap-5">
              <div className="flex items-center gap-2 text-warm-brown">
                <Shield className="h-5 w-5 shrink-0" strokeWidth={1.25} aria-hidden />
                <span className="font-barlow text-[10px] font-light uppercase tracking-[0.14em] text-warm-brown/85">
                  Certified specialist care
                </span>
              </div>
              <h2
                id="erica-microneedling-heading"
                className="font-barlow text-[clamp(28px,4vw,40px)] font-extralight leading-[1.15] tracking-[-0.03em] text-charcoal"
              >
                Meet the Specialist: Erica
              </h2>
              <p className="font-barlow text-xs font-light uppercase tracking-[0.12em] text-[rgba(45,41,38,0.55)]">
                Specialist in Permanent Makeup (PMU) &amp; Advanced Skin Aesthetics.
              </p>
              <p className="font-barlow text-base font-light leading-[1.7] text-[rgba(45,41,38,0.72)]">
                Erica specializes in high-performance skin treatments. She provides medical-grade care customized to
                bridge the gap between traditional beauty and advanced aesthetics.
              </p>
              <div
                className={`${cardBorder} bg-primary/5 px-4 py-3 font-barlow text-sm font-light leading-relaxed text-charcoal md:text-[15px]`}
                role="note"
              >
                <span className="font-normal text-charcoal">Follow-on work bonus:</span> Book a second procedure (Eye
                Liner or Lip Tint) and get 1 Microneedling session for FREE (usual price $200).
              </div>
              <div className="pt-1">
                <Button
                  type="button"
                  className="w-full min-h-[48px] rounded-none px-8 py-5 font-barlow text-xs font-light uppercase tracking-[0.1em] sm:w-auto"
                  asChild
                >
                  <Link to={BOOKING_MICRONEEDLING_LAUNCH}>Claim the offer</Link>
                </Button>
              </div>
            </div>
          </div>
          <div className="order-1 aspect-[4/3] w-full overflow-hidden bg-[#2a2a2a] md:order-2 md:aspect-auto md:w-[48%] md:max-w-[560px] md:flex-shrink-0">
            <img
              src="/images/Erica.JPG"
              alt="Erica, PMU and advanced skin aesthetics specialist at Beauty Rooms Clinic"
              className="h-full w-full object-cover object-center"
              loading="lazy"
              decoding="async"
            />
          </div>
        </section>

        {/* Offer summary + FAQ — LuxeLookLashOffer two-column block (no iframe — direct booking) */}
        <section
          className="w-full bg-[#F9F8F6] px-6 py-14 md:px-10 md:py-20 lg:py-24"
          aria-labelledby="launch-includes-heading"
        >
          <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <h2
                id="launch-includes-heading"
                className="mb-6 font-barlow text-[clamp(24px,3vw,32px)] font-extralight tracking-[-0.03em] text-charcoal"
              >
                Launch offer at a glance
              </h2>
              <ul className="list-none space-y-4 p-0 font-barlow text-base font-light leading-[1.65] text-[rgba(45,41,38,0.78)]">
                <li className="flex flex-col gap-1 border-b border-[rgba(103,92,83,0.12)] pb-4 sm:flex-row sm:flex-wrap sm:gap-3">
                  <span className="font-medium text-charcoal">Consultation &amp; skin assessment</span>
                  <span className="hidden text-[rgba(45,41,38,0.6)] sm:inline">—</span>
                  <span>Personalized plan for your goals and skin type.</span>
                </li>
                <li className="flex flex-col gap-1 border-b border-[rgba(103,92,83,0.12)] pb-4 sm:flex-row sm:flex-wrap sm:gap-3">
                  <span className="font-medium text-charcoal">Medical-grade session</span>
                  <span className="hidden text-[rgba(45,41,38,0.6)] sm:inline">—</span>
                  <span>Sterile technique and advanced microneedling for collagen stimulation.</span>
                </li>
                <li className="flex flex-col gap-1 pb-1 sm:flex-row sm:flex-wrap sm:gap-3">
                  <span className="font-medium text-charcoal">Aftercare guidance</span>
                  <span className="hidden text-[rgba(45,41,38,0.6)] sm:inline">—</span>
                  <span>Clear steps so you heal comfortably and protect your results.</span>
                </li>
              </ul>
              <div className="mt-8">
                <Button
                  type="button"
                  size="lg"
                  className="w-full min-h-[48px] rounded-none px-8 py-6 font-barlow text-xs font-light uppercase tracking-[0.1em] sm:w-auto"
                  asChild
                >
                  <Link to={BOOKING_MICRONEEDLING_LAUNCH}>Claim the offer</Link>
                </Button>
              </div>
            </div>

            <div className={faqCardClass}>
              <h3 className="mb-4 font-barlow text-xs font-extralight uppercase tracking-[0.12em] text-warm-brown/85">
                Frequently asked questions
              </h3>
              <FaqServiceAccordion items={microneedlingFaqItems} valuePrefix="mn-special" />
            </div>
          </div>
        </section>

        <section
          className="border-t border-[rgba(103,92,83,0.12)] bg-[#FAFAF5] px-6 py-10 md:px-10"
          aria-label="Legal notice"
        >
          <p className="mx-auto max-w-3xl text-center font-barlow text-xs font-light leading-relaxed text-[rgba(45,41,38,0.65)] md:text-sm">
            Results may vary. This site is not a part of the Meta website or Meta Platforms, Inc. All treatments are
            performed by certified specialists.
          </p>
        </section>
      </article>
    </Layout>
  );
}
