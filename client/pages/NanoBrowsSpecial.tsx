import Layout from "@/components/Layout";
import { FinishedLooksGallerySection } from "@/components/FinishedLooksGallerySection";
import { HeroLocationGoogleMapsCta } from "@/components/HeroLocationGoogleMapsCta";
import { NanoBrowsHeroWizard } from "@/components/nanoBrows/NanoBrowsHeroWizard";
import { Button } from "@/components/ui/button";
import { NANO_BROWS_HERO_BOOKING_URL_PARAMS, tryOpenBoulevardBooking } from "@/lib/boulevardBooking";
import { cn } from "@/lib/utils";
import { Clock, Droplets, ScanLine, Shield } from "lucide-react";
import { type ComponentProps } from "react";

//const NANO_BROWS_SERVICE_ID = "urn:blvd:Service:98e25cb6-1f79-49c9-bc39-2233e1ba3be3";
const NANO_BROWS_SERVICE_ID = "urn:blvd:Service:66a3dbb8-d7bb-4700-a735-45ada1cc063b";
const NANO_BROWS_SERVICE_NAME = "15 Minute PMU Phone Consultation";

/** Full-face / lifestyle hero (no brow close-up) */
const HERO_LIFESTYLE_SRC = "/images/OurStanderd.jpeg";

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
    title: "Save Time Every Day",
    body: "Ditch the 10-minute morning struggle.",
    Icon: Clock,
  },
  {
    title: "Sweat & Beach Proof",
    body: "Perfect for the gym, pool, or ocean.",
    Icon: Droplets,
  },
  {
    title: "Customized Mapping",
    body: "100% bespoke to your bone structure.",
    Icon: ScanLine,
  },
] as const;

export default function NanoBrowsSpecial() {
  const openNanoBrowsBooking = () => {
    tryOpenBoulevardBooking(NANO_BROWS_HERO_BOOKING_URL_PARAMS);
  };

  return (
    <Layout>
      <article>
        {/* Hero — same split as Lip Blush offer: left cream panel (copy + lead form), right lifestyle image */}
        <section className="w-full bg-[#FAFAF5]" aria-labelledby="nano-brows-hero-heading">
          <div className="flex min-h-[min(100dvh,720px)] flex-col md:min-h-[calc(100dvh-85px)] md:flex-row">
            <div className="flex w-full flex-col justify-center bg-[#FAFAF5] px-6 pb-10 pt-24 md:min-w-0 md:flex-[0_0_65%] md:max-w-[65%] md:py-16 md:pl-10 md:pr-8 lg:pl-14 lg:pr-10 xl:pl-20">
              <div className="mx-auto w-full max-w-5xl md:mx-0">
                <p className="font-barlow text-[10px] font-light uppercase tracking-[0.15em] text-warm-brown/85 md:text-xs">
                  Nano brows launch
                </p>
                <h1
                  id="nano-brows-hero-heading"
                  className="mt-3 font-barlow font-extralight text-[clamp(36px,5vw,64px)] leading-none tracking-[-0.05em] text-charcoal md:mt-4"
                >
                  Wake Up With Perfect, Natural Brows
                </h1>
                <p className={`mt-4 ${mutedBody}`}>
                Stop filling in your brows every morning.
                Our advanced Nano Brows create soft, natural hair strokes tailored to your face—designed to look effortless and last for years.
                <br />
                <br />
                Life-proof. Low-maintenance. Always polished.

                </p>
                <div className="mt-5 flex flex-wrap items-baseline gap-x-4 gap-y-1">
                  <span className="font-barlow text-2xl font-light tracking-[-0.02em] text-charcoal md:text-3xl">
                    Claim the Exclusive Launch Offer: $399 
                  </span>
                  <span className="font-barlow text-lg font-light text-[rgba(45,41,38,0.45)] line-through md:text-xl">
                    $500
                  </span>
                </div>

                <div className="mt-8">
                  <NanoBrowsHeroWizard
                    anchorId="nano-brows-lead-form"
                    serviceId={NANO_BROWS_SERVICE_ID}
                    serviceName={NANO_BROWS_SERVICE_NAME}
                  />
                </div>
              </div>
            </div>

            <div className="relative min-h-[min(42vh,380px)] w-full md:min-h-[calc(100dvh-85px)] md:flex-[0_0_35%] md:max-w-[35%]">
              <img
                src={HERO_LIFESTYLE_SRC}
                alt="Woman at the clinic — natural, polished look"
                className="absolute inset-0 z-0 h-full w-full object-cover object-[center_20%]"
                fetchPriority="high"
                decoding="async"
              />
              <div
                className="pointer-events-none absolute inset-0 z-[1] bg-black/30"
                aria-hidden
              />
              <HeroLocationGoogleMapsCta />
            </div>
          </div>
        </section>

        <FinishedLooksGallerySection sectionHeadingId="nano-brows-gallery-heading" />

        {/* Life-proof benefits */}
        <section className="w-full bg-[#FAFAF5] py-14 md:py-20 lg:py-24" aria-labelledby="life-proof-heading">
          <SectionContainer>
            <h2
              id="life-proof-heading"
              className="mb-10 text-center font-barlow text-[clamp(26px,3.5vw,36px)] font-extralight tracking-[-0.03em] text-charcoal md:mb-14"
            >
              Life-proof brows
            </h2>
            <div className="grid gap-8 md:grid-cols-3 md:gap-10">
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

        {/* Educational hub */}
        <section
          className="w-full bg-[#F4F4EF] py-14 md:py-20 lg:py-24"
          aria-labelledby="precision-mapping-heading"
        >
          <SectionContainer>
            <div className="grid gap-10 lg:grid-cols-2 lg:items-start lg:gap-14">
              <div>
                <h2
                  id="precision-mapping-heading"
                  className="mb-6 font-barlow text-[clamp(26px,3.5vw,36px)] font-extralight tracking-[-0.03em] text-charcoal lg:mb-8"
                >
                  The Art of Precision Mapping
                </h2>
                <div
                  className={`flex justify-center overflow-hidden rounded-sm ${cardBorder}  py-4 sm:py-6`}
                >
                  <div className="w-full max-w-[min(100%,320px)] sm:max-w-[min(100%,360px)] lg:max-w-[min(100%,400px)]">
                    <video
                      className="aspect-[9/16] w-full rounded-sm object-cover object-center shadow-lg"
                      controls
                      playsInline
                      preload="metadata"
                      aria-label="Erica: precision brow mapping process"
                    >
                      <source src="/images/nanobro.mp4" type="video/mp4" />
                    </video>
                  </div>
                </div>
              </div>
              <div className="space-y-6 font-barlow font-light leading-[1.7] text-[rgba(45,41,38,0.78)]">
                <p className="text-base md:text-lg">
                  Nano Brows use ultra-fine technique and careful pigment placement for a softer grow-out and a more
                  natural look than traditional microblading—often with less trauma to the skin when performed by a
                  trained specialist.
                </p>
                <p className="text-base md:text-lg">
                  Every stroke follows a custom map of your bone structure and facial symmetry, so the result looks
                  like yours—not a template.
                </p>
                <Button
                  type="button"
                  className="rounded-none px-8 py-5 font-barlow text-xs font-light uppercase tracking-[0.1em]"
                  onClick={openNanoBrowsBooking}
                >
                  Book your appointment now
                </Button>
              </div>
            </div>
          </SectionContainer>
        </section>

        {/* Meet Erica */}
        <section
          className="flex w-full flex-col bg-[#FAFAF5] md:min-h-[480px] md:flex-row"
          aria-labelledby="erica-heading"
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
                id="erica-heading"
                className="font-barlow text-[clamp(28px,4vw,40px)] font-extralight leading-[1.15] tracking-[-0.03em] text-charcoal"
              >
                Meet the Specialist: Erica
              </h2>
              <p className="font-barlow text-xs font-light uppercase tracking-[0.12em] text-[rgba(45,41,38,0.55)]">
                Specialist in Permanent Makeup (PMU).
              </p>
              <p className="font-barlow text-base font-light leading-[1.7] text-[rgba(45,41,38,0.72)]">
                Erica specializes in high-definition, semi-permanent beauty. With a passion for precision mapping, she
                creates soft, natural brows that prioritize skin health and long-lasting results.
              </p>
              <div
                className={`${cardBorder} bg-primary/5 px-4 py-3 font-barlow text-sm font-light leading-relaxed text-charcoal md:text-[15px]`}
                role="note"
              >
                <span className="font-normal text-charcoal">PMU bundle bonus:</span> Book a second PMU procedure (Eye
                Liner or Lip Tint) and receive one Microneedling session for FREE ($200 value).
              </div>
              <div className="pt-1">
                <Button
                  type="button"
                  className="rounded-none px-8 py-5 font-barlow text-xs font-light uppercase tracking-[0.1em]"
                  onClick={openNanoBrowsBooking}
                >
                  Book with Erica
                </Button>
              </div>
            </div>
          </div>
          <div className="order-1 aspect-[4/3] w-full overflow-hidden bg-[#2a2a2a] md:order-2 md:aspect-auto md:w-[48%] md:max-w-[560px] md:flex-shrink-0">
            <img
              src="/images/Erica.JPG"
              alt="Erica, permanent makeup specialist at Beauty Rooms Clinic"
              className="h-full w-full object-cover object-center"
              loading="lazy"
              decoding="async"
            />
          </div>
        </section>

        <section
          className="border-t border-[rgba(103,92,83,0.12)] bg-[#FAFAF5] px-6 py-10 md:px-10"
          aria-label="Legal notice"
        >
          <p className="mx-auto max-w-xl text-center font-barlow text-xs font-light leading-relaxed text-[rgba(45,41,38,0.65)] md:text-sm">
            Results may vary. This site is not a part of the Meta website or Meta Platforms, Inc. All treatments are
            performed by certified specialists.
          </p>
        </section>
      </article>
    </Layout>
  );
}
