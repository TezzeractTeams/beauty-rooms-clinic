import Layout from "@/components/Layout";
import { HeroLocationGoogleMapsCta } from "@/components/HeroLocationGoogleMapsCta";
import { HeadSpaBookingFlow } from "@/components/headSpa/HeadSpaBookingFlow";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Droplets, Layers, MapPin, Wind } from "lucide-react";
import { type ComponentProps, useEffect } from "react";

/** Match hero / split visuals to sibling Mother’s Day funnels unless you swap in facial-specific photography. */
const HERO_LIFESTYLE_SRC = "/images/mothers-day-head-spa.webp";
const OFFER_SECTION_IMAGE_SRC = "/images/Mother.webp";
const CTA_BACKGROUND_IMAGE_SRC = "/images/headspa-wide.png";

/** Boulevard catalog ID for the bookable Hydra Facial service. */
const HYDRA_FACIAL_BOOK_SERVICE_ID = "urn:blvd:Service:563b491d-6e0d-4898-b272-6a9565abde38";
const HYDRA_FACIAL_BOOK_SERVICE_DISPLAY_NAME = "Hydra Facial";

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
    title: "One polished protocol",
    body: "An advanced hydro-dermabrasion sequence that cleanses, exfoliates, extracts, and drenches hydration in one visit — no guesswork.",
    Icon: Layers,
  },
  {
    title: "Clarity meets comfort",
    body: "Vortex suction clears congested pores with a spa-level touch, so refinement never feels stripped or harsh.",
    Icon: Wind,
  },
  {
    title: "Antioxidant-fueled hydration",
    body: "Premium infusion serums saturate the skin barrier for bounce, softness, and a calm, supple finish.",
    Icon: Droplets,
  },
  {
    title: "Sarasota, by appointment",
    body: "We’ve earmarked Mother’s Day windows for moms who deserve more than flowers — snag one before calendars fill.",
    Icon: MapPin,
  },
] as const;

function scrollToLeadForm() {
  document.getElementById("hydra-md-lead-form")?.scrollIntoView({ behavior: "smooth" });
}

export default function HydraFacialMothersDayOffer() {
  useEffect(() => {
    document.title = "Mother’s Day Hydra Facial Offer | Sarasota | Beauty Rooms Clinic";
  }, []);

  return (
    <Layout>
      <article>
        <section className="w-full bg-[#FAFAF5]" aria-labelledby="hydra-md-hero-heading">
          <div className="flex min-h-[min(100dvh,720px)] flex-col md:min-h-[calc(100dvh-85px)] md:flex-row">
            <div className="flex w-full flex-col justify-center bg-[#FAFAF5] px-6 pb-10 pt-24 md:min-w-0 md:flex-[0_0_65%] md:max-w-[65%] md:py-16 md:pl-10 md:pr-8 lg:pl-14 lg:pr-10 xl:pl-20">
              <div className="mx-auto w-full max-w-5xl md:mx-0">
                <p className="font-barlow text-[10px] font-light uppercase tracking-[0.15em] text-warm-brown/85 md:text-xs">
                  Mother&apos;s Day · Hydra Facial · Sarasota
                </p>
                <h1
                  id="hydra-md-hero-heading"
                  className="mt-3 font-barlow font-extralight text-[clamp(36px,5vw,64px)] leading-none tracking-[-0.05em] text-charcoal md:mt-4"
                >
                  Skip the petals — send her home glowing.
                </h1>
                <p className={`mt-4 ${mutedBody}`}>
                  Surprise her with a clinical-grade facial rhythm she can feel in the mirror instantly: meticulous
                  cleansing, smart exfoliation, gentle extraction, and a flood of antioxidants that leave skin firm,
                  cushiony, and lit from within.
                </p>
                <p className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 font-barlow text-sm font-light text-[rgba(45,41,38,0.75)] md:text-base">
                  <MapPin className="h-4 w-4 shrink-0 text-warm-brown/80" strokeWidth={1.25} aria-hidden />
                  <span>Sarasota flagship studio</span>
                  <span aria-hidden className="text-[rgba(45,41,38,0.35)]">
                    ·
                  </span>
                  <span>Limited Mother&apos;s Day blocks</span>
                </p>
                <div className="mt-5 flex flex-wrap items-baseline gap-x-4 gap-y-1" id="hydra-md-booking-form">
                  <span className="font-barlow text-2xl font-light tracking-[-0.02em] text-charcoal md:text-3xl">
                    Claim the Mothers day offer &amp; save 20%
                  </span>
                </div>

                <div className="mt-8">
                  <HeadSpaBookingFlow
                    idPrefix="hydra-md"
                    anchorId="hydra-md-lead-form"
                    leadForm="hydra_facial_mothers_day"
                    intakeTitle={`Book your ${HYDRA_FACIAL_BOOK_SERVICE_DISPLAY_NAME}`}
                    intakeSubtitle="Share your preferred contact details below to reveal live openings with our skincare team."
                    services={[
                      {
                        id: HYDRA_FACIAL_BOOK_SERVICE_ID,
                        name: HYDRA_FACIAL_BOOK_SERVICE_DISPLAY_NAME,
                      },
                    ]}
                  />
                </div>
              </div>
            </div>

            <div className="relative min-h-[min(42vh,380px)] w-full md:min-h-[calc(100dvh-85px)] md:flex-[0_0_35%] md:max-w-[35%]">
              <img
                src={HERO_LIFESTYLE_SRC}
                alt="Mother’s Day wellness experience at Beauty Rooms Clinic, Sarasota"
                className="absolute inset-0 z-0 h-full w-full object-cover object-center"
                fetchPriority="high"
                decoding="async"
              />
              <div className="pointer-events-none absolute inset-0 z-[1] bg-black/30" aria-hidden />
              <HeroLocationGoogleMapsCta />
            </div>
          </div>
        </section>

        <section className="w-full bg-[#FAFAF5] py-14 md:py-20 lg:py-24" aria-labelledby="hydra-md-benefits-heading">
          <SectionContainer>
            <h2
              id="hydra-md-benefits-heading"
              className="mb-10 text-center font-barlow text-[clamp(26px,3.5vw,36px)] font-extralight tracking-[-0.03em] text-charcoal md:mb-14"
            >
              Why Hydro-Dermabrasion wins Mother&apos;s Day
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
          aria-labelledby="hydra-md-offer-heading"
        >
          <div className="aspect-[4/3] w-full overflow-hidden bg-[#2a2a2a] md:aspect-auto md:min-h-[min(100dvh,640px)] md:w-[48%] md:max-w-[560px] md:flex-shrink-0">
            <img
              src={OFFER_SECTION_IMAGE_SRC}
              alt="Mother’s Day self-care at Beauty Rooms Clinic"
              className="h-full min-h-[280px] w-full object-cover object-center md:min-h-full"
              loading="lazy"
              decoding="async"
            />
          </div>
          <div className="flex flex-1 flex-col justify-center px-8 py-12 md:px-12 lg:px-16 xl:px-20">
            <div className="mx-auto w-full max-w-[540px] space-y-6 font-barlow font-light leading-[1.7] text-[rgba(45,41,38,0.78)]">
              <h2
                id="hydra-md-offer-heading"
                className="font-barlow text-[clamp(26px,3.5vw,36px)] font-extralight tracking-[-0.03em] text-charcoal"
              >
                Elevate her daily skincare story
              </h2>
              <p className="text-base md:text-lg">
                Step beyond drugstore aisles — this elevated Hydra Facial weaves clinically driven hydro-dermabrasion with
                luxurious antioxidant cocktails. Each pass refines dull surface cells, frees trapped congestion, and slips
                moisture deep where skin looks firmer instantly.
              </p>
              <p className="text-base md:text-lg">
                Whether she battles visible texture, lingering dark spots, or simply craves dewy reassurance before summer
                events, this session restores visible vibrancy right after treatment while supporting long-range barrier
                health.
              </p>
              <div
                className="bg-[#E8E3D8] px-5 py-4 font-barlow text-sm font-light leading-relaxed text-charcoal md:text-base"
                role="note"
              >
                Mother&apos;s Day slots include our curated{" "}
                <span className="font-normal">20% bundled savings</span> on qualifying Hydra Facial reservations—finalize
                your hold before itineraries book up completely.
              </div>
            </div>
          </div>
        </section>

        <section className="relative w-full overflow-hidden py-24 md:py-36" aria-labelledby="hydra-md-cta-heading">
          <img
            src={CTA_BACKGROUND_IMAGE_SRC}
            alt="Spa treatment ambiance at Beauty Rooms Clinic"
            className="absolute inset-0 h-full w-full object-cover object-center"
            loading="lazy"
            decoding="async"
          />
          <div className="absolute inset-0 bg-[rgba(28,24,20,0.55)]" />
          <SectionContainer className="relative z-10">
            <div className="mx-auto max-w-3xl text-center text-[#FAFAF5]">
              <h2
                id="hydra-md-cta-heading"
                className="font-barlow text-[clamp(30px,4.5vw,48px)] font-extralight leading-[1.15] tracking-[-0.03em]"
              >
                Glow appointments vanish faster than bouquets
              </h2>
              <p className="mx-auto mt-5 max-w-2xl font-barlow text-sm font-light leading-relaxed text-[rgba(250,250,245,0.92)] md:text-base">
                Lock in Hydra Facial time for the mom — or honorary mom — who does everything yet rarely pauses for
                herself. One session, layers of nourishment, Sarasota calm.
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
