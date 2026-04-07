import { FaqServiceAccordion } from "@/components/FaqServiceAccordion";
import { FinishedLooksGallerySection } from "@/components/FinishedLooksGallerySection";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LIP_BLUSH_OFFER_GALLERY_IMAGES } from "@/data/lipBlushOfferGallery";
import {
  FAQ_DATA_SERVICE_LIP_BLUSH_INITIAL,
  getFaqItemsForCategoryService,
} from "@/lib/faq-from-json";
import { LIP_BLUSH_LAUNCH_BOOKING_URL_PARAMS, tryOpenBoulevardBooking } from "@/lib/boulevardBooking";
import { isHubSpotLipBlushConfigured, submitLipBlushLead } from "@/lib/hubspotLipBlush";
import { cn } from "@/lib/utils";
import { Droplets, Mail, Palette, Phone, Sparkles, User } from "lucide-react";
import { type ComponentProps, FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const HERO_IMAGE_SRC = "/images/LipBlush.jpg";

const cardBorder = "border border-[rgba(103,92,83,0.12)]";
const mutedBody = "font-barlow text-base font-light leading-[1.65] text-[rgba(45,41,38,0.78)] md:text-lg";

const faqCardClass =
  "border border-[rgba(103,92,83,0.12)] bg-[#FAFAF5] px-6 py-8 md:px-10 md:py-10";

function SectionContainer({ children, className, ...rest }: ComponentProps<"div">) {
  return (
    <div className={cn("mx-auto w-full max-w-6xl px-6 md:px-10", className)} {...rest}>
      {children}
    </div>
  );
}

const benefitIcons = [
  {
    title: "Polished Every Day",
    body: "Soft color without the daily struggle of lipstick.",
    Icon: Sparkles,
  },
  {
    title: "Natural Enhancement",
    body: "More even lip tone and fuller-looking lips without filler.",
    Icon: Palette,
  },
  {
    title: "Smudge-Proof Beauty",
    body: "Results can last up to 2 years. 100% bespoke color matching.",
    Icon: Droplets,
  },
] as const;

type LeadFormProps = {
  idPrefix: string;
  /** Optional id for in-page anchors (e.g. final CTA scroll) */
  anchorId?: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  consent: boolean;
  submitting: boolean;
  onFirstName: (v: string) => void;
  onLastName: (v: string) => void;
  onPhone: (v: string) => void;
  onEmail: (v: string) => void;
  onConsent: (v: boolean) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  onBookAppointment: () => void;
};

function LipBlushLeadFormCard({
  idPrefix,
  anchorId,
  firstName,
  lastName,
  phone,
  email,
  consent,
  submitting,
  onFirstName,
  onLastName,
  onPhone,
  onEmail,
  onConsent,
  onSubmit,
  onBookAppointment,
}: LeadFormProps) {
  return (
    <div id={anchorId} className={`${cardBorder} scroll-mt-28 bg-[#FAFAF5] p-6 shadow-sm md:p-8`}>
      <h2 className="font-barlow text-lg font-extralight tracking-[-0.02em] text-charcoal md:text-xl">
        Request a callback
      </h2>
      <p className="mt-2 font-barlow text-sm font-light leading-relaxed text-[rgba(45,41,38,0.65)]">
        Claim your launch pricing — we&apos;ll reach out shortly.
      </p>

      <form className="professional-intake-form mt-6 space-y-4" onSubmit={onSubmit} noValidate>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="relative">
            <User
              className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-warm-brown/70"
              strokeWidth={1.25}
              aria-hidden
            />
            <Input
              id={`${idPrefix}-firstname`}
              name="firstname"
              autoComplete="given-name"
              placeholder="First name"
              value={firstName}
              onChange={(ev) => onFirstName(ev.target.value)}
              className="h-11 rounded-none border-[rgba(103,92,83,0.2)] bg-[#fafaf5] pl-10 font-barlow text-sm focus-visible:ring-2 focus-visible:ring-warm-brown/30 focus-visible:ring-offset-0"
              required
            />
          </div>
          <div className="relative">
            <User
              className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-warm-brown/70"
              strokeWidth={1.25}
              aria-hidden
            />
            <Input
              id={`${idPrefix}-lastname`}
              name="lastname"
              autoComplete="family-name"
              placeholder="Last name"
              value={lastName}
              onChange={(ev) => onLastName(ev.target.value)}
              className="h-11 rounded-none border-[rgba(103,92,83,0.2)] bg-[#fafaf5] pl-10 font-barlow text-sm focus-visible:ring-2 focus-visible:ring-warm-brown/30 focus-visible:ring-offset-0"
              required
            />
          </div>
        </div>
        <div className="relative">
          <Phone
            className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-warm-brown/70"
            strokeWidth={1.25}
            aria-hidden
          />
          <Input
            id={`${idPrefix}-phone`}
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="Phone number"
            value={phone}
            onChange={(ev) => onPhone(ev.target.value)}
            className="h-11 rounded-none border-[rgba(103,92,83,0.2)] bg-[#fafaf5] pl-10 font-barlow text-sm focus-visible:ring-2 focus-visible:ring-warm-brown/30 focus-visible:ring-offset-0"
            required
          />
        </div>
        <div className="relative">
          <Mail
            className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-warm-brown/70"
            strokeWidth={1.25}
            aria-hidden
          />
          <Input
            id={`${idPrefix}-email`}
            name="email"
            type="email"
            autoComplete="email"
            placeholder="Email"
            value={email}
            onChange={(ev) => onEmail(ev.target.value)}
            className="h-11 rounded-none border-[rgba(103,92,83,0.2)] bg-[#fafaf5] pl-10 font-barlow text-sm focus-visible:ring-2 focus-visible:ring-warm-brown/30 focus-visible:ring-offset-0"
            required
          />
        </div>
        <label className="flex cursor-pointer gap-3 text-left font-barlow text-xs font-light leading-relaxed text-[rgba(45,41,38,0.72)]">
          <input
            type="checkbox"
            checked={consent}
            onChange={(ev) => onConsent(ev.target.checked)}
            className="mt-0.5 h-4 w-4 shrink-0 rounded-sm border-[rgba(103,92,83,0.35)] accent-[hsl(var(--warm-brown))]"
          />
          <span>
            By clicking, I agree to the{" "}
            <Link
              to="/privacy"
              className="text-warm-brown underline decoration-warm-brown/30 underline-offset-2"
            >
              Privacy Policy
            </Link>{" "}
            (privacy contact:{" "}
            <a
              href="mailto:admin@beautyroomsclinic.com"
              className="text-warm-brown underline decoration-warm-brown/30 underline-offset-2"
            >
              admin@beautyroomsclinic.com
            </a>
            ) and consent to receive SMS/Email communications.
          </span>
        </label>
        <Button
          type="submit"
          size="lg"
          disabled={submitting}
          className="w-full rounded-none px-6 py-6 font-barlow text-[11px] font-light uppercase tracking-[0.1em] disabled:opacity-60"
        >
          {submitting ? "Sending…" : "Request a callback + claim the offer"}
        </Button>
      </form>
      <p className="mt-5 font-barlow text-sm font-light text-[rgba(45,41,38,0.55)]">
        Ready to skip the wait?{" "}
        <button
          type="button"
          onClick={onBookAppointment}
          className="text-warm-brown underline decoration-warm-brown/30 underline-offset-2 transition-colors hover:text-warm-brown/90"
        >
          Book your appointment now
        </button>
        .
      </p>
    </div>
  );
}

export default function LipBlushSpecialLaunchOffer() {
  const lipBlushFaqItems = getFaqItemsForCategoryService("PMU", FAQ_DATA_SERVICE_LIP_BLUSH_INITIAL);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const openLipBlushLaunchBooking = () => {
    tryOpenBoulevardBooking(LIP_BLUSH_LAUNCH_BOOKING_URL_PARAMS);
  };

  const formProps: LeadFormProps = {
    idPrefix: "lip",
    anchorId: "lip-blush-lead-form",
    firstName,
    lastName,
    phone,
    email,
    consent,
    submitting,
    onFirstName: setFirstName,
    onLastName: setLastName,
    onPhone: setPhone,
    onEmail: setEmail,
    onConsent: setConsent,
    onBookAppointment: openLipBlushLaunchBooking,
    onSubmit: async (e) => {
      e.preventDefault();
      if (!firstName.trim() || !lastName.trim()) {
        toast.error("Please enter your first and last name.");
        return;
      }
      if (!phone.trim() || !email.trim()) {
        toast.error("Please fill in all fields.");
        return;
      }
      if (!consent) {
        toast.error("Please agree to the Privacy Policy and communications consent to continue.");
        return;
      }
      if (!isHubSpotLipBlushConfigured()) {
        toast.error(
          "Form connection is not configured. Add VITE_HUBSPOT_PORTAL_ID and VITE_HUBSPOT_LIP_BLUSH_FORM_GUID.",
        );
        return;
      }
      setSubmitting(true);
      const result = await submitLipBlushLead({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        phone,
        email,
      });
      setSubmitting(false);
      if (result.ok === false) {
        toast.error(result.message);
        return;
      }
      toast.success("Thank you — we’ll call you back shortly.");
      setFirstName("");
      setLastName("");
      setPhone("");
      setEmail("");
      setConsent(false);
    },
  };

  const heroCopyBlock = (
    <>
      <p className="font-barlow text-[10px] font-light uppercase tracking-[0.15em] text-warm-brown/85 md:text-xs">
        Effortless lip blush &amp; tint
      </p>
      <h1
        id="lip-blush-hero-heading"
        className="mt-3 font-barlow font-extralight text-[clamp(36px,5vw,64px)] leading-none tracking-[-0.05em] text-charcoal md:mt-4"
      >
        Wake Up With Effortless Color: Lip Blush Launch Special.
      </h1>
      <p className={`mt-4 ${mutedBody}`}>
        Define and brighten your lips with a soft, sheer tint that mimics the flush of youth. Get a polished look every
        day without the need for lipstick.
      </p>
      <div className="mt-5 flex flex-wrap items-baseline gap-x-4 gap-y-1">
        <span className="font-barlow text-2xl font-light tracking-[-0.02em] text-charcoal md:text-3xl">$349 launch offer</span>
        <span className="font-barlow text-lg font-light text-[rgba(45,41,38,0.45)] line-through md:text-xl">$450</span>
      </div>
    </>
  );

  return (
    <Layout>
      <article>
        <section className="w-full bg-[#FAFAF5]" aria-labelledby="lip-blush-hero-heading">
          {/* Same split as NanoBrowsSpecial: copy + form (left), hero image (right) */}
          <div className="flex min-h-[min(100dvh,720px)] flex-col md:min-h-[calc(100dvh-85px)] md:flex-row">
            <div className="flex w-full flex-col justify-center bg-[#FAFAF5] px-6 pb-10 pt-24 md:w-1/2 md:max-w-[50%] md:py-16 md:pl-10 md:pr-8 lg:pl-14 lg:pr-10 xl:pl-20">
              <div className="mx-auto w-full max-w-xl md:mx-0">
                {heroCopyBlock}
                <div className="mt-8">
                  <LipBlushLeadFormCard {...formProps} />
                </div>
              </div>
            </div>

            <div className="relative min-h-[min(42vh,380px)] w-full md:w-1/2 md:max-w-[50%] md:min-h-[calc(100dvh-85px)] md:flex-1">
              <img
                src={HERO_IMAGE_SRC}
                alt="Lip blush treatment at Beauty Rooms Clinic"
                className="absolute inset-0 h-full w-full object-cover object-[center_25%]"
                fetchPriority="high"
                decoding="async"
              />
            </div>
          </div>
        </section>

        <FinishedLooksGallerySection
          sectionHeadingId="lip-blush-gallery-heading"
          headline="Your lips are unique — your lip blush should be too."
          subheadline="Finished looks"
          images={LIP_BLUSH_OFFER_GALLERY_IMAGES}
          carouselAriaLabel="Lip blush finished looks at Beauty Rooms Clinic"
        />

        {/* 3 pillars */}
        <section className="w-full bg-[#FAFAF5] py-14 md:py-20 lg:py-24" aria-labelledby="lip-benefits-heading">
          <SectionContainer>
            <h2
              id="lip-benefits-heading"
              className="mb-10 text-center font-barlow text-[clamp(26px,3.5vw,36px)] font-extralight tracking-[-0.03em] text-charcoal md:mb-14"
            >
              Why clients love lip blush
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

        {/* The Lip Lab — media / text */}
        <section className="w-full bg-[#F4F4EF] py-14 md:py-20 lg:py-24" aria-labelledby="lip-lab-heading">
          <SectionContainer>
            <div className="grid gap-10 lg:grid-cols-2 lg:items-start lg:gap-14">
              <div>
                <h2
                  id="lip-lab-heading"
                  className="mb-6 font-barlow text-[clamp(26px,3.5vw,36px)] font-extralight tracking-[-0.03em] text-charcoal lg:mb-8"
                >
                  The Lip Lab
                </h2>
                <div className={`flex justify-center overflow-hidden rounded-sm ${cardBorder} `}>
                  <div className="w-full">
                    <video
                      className="aspect-[9/16] w-full rounded-sm object-cover object-center shadow-lg"
                      controls
                      playsInline
                      preload="metadata"
                      poster="/images/LipBlush.jpg"
                      aria-label="The Lip Lab — bespoke lip color matching"
                    >
                      <source src="/images/TheLipLab.mp4" type="video/mp4" />
                    </video>
                  </div>
                </div>
              </div>
              <div className="space-y-6 font-barlow font-light leading-[1.7] text-[rgba(45,41,38,0.78)]">
                <h3 className="font-barlow text-xl font-extralight tracking-[-0.02em] text-charcoal md:text-2xl">
                  Bespoke artistry for a youthful flush
                </h3>
                <p className="text-base md:text-lg">
                  Lip blush uses advanced micro-pigmentation to deposit sheer, translucent color that enhances your
                  natural lip tone rather than masking it. Your specialist maps undertones and designs a custom blend so
                  the result reads as a soft, healthy flush—not heavy lipstick.
                </p>
                <p className="text-base md:text-lg">
                  Every appointment centers on balance: symmetry, healing-friendly technique, and color that complements
                  your skin and lifestyle. The goal is effortless polish you wake up with.
                </p>
                <Button
                  type="button"
                  className="rounded-none px-8 py-5 font-barlow text-xs font-light uppercase tracking-[0.1em]"
                  onClick={openLipBlushLaunchBooking}
                >
                  Book your appointment now
                </Button>
              </div>
            </div>
          </SectionContainer>
        </section>

        {/* Q&A */}
        <section
          className="w-full bg-[#F9F8F6] px-6 py-14 md:px-10 md:py-20 lg:py-24"
          aria-labelledby="lip-faq-heading"
        >
          <div className="mx-auto max-w-3xl">
            <h2
              id="lip-faq-heading"
              className="mb-8 text-center font-barlow text-[clamp(26px,3.5vw,36px)] font-extralight tracking-[-0.03em] text-charcoal md:mb-10"
            >
              Questions about lip blush
            </h2>
            <div className={faqCardClass}>
              <FaqServiceAccordion items={lipBlushFaqItems} valuePrefix="lip-offer" />
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="w-full bg-[#FAFAF5] px-6 py-14 md:px-10 md:py-16" aria-labelledby="lip-final-cta-heading">
          <SectionContainer className="flex flex-col items-center text-center">
            <h2
              id="lip-final-cta-heading"
              className="mb-4 max-w-xl font-barlow text-[clamp(22px,3vw,30px)] font-extralight tracking-[-0.03em] text-charcoal"
            >
              Ready for effortless color?
            </h2>
            <p className="mb-8 max-w-lg font-barlow text-sm font-light text-[rgba(45,41,38,0.72)] md:text-base">
              Request a callback to claim the $349 launch offer, or book directly with Erica.
            </p>
            <div className="flex w-full max-w-xl flex-col gap-3 sm:mx-auto sm:flex-row sm:flex-wrap sm:justify-center">
              <Button
                type="button"
                size="lg"
                className="w-full rounded-none px-8 py-6 font-barlow text-[11px] font-light uppercase tracking-[0.1em] sm:w-auto sm:min-w-[200px]"
                asChild
              >
                <a href="#lip-blush-lead-form">Request a callback + claim the offer</a>
              </Button>
              <Button
                type="button"
                size="lg"
                variant="outline"
                className="w-full rounded-none border-[rgba(103,92,83,0.35)] bg-transparent px-8 py-6 font-barlow text-[11px] font-light uppercase tracking-[0.1em] text-charcoal hover:border-primary hover:bg-primary hover:text-primary-foreground sm:w-auto sm:min-w-[200px]"
                onClick={openLipBlushLaunchBooking}
              >
                Book your appointment now
              </Button>
            </div>
          </SectionContainer>
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
