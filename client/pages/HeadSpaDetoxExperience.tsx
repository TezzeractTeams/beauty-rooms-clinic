import Layout from "@/components/Layout";
import { ContinuousImageCarousel } from "@/components/ContinuousImageCarousel";
import { HeadSpaBookingFlow } from "@/components/headSpa/HeadSpaBookingFlow";
import { Button } from "@/components/ui/button";
import { NANO_BROWS_HERO_BOOKING_URL_PARAMS, tryOpenBoulevardBooking } from "@/lib/boulevardBooking";
import { cn } from "@/lib/utils";
import { Droplets, Leaf, Sparkles, Waves } from "lucide-react";
import { type ComponentProps, useEffect } from "react";

const HERO_LIFESTYLE_SRC = "/images/head-spa-hero.png";
const SPECIALIST_IMAGE_SRC = "/images/head-spa-kelsey.png";
const CTA_BACKGROUND_IMAGE_SRC = "/images/headspa-wide.png";
const HEAD_SPA_BOOKING_SERVICE_ID = "urn:blvd:Service:786e1942-2960-4a0e-bb5d-f03ad53fe1e7";
const HEAD_SPA_BOOKING_SERVICE_NAME = "Head Spa Detox Experience";

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
    title: "Deep Scalp Cleanse",
    body: "A deep-cleansing scalp treatment designed to remove buildup and restore hydration.",
    Icon: Droplets,
  },
  {
    title: "Foundation for Healthier Hair",
    body: "Promotes healthier hair by focusing on scalp health.",
    Icon: Leaf,
  },
  {
    title: "Ultimate Relaxation",
    body: "A relaxing, multi-step experience that includes exfoliation, steam, and massage.",
    Icon: Waves,
  },
  {
    title: "Soft & Revitalized",
    body: "Leaves your scalp refreshed and your hair soft, clean, and revitalized.",
    Icon: Sparkles,
  },
] as const;

const resultsImages = [
  { src: "/images/headspa-1.png", alt: "Head Spa detox treatment in progress" },
  { src: "/images/headspa-2.png", alt: "Deep scalp rinse during head spa session" },
  { src: "/images/headspa-4.png", alt: "Steam step in Head Spa Detox Experience" },
  { src: "/images/headspa-5.png", alt: "Scalp massage and cleansing step in treatment" },
] as const;

export default function HeadSpaDetoxExperience() {
  useEffect(() => {
    document.title = "Head Spa Detox Experience $140 Intro Offer | Head Spa In Sarasota, Florida.";
  }, []);

  const openHeadSpaBooking = () => {
    tryOpenBoulevardBooking(NANO_BROWS_HERO_BOOKING_URL_PARAMS);
  };

  return (
    <Layout>
      <article>
        <section className="w-full bg-[#FAFAF5]" aria-labelledby="head-spa-hero-heading">
          <div className="flex min-h-[min(100dvh,720px)] flex-col md:min-h-[calc(100dvh-85px)] md:flex-row">
            <div className="flex w-full flex-col justify-center bg-[#FAFAF5] px-6 pb-10 pt-24 md:min-w-0 md:flex-[0_0_65%] md:max-w-[65%] md:py-16 md:pl-10 md:pr-8 lg:pl-14 lg:pr-10 xl:pl-20">
              <div className="mx-auto w-full max-w-5xl md:mx-0">
                <p className="font-barlow text-[10px] font-light uppercase tracking-[0.15em] text-warm-brown/85 md:text-xs">
                  Head Spa Detox Experience
                </p>
                <h1
                  id="head-spa-hero-heading"
                  className="mt-3 font-barlow font-extralight text-[clamp(36px,5vw,64px)] leading-none tracking-[-0.05em] text-charcoal md:mt-4"
                >
                  Head Spa: Save $35 on your next Deep Scalp Detox!
                </h1>
                <p className={`mt-4 ${mutedBody}`}>
                  Discover the Head Spa Detox Experience: a relaxing, multi-step treatment that deep-cleanses your
                  scalp to remove buildup, restore hydration, and leave your hair soft, clean, and revitalized.
                  Limited spots available!
                </p>
                <div className="mt-5 flex flex-wrap items-baseline gap-x-4 gap-y-1" id="head-spa-booking-form">
                  <span className="font-barlow text-2xl font-light tracking-[-0.02em] text-charcoal md:text-3xl">
                    Introductory Offer: $140
                  </span>
                  <span className="font-barlow text-lg font-light text-[rgba(45,41,38,0.45)] line-through md:text-xl">
                    $175
                  </span>
                </div>

                <div className="mt-8">
                  <HeadSpaBookingFlow
                    anchorId="head-spa-lead-form"
                    serviceId={HEAD_SPA_BOOKING_SERVICE_ID}
                    serviceName={HEAD_SPA_BOOKING_SERVICE_NAME}
                  />
                </div>
              </div>
            </div>

            <div className="relative min-h-[min(42vh,380px)] w-full md:min-h-[calc(100dvh-85px)] md:flex-[0_0_35%] md:max-w-[35%]">
              <img
                src={HERO_LIFESTYLE_SRC}
                alt="Client enjoying a head spa detox treatment"
                className="absolute inset-0 h-full w-full object-cover object-center"
                fetchPriority="high"
                decoding="async"
              />
            </div>
          </div>
        </section>

        <section className="w-full bg-[#FAFAF5] py-14 md:py-20 lg:py-24" aria-labelledby="head-spa-results-heading">
          <SectionContainer>
            <h2
              id="head-spa-results-heading"
              className="mb-10 text-center font-barlow text-[clamp(26px,3.5vw,36px)] font-extralight tracking-[-0.03em] text-charcoal md:mb-14"
            >
              Visible Results: A Foundation for Healthier, Shinier Hair
            </h2>
          </SectionContainer>
          <ContinuousImageCarousel
            images={resultsImages}
            ariaLabel="Head spa treatment results"
            durationSeconds={42}
          />
        </section>

        <section className="w-full bg-[#FAFAF5] py-14 md:py-20 lg:py-24" aria-labelledby="head-spa-benefits-heading">
          <SectionContainer>
            <h2
              id="head-spa-benefits-heading"
              className="mb-10 text-center font-barlow text-[clamp(26px,3.5vw,36px)] font-extralight tracking-[-0.03em] text-charcoal md:mb-14"
            >
              Why Clients Love This Treatment
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
          className="w-full bg-[#F1EFE8] py-14 md:py-20 lg:py-24"
          aria-labelledby="head-spa-offer-heading"
        >
          <SectionContainer>
            <div className="grid gap-10 lg:grid-cols-2 lg:items-start lg:gap-14">
              <div>
                <div
                  className="flex justify-center overflow-hidden rounded-sm py-4 sm:py-6"
                >
                  <div className="w-full max-w-[min(100%,380px)]">
                    <video
                      className="aspect-[9/16] w-full rounded-sm object-cover object-center shadow-lg"
                      controls
                      playsInline
                      preload="metadata"
                      aria-label="Head Spa Detox Experience treatment process"
                    >
                      <source src="/videos/head-spa-processs-video.webm" type="video/webm" />
                    </video>
                  </div>
                </div>
              </div>
              <div className="space-y-6 font-barlow font-light leading-[1.7] text-[rgba(45,41,38,0.78)]">
                <h2
                  id="head-spa-offer-heading"
                  className="mb-6 font-barlow text-[clamp(26px,3.5vw,36px)] font-extralight tracking-[-0.03em] text-charcoal lg:mb-8"
                >
                  Limited-Time Introductory Offer
                </h2>
                <p className="text-base md:text-lg">
                  The Head Spa Detox Experience is a relaxing, multi-step process that utilizes exfoliation, steam, and
                  massage to deeply cleanse your scalp. This luxurious treatment is designed to restore balance by
                  removing buildup and infusing hydration, resulting in softer, cleaner, and revitalized hair.
                </p>
                <div
                  className="bg-[#E8E3D8] px-5 py-4 font-barlow text-sm font-light leading-relaxed text-charcoal md:text-base"
                  role="note"
                >
                  For a limited time, you can experience the Head Spa Detox for the introductory price of{" "}
                  <span className="font-normal">$140</span> (You save $35). Limited spots are available.
                </div>
              </div>
            </div>
          </SectionContainer>
        </section>

        <section className="w-full bg-[#FAFAF5] py-14 md:py-20 lg:py-24" aria-labelledby="maximize-results-heading">
          <SectionContainer>
            <h2
              id="maximize-results-heading"
              className="mb-10 text-center font-barlow text-[clamp(26px,3.5vw,36px)] font-extralight tracking-[-0.03em] text-charcoal md:mb-14"
            >
              Maximize Your Results (Packages and Add-ons)
            </h2>
            <div className="grid gap-8 md:grid-cols-2 md:gap-10">
              <div className={`${cardBorder} bg-[#F4F4EF] px-6 py-8 md:px-8`}>
                <h3 className="font-barlow text-xl font-extralight tracking-[-0.02em] text-charcoal">
                  The Scalp Reset Series (Package)
                </h3>
                <p className="mt-4 font-barlow text-sm font-light leading-relaxed text-[rgba(45,41,38,0.78)] md:text-base">
                  For long-term scalp health and maintenance, clients often choose the Scalp Reset Series. This package
                  locks in your transformation with 3 Head Spa Treatments for $399 (save approximately $50 to $75).
                  This series is recommended for best results as a 3-session reset.
                </p>
              </div>
              <div className={`${cardBorder} bg-[#F4F4EF] px-6 py-8 md:px-8`}>
                <h3 className="font-barlow text-xl font-extralight tracking-[-0.02em] text-charcoal">
                  Customized Enhancements
                </h3>
                <p className="mt-4 font-barlow text-sm font-light leading-relaxed text-[rgba(45,41,38,0.78)] md:text-base">
                  Maximize your relaxation and beauty with these high-value add-ons during your visit:
                </p>
                <ul className="mt-4 list-disc space-y-2 pl-5 font-barlow text-sm font-light leading-relaxed text-[rgba(45,41,38,0.78)] md:text-base">
                  <li>Extended Scalp Massage (+$30-$50)</li>
                  <li>Mini Facial (+$40-$60)</li>
                  <li>Blowout (+$50-$70)</li>
                </ul>
              </div>
            </div>
          </SectionContainer>
        </section>

        <section
          className="flex w-full flex-col bg-[#FAFAF5] md:min-h-[480px] md:flex-row"
          aria-labelledby="kelsey-heading"
        >
          <div className="order-2 flex flex-1 flex-col justify-center px-8 py-12 md:order-1 md:px-12 lg:px-16 xl:px-20">
            <div className="mx-auto flex max-w-[540px] flex-col gap-5">
              <h2
                id="kelsey-heading"
                className="font-barlow text-[clamp(28px,4vw,40px)] font-extralight leading-[1.15] tracking-[-0.03em] text-charcoal"
              >
                Meet the Specialist: Kelsey
              </h2>
              <p className="font-barlow text-xs font-light uppercase tracking-[0.12em] text-[rgba(45,41,38,0.55)]">
                Qualified Hairdresser, Blonding Specialist, and Certified Head Spa Expert.
              </p>
              <p className="font-barlow text-base font-light leading-[1.7] text-[rgba(45,41,38,0.72)]">
                Kelsey is a qualified hairdresser and blonding specialist, as well as a certified Head Spa expert. She
                focuses on scalp health as the foundation for beautiful hair, delivering customized treatments that
                cleanse, hydrate, and restore while providing a deeply relaxing experience.
              </p>
              <div className="pt-1">
                <Button
                  type="button"
                  className="rounded-none px-8 py-5 font-barlow text-xs font-light uppercase tracking-[0.1em]"
                  onClick={openHeadSpaBooking}
                >
                  Book with Kelsey
                </Button>
              </div>
            </div>
          </div>
          <div className="order-1 aspect-[4/3] w-full overflow-hidden bg-[#2a2a2a] md:order-2 md:aspect-auto md:w-[48%] md:max-w-[560px] md:flex-shrink-0">
            <img
              src={SPECIALIST_IMAGE_SRC}
              alt="Kelsey, certified Head Spa specialist at Beauty Rooms Clinic"
              className="h-full w-full object-cover object-center"
              loading="lazy"
              decoding="async"
            />
          </div>
        </section>

        <section className="relative w-full overflow-hidden py-24 md:py-36" aria-labelledby="head-spa-cta-heading">
          <img
            src={CTA_BACKGROUND_IMAGE_SRC}
            alt="Head spa treatment ambiance"
            className="absolute inset-0 h-full w-full object-cover object-center"
            loading="lazy"
            decoding="async"
          />
          <div className="absolute inset-0 bg-[rgba(28,24,20,0.55)]" />
          <SectionContainer className="relative z-10">
            <div className="mx-auto max-w-3xl text-center text-[#FAFAF5]">
              <h2
                id="head-spa-cta-heading"
                className="font-barlow text-[clamp(30px,4.5vw,48px)] font-extralight leading-[1.15] tracking-[-0.03em]"
              >
                Save $35 Today on the Head Spa Detox Experience - Limited Slots Available
              </h2>
              <p className="mx-auto mt-5 max-w-2xl font-barlow text-sm font-light leading-relaxed text-[rgba(250,250,245,0.92)] md:text-base">
                Lock in your $140 introductory treatment before this offer closes. Limited availability means once
                today&apos;s remaining spots are filled, standard pricing returns.
              </p>
              <div className="mt-8">
                <Button
                  type="button"
                  className="rounded-none px-8 py-5 font-barlow text-xs font-light uppercase tracking-[0.1em]"
                  onClick={() => {
                    document.getElementById("head-spa-lead-form")?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  Don&apos;t Miss This Intro Offer
                </Button>
              </div>
            </div>
          </SectionContainer>
        </section>

        <section
          className="border-t border-[rgba(103,92,83,0.12)] bg-primary px-6 py-10 md:px-10"
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
