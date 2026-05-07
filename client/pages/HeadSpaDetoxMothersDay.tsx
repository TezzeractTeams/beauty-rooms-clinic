import Layout from "@/components/Layout";
import { HeroLocationGoogleMapsCta } from "@/components/HeroLocationGoogleMapsCta";
import { HeadSpaBookingFlow } from "@/components/headSpa/HeadSpaBookingFlow";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Droplets, MapPin, Sparkles, Waves } from "lucide-react";
import { type ComponentProps, useEffect } from "react";

/** Hero uses campaign art; other sections use the same assets as mothers-day-head-spa. */
const HERO_LIFESTYLE_SRC = "/images/mothers-day-head-spa.webp";
const OFFER_SECTION_IMAGE_SRC = "/images/Mother.webp";
const CTA_BACKGROUND_IMAGE_SRC = "/images/headspa-wide.png";

const HEAD_SPA_BOOKING_SERVICE_ID = "urn:blvd:Service:98e25cb6-1f79-49c9-bc39-2233e1ba3be3";
const HEAD_SPA_BOOKING_SERVICE_NAME = "Head Spa Detox Experience";

/** Mother’s Day offer — Boulevard `addCartSelectedBookableItem` `itemDiscountCode`. */
const MOTHERS_DAY_BLVD_OFFER_CODE = "MDAY20";

const cardBorder = "border border-[rgba(103,92,83,0.12)]";
const mutedBody = "font-barlow text-base font-light leading-[1.65] text-[rgba(45,41,38,0.78)] md:text-lg";

function SectionContainer({
  children,
  className,
  ...rest
}: ComponentProps<"div">) {
  return (
    <div className={cn("mx-auto w-full max-w-6xl px-6 md:px-10", className)} {...rest}>
      {children}
    </div>
  );
}

const benefitIcons = [
  {
    title: "Time to switch off",
    body: "60–90 minutes designed to help her unwind completely and leave the noise behind.",
    Icon: Waves,
  },
  {
    title: "Head Spa Detox",
    body: "A relaxing head spa ritual to refresh the scalp, ease tension, and restore balance.",
    Icon: Sparkles,
  },
  {
    title: "Scalp refresh",
    body: "Deep cleansing and hydration-focused care so hair feels softer and the scalp feels lighter.",
    Icon: Droplets,
  },
  {
    title: "Sarasota",
    body: "Limited Mother’s Day appointments—give her something she’ll actually remember.",
    Icon: MapPin,
  },
] as const;

function scrollToLeadForm() {
  document.getElementById("head-spa-md-detox-lead-form")?.scrollIntoView({ behavior: "smooth" });
}

export default function HeadSpaDetoxMothersDay() {
  useEffect(() => {
    document.title =
      "Mother’s Day Head Spa Detox Experience | Sarasota | Beauty Rooms Clinic";
  }, []);

  return (
    <Layout>
      <article>
        <section className="w-full bg-[#FAFAF5]" aria-labelledby="hsd-md-hero-heading">
          <div className="flex min-h-[min(100dvh,720px)] flex-col md:min-h-[calc(100dvh-85px)] md:flex-row">
            <div className="flex w-full flex-col justify-center bg-[#FAFAF5] px-6 pb-10 pt-24 md:min-w-0 md:flex-[0_0_65%] md:max-w-[65%] md:py-16 md:pl-10 md:pr-8 lg:pl-14 lg:pr-10 xl:pl-20">
              <div className="mx-auto w-full max-w-5xl md:mx-0">
                <p className="font-barlow text-[10px] font-light uppercase tracking-[0.15em] text-warm-brown/85 md:text-xs">
                  Mother’s Day Reset Experience · Sarasota
                </p>
                <h1
                  id="hsd-md-hero-heading"
                  className="mt-3 font-barlow font-extralight text-[clamp(36px,5vw,64px)] leading-none tracking-[-0.05em] text-charcoal md:mt-4"
                >
                  Skip the flowers - give her a full reset.
                </h1>
                <p className={`mt-4 ${mutedBody}`}>
                  Give her something she&apos;ll actually enjoy — time to switch off. A dedicated scalp ritual with
                  cleansing, steam, and massage leaves her relaxed and refreshed from the roots up.
                </p>
                <p className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 font-barlow text-sm font-light text-[rgba(45,41,38,0.75)] md:text-base">
                  <MapPin className="h-4 w-4 shrink-0 text-warm-brown/80" strokeWidth={1.25} aria-hidden />
                  <span>Sarasota</span>
                  <span aria-hidden className="text-[rgba(45,41,38,0.35)]">
                    ·
                  </span>
                  <span>Limited appointments</span>
                </p>
                <div className="mt-5 flex flex-wrap items-baseline gap-x-4 gap-y-1" id="hsd-md-booking-form">
                  <span className="font-barlow text-2xl font-light tracking-[-0.02em] text-charcoal md:text-3xl">
                    Claim the Mothers day offer &amp; save 20%
                  </span>
                </div>

                <div className="mt-8">
                  <HeadSpaBookingFlow
                    anchorId="head-spa-md-detox-lead-form"
                    boulevardDiscountCode={MOTHERS_DAY_BLVD_OFFER_CODE}
                    services={[
                      {
                        id: HEAD_SPA_BOOKING_SERVICE_ID,
                        name: HEAD_SPA_BOOKING_SERVICE_NAME,
                      },
                    ]}
                  />
                </div>
              </div>
            </div>

            <div className="relative min-h-[min(42vh,380px)] w-full md:min-h-[calc(100dvh-85px)] md:flex-[0_0_35%] md:max-w-[35%]">
              <img
                src={HERO_LIFESTYLE_SRC}
                alt="Mother’s Day head spa and wellness at Beauty Rooms Clinic, Sarasota"
                className="absolute inset-0 z-0 h-full w-full object-cover object-center"
                fetchPriority="high"
                decoding="async"
              />
              <div className="pointer-events-none absolute inset-0 z-[1] bg-black/30" aria-hidden />
              <HeroLocationGoogleMapsCta />
            </div>
          </div>
        </section>

        <section className="w-full bg-[#FAFAF5] py-14 md:py-20 lg:py-24" aria-labelledby="hsd-md-benefits-heading">
          <SectionContainer>
            <h2
              id="hsd-md-benefits-heading"
              className="mb-10 text-center font-barlow text-[clamp(26px,3.5vw,36px)] font-extralight tracking-[-0.03em] text-charcoal md:mb-14"
            >
              What makes this gift unforgettable
            </h2>
            <div className="grid gap-8 md:grid-cols-2 md:gap-10 lg:grid-cols-4">
              {benefitIcons.map(({ title, body, Icon }) => (
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

        <section
          className="flex w-full flex-col bg-[#F1EFE8] md:min-h-[480px] md:flex-row"
          aria-labelledby="hsd-md-offer-heading"
        >
          <div className="aspect-[4/3] w-full overflow-hidden bg-[#2a2a2a] md:aspect-auto md:min-h-[min(100dvh,640px)] md:w-[48%] md:max-w-[560px] md:flex-shrink-0">
            <img
              src={OFFER_SECTION_IMAGE_SRC}
              alt="Mother’s Day self-care and relaxation at Beauty Rooms Clinic"
              className="h-full min-h-[280px] w-full object-cover object-center md:min-h-full"
              loading="lazy"
              decoding="async"
            />
          </div>
          <div className="flex flex-1 flex-col justify-center px-8 py-12 md:px-12 lg:px-16 xl:px-20">
            <div className="mx-auto w-full max-w-[540px] space-y-6 font-barlow font-light leading-[1.7] text-[rgba(45,41,38,0.78)]">
              <h2
                id="hsd-md-offer-heading"
                className="font-barlow text-[clamp(26px,3.5vw,36px)] font-extralight tracking-[-0.03em] text-charcoal"
              >
                Mother&apos;s Day is almost here
              </h2>
              <p className="text-base md:text-lg">
                Skip the flowers. Give her something she&apos;ll actually enjoy — time to switch off. Our team in
                Sarasota has reserved limited appointments for Mother&apos;s Day Head Spa Detox Experience sessions.
              </p>
              <p className="text-base md:text-lg">
                This is a scalp-focused ritual with cleansing, steam, and massage—built to unwind tension and refresh
                the roots. It&apos;s a gift remembered long after the chocolates are gone.
              </p>
              <div
                className="bg-[#E8E3D8] px-5 py-4 font-barlow text-sm font-light leading-relaxed text-charcoal md:text-base"
                role="note"
              >
                For a limited time, book the Head Spa Detox Experience at the introductory{" "}
                <span className="font-normal">$140</span> (save <span className="font-normal">$35</span> off{" "}
                <span className="font-normal">$175</span>). Gift-level value — book before spots fill.
              </div>
            </div>
          </div>
        </section>

        <section className="relative w-full overflow-hidden py-24 md:py-36" aria-labelledby="hsd-md-cta-heading">
          <img
            src={CTA_BACKGROUND_IMAGE_SRC}
            alt="Spa ambiance background (placeholder)"
            className="absolute inset-0 h-full w-full object-cover object-center"
            loading="lazy"
            decoding="async"
          />
          <div className="absolute inset-0 bg-[rgba(28,24,20,0.55)]" />
          <SectionContainer className="relative z-10">
            <div className="mx-auto max-w-3xl text-center text-[#FAFAF5]">
              <h2
                id="hsd-md-cta-heading"
                className="font-barlow text-[clamp(30px,4.5vw,48px)] font-extralight leading-[1.15] tracking-[-0.03em]"
              >
                Limited Mother&apos;s Day appointments — book her reset today
              </h2>
              <p className="mx-auto mt-5 max-w-2xl font-barlow text-sm font-light leading-relaxed text-[rgba(250,250,245,0.92)] md:text-base">
                Save $35 on the Head Spa Detox Experience—pick a time that works and give her the gift of switching off in
                Sarasota.
              </p>
              <div className="mt-8">
                <Button
                  type="button"
                  className="rounded-none px-8 py-5 font-barlow text-xs font-light uppercase tracking-[0.1em]"
                  onClick={scrollToLeadForm}
                >
                  Book now
                </Button>
              </div>
            </div>
          </SectionContainer>
        </section>

        <section
          className="border-t border-[rgba(103,92,83,0.12)] bg-charcoal px-6 py-10 md:px-10"
          aria-label="Legal notice"
        >
          <p className="mx-auto max-w-xl text-center font-barlow text-xs font-light leading-relaxed text-[rgba(250,250,245,0.82)] md:text-sm">
            Results may vary. This site is not a part of the Meta website or Meta Platforms, Inc. All treatments are
            performed by certified specialists.
          </p>
        </section>
      </article>
    </Layout>
  );
}
