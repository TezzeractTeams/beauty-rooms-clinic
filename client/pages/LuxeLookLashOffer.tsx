import Layout from "@/components/Layout";
import { Shield } from "lucide-react";
import { openMainMenuBoulevardBooking } from "@/lib/boulevardBooking";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

const LASH_GALLERY_IMAGES: { src: string; alt: string }[] = [
  { src: "/images/lashes.webp", alt: "Custom eyelash extension results" },
  { src: "/images/home-lashes.jpg", alt: "Full lash set, natural finish" },
  { src: "/images/curated.webp", alt: "Lash styling tailored to eye shape" },
  { src: "/images/rightside.jpeg", alt: "Client after lash appointment" },
  { src: "/images/HowWe.jpeg", alt: "Beauty Rooms Clinic lash service" },
];

const HERO_IMAGE = "/images/home-lashes.jpg";

const ANDREZZA_TAGS = [
  "Lash Extensions",
  "Lash Fills",
  "Brow Lamination",
  "Hair Removal",
  "Lash Lift",
  "Lash Tint",
] as const;

const faqCardClass =
  "border border-[rgba(103,92,83,0.12)] bg-[#FAFAF5] px-6 py-8 md:px-10 md:py-10";

function scrollToBooking() {
  document.getElementById("booking-embed")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function LashImageCarousel({ ariaLabel }: { ariaLabel: string }) {
  return (
    <Carousel
      opts={{ align: "start", loop: true }}
      className="w-full"
      aria-label={ariaLabel}
    >
      <CarouselContent className="-ml-3 md:-ml-4">
        {LASH_GALLERY_IMAGES.map((img) => (
          <CarouselItem
            key={img.src}
            className="basis-[85%] pl-3 sm:basis-1/2 sm:pl-4 lg:basis-1/3"
          >
            <div className="overflow-hidden rounded-sm border border-[rgba(103,92,83,0.12)] bg-[#F4F4EF]">
              <img
                src={img.src}
                alt={img.alt}
                className="aspect-[4/5] w-full object-cover object-center"
                loading="lazy"
                decoding="async"
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}

export default function LuxeLookLashOffer() {
  return (
    <Layout>
      <article>
        {/* Hero — left solid panel, right lifestyle image (stacked on small screens) */}
        <section className="w-full bg-[#FAFAF5]">
          <div className="flex min-h-[min(100dvh,720px)] flex-col md:min-h-[calc(100dvh-85px)] md:flex-row">
            <div className="flex w-full flex-col justify-center bg-[#FAFAF5] px-6 pb-10 pt-24 md:w-1/2 md:max-w-[50%] md:py-16 md:pl-10 md:pr-8 lg:pl-14 lg:pr-10 xl:pl-20">
              <div className="mx-auto w-full max-w-xl md:mx-0">
                <p className="font-barlow text-[10px] font-light uppercase tracking-[0.15em] text-warm-brown/85 md:text-xs">
                  Luxe Look · April offer
                </p>
                <h1 className="mt-3 font-barlow font-extralight text-[clamp(36px,5vw,64px)] leading-none tracking-[-0.05em] text-charcoal md:mt-4">
                  Get the BRC Glow: Your First Full Set of Custom Lashes for $125.
                </h1>
                <p className="mt-4 font-barlow text-base font-light leading-[1.65] text-[rgba(45,41,38,0.78)] md:text-lg">
                  Save $25 this April. Weightless, bespoke extensions designed for your unique eye shape. Zero
                  mascara. Total confidence.
                </p>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <Button
                    type="button"
                    size="lg"
                    className="w-full rounded-none px-8 py-6 font-barlow text-xs font-light uppercase tracking-[0.1em] sm:w-auto"
                    onClick={scrollToBooking}
                  >
                    Claim my April offer
                  </Button>
                </div>
              </div>
            </div>
            <div className="relative min-h-[min(42vh,380px)] w-full md:w-1/2 md:max-w-[50%] md:min-h-[calc(100dvh-85px)] md:flex-1">
              <img
                src={HERO_IMAGE}
                alt="Close-up of custom lash styling and eye detail at Beauty Rooms Clinic"
                className="absolute inset-0 h-full w-full object-cover object-[center_25%]"
                fetchPriority="high"
                decoding="async"
              />
            </div>
          </div>
        </section>

        {/* Bespoke + finished looks (single carousel for lean DOM) */}
        <section
          className="w-full bg-[#F9F8F6] py-14 md:py-20 lg:py-24"
          aria-labelledby="bespoke-heading"
        >
          <div className="mx-auto max-w-6xl px-6 md:px-10">
            <h2
              id="bespoke-heading"
              className="mb-6 text-center font-barlow text-[clamp(28px,4vw,40px)] font-extralight tracking-[-0.03em] text-charcoal md:mb-8"
            >
              Your Eyes Are Unique. Your Lashes Should Be Too.
            </h2>
            <h3
              id="results-heading"
              className="mb-3 text-center font-barlow text-[clamp(22px,3vw,30px)] font-extralight tracking-[-0.03em] text-charcoal"
            >
              Finished looks
            </h3>
            <p className="mb-10 text-center font-barlow text-sm font-light text-[rgba(45,41,38,0.65)] md:mb-12 md:text-base">
              Results may vary based on natural lash health.
            </p>
          </div>
          <div className="w-full overflow-hidden">
            <LashImageCarousel ariaLabel="Bespoke lash work and finished looks" />
          </div>
        </section>

        {/* Science + video */}
        <section
          className="w-full bg-[#F4F4EF] px-6 py-14 md:px-10 md:py-20 lg:py-24"
          aria-labelledby="science-heading"
        >
          <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-2 lg:items-start lg:gap-14">
            <div>
              <h2
                id="science-heading"
                className="mb-6 font-barlow text-[clamp(26px,3.5vw,36px)] font-extralight tracking-[-0.03em] text-charcoal lg:mb-8"
              >
                The Science of a Perfect Set.
              </h2>
              <div className="overflow-hidden rounded-sm border border-[rgba(103,92,83,0.12)] bg-[#2a2a2a]">
                <video
                  className="aspect-[9/16] max-h-[min(520px,70dvh)] w-full object-cover sm:aspect-video sm:max-h-none"
                  controls
                  playsInline
                  preload="none"
                  poster="/images/lashes.webp"
                  aria-label="Lash application and mapping demonstration"
                >
                  <source src="/video/hero%20video.webm" type="video/webm" />
                </video>
              </div>
            </div>
            <ul className="flex list-none flex-col gap-8 p-0 font-barlow font-light leading-[1.7] text-[rgba(45,41,38,0.78)]">
              <li className="border-b border-[rgba(103,92,83,0.12)] pb-8">
                <h3 className="mb-2 font-barlow text-base font-extralight tracking-[-0.02em] text-charcoal md:text-lg">
                  Isolation is everything
                </h3>
                <p className="text-sm md:text-base">
                  We never glue two natural lashes together—protecting long-term lash health.
                </p>
              </li>
              <li className="border-b border-[rgba(103,92,83,0.12)] pb-8">
                <h3 className="mb-2 font-barlow text-base font-extralight tracking-[-0.02em] text-charcoal md:text-lg">
                  The weight factor
                </h3>
                <p className="text-sm md:text-base">
                  We choose extension diameter so your set never feels heavy or causes drooping.
                </p>
              </li>
              <li>
                <h3 className="mb-2 font-barlow text-base font-extralight tracking-[-0.02em] text-charcoal md:text-lg">
                  Aftercare education
                </h3>
                <p className="text-sm md:text-base">
                  The first 24 hours are critical for the adhesive bond—we walk you through exactly what to do.
                </p>
              </li>
            </ul>
          </div>
        </section>

        {/* Andrezza */}
        <section
          className="w-full bg-[#FAFAF5] flex flex-col md:flex-row md:min-h-[480px]"
          aria-labelledby="andrezza-heading"
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
                id="andrezza-heading"
                className="font-barlow text-[clamp(28px,4vw,40px)] font-extralight leading-[1.15] tracking-[-0.03em] text-charcoal"
              >
                Meet Your Lash Expert: Andrezza
              </h2>
              <p className="font-barlow text-xs font-light uppercase tracking-[0.12em] text-[rgba(45,41,38,0.55)]">
                Specialist in Eyelash Extensions, Lift &amp; Tint, and Eyebrows.
              </p>
              <p className="font-barlow text-base font-light leading-[1.7] text-[rgba(45,41,38,0.72)]">
                Andrezza specializes in 100% bespoke eyelash extensions perfectly tailored to your unique eye
                shape. Driven by a passion for precision and client care, she ensures a superior standard of
                hygiene and results that prioritize the health of your natural lashes.
              </p>
              <ul className="flex list-none flex-wrap gap-2 p-0" aria-label="Services">
                {ANDREZZA_TAGS.map((tag) => (
                  <li
                    key={tag}
                    className={cn(
                      "rounded-full border border-primary/20 bg-primary/10 px-3 py-1.5",
                      "font-barlow text-[10px] font-medium uppercase tracking-[0.08em] text-primary",
                    )}
                  >
                    {tag}
                  </li>
                ))}
              </ul>
              <div className="pt-2">
                <Button
                  type="button"
                  className="rounded-none px-8 py-5 font-barlow text-xs font-light uppercase tracking-[0.1em]"
                  onClick={() => openMainMenuBoulevardBooking()}
                >
                  Book with Andrezza
                </Button>
              </div>
            </div>
          </div>
          <div className="order-1 aspect-[4/3] w-full overflow-hidden bg-[#2a2a2a] md:order-2 md:aspect-auto md:w-[48%] md:max-w-[560px] md:flex-shrink-0">
            <img
              src="/images/Andrezza.jpeg"
              alt="Andrezza, lash specialist at Beauty Rooms Clinic"
              className="h-full w-full object-cover object-center"
              loading="lazy"
              decoding="async"
            />
          </div>
        </section>

        {/* Offer, FAQ, booking */}
        <section
          className="w-full bg-[#F9F8F6] px-6 py-14 md:px-10 md:py-20 lg:py-24"
          aria-labelledby="offer-heading"
        >
          <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <h2
                id="offer-heading"
                className="mb-6 font-barlow text-[clamp(24px,3vw,32px)] font-extralight tracking-[-0.03em] text-charcoal"
              >
                What&apos;s included
              </h2>
              <ul className="list-none space-y-4 p-0 font-barlow text-base font-light leading-[1.65] text-[rgba(45,41,38,0.78)]">
                <li className="flex gap-3 border-b border-[rgba(103,92,83,0.12)] pb-4">
                  <span className="font-medium text-charcoal">Consultation</span>
                  <span className="text-[rgba(45,41,38,0.6)]">—</span>
                  <span>Personalized mapping for your eye shape and goals.</span>
                </li>
                <li className="flex gap-3 border-b border-[rgba(103,92,83,0.12)] pb-4">
                  <span className="font-medium text-charcoal">Full set</span>
                  <span className="text-[rgba(45,41,38,0.6)]">—</span>
                  <span>Custom extensions applied with isolation and weight in mind.</span>
                </li>
                <li className="flex gap-3 pb-1">
                  <span className="font-medium text-charcoal">Aftercare</span>
                  <span className="text-[rgba(45,41,38,0.6)]">—</span>
                  <span>Clear guidance so your bond and natural lashes stay protected.</span>
                </li>
              </ul>
              <div className="mt-8">
                <Button
                  type="button"
                  size="lg"
                  className="w-full rounded-none px-8 py-6 font-barlow text-xs font-light uppercase tracking-[0.1em] sm:w-auto"
                  onClick={scrollToBooking}
                >
                  Claim my April offer
                </Button>
              </div>
            </div>

            <div className={faqCardClass}>
              <h3 className="mb-4 font-barlow text-xs font-extralight uppercase tracking-[0.12em] text-warm-brown/85">
                Frequently asked questions
              </h3>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="safety" className="border-[rgba(103,92,83,0.12)]">
                  <AccordionTrigger
                    className={cn(
                      "py-4 text-left font-barlow font-light text-base text-charcoal hover:no-underline",
                      "[&[data-state=open]]:text-warm-brown",
                    )}
                  >
                    Is it safe for my natural lashes?
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="pb-2 font-barlow text-sm font-light leading-relaxed text-[rgba(45,41,38,0.78)]">
                      We isolate every natural lash and select appropriate weight and length. All treatments
                      are performed by certified specialists using professional-grade products.
                    </p>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="timing" className="border-[rgba(103,92,83,0.12)]">
                  <AccordionTrigger
                    className={cn(
                      "py-4 text-left font-barlow font-light text-base text-charcoal hover:no-underline",
                      "[&[data-state=open]]:text-warm-brown",
                    )}
                  >
                    How long does the appointment take?
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="pb-2 font-barlow text-sm font-light leading-relaxed text-[rgba(45,41,38,0.78)]">
                      Plan for a relaxed visit; full sets typically require a dedicated block so we never rush
                      isolation or mapping. You&apos;ll see exact timing when you book.
                    </p>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="booking" className="border-[rgba(103,92,83,0.12)]">
                  <AccordionTrigger
                    className={cn(
                      "py-4 text-left font-barlow font-light text-base text-charcoal hover:no-underline",
                      "[&[data-state=open]]:text-warm-brown",
                    )}
                  >
                    How does booking work?
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="pb-2 font-barlow text-sm font-light leading-relaxed text-[rgba(45,41,38,0.78)]">
                      Choose a time below, or use &quot;Book with Andrezza&quot; above to open our scheduler—we&apos;ll
                      match you to her availability when possible.
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </section>

        <section
          className="w-full bg-[#F9F9F7] pb-16 pt-2 md:pb-24 lg:pb-28"
          aria-label="Appointment booking"
        >
          <div className="mx-auto w-[90%]">
            <h2 className="sr-only">Book your April lash offer</h2>
            <div
              id="booking-embed"
              className="min-h-[min(480px,65vh)] w-full scroll-mt-24 rounded-[40px] bg-[#D9D9D9] md:min-h-[560px]"
              data-slot="booking-embed-placeholder"
            />
          </div>
        </section>

        <section
          className="border-t border-[rgba(103,92,83,0.12)] bg-[#FAFAF5] px-6 py-10 md:px-10"
          aria-label="Legal notice"
        >
          <p className="mx-auto max-w-3xl text-center font-barlow text-xs font-light leading-relaxed text-[rgba(45,41,38,0.65)] md:text-sm">
            This site is not part of the Meta website or Meta Platforms, Inc. All beauty treatments are
            performed by certified specialists.
          </p>
        </section>
      </article>
    </Layout>
  );
}
