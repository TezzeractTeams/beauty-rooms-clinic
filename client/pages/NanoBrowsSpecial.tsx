import Layout from "@/components/Layout";
import { FinishedLooksGallerySection } from "@/components/FinishedLooksGallerySection";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { isHubSpotNanoBrowsConfigured, submitNanoBrowsLead } from "@/lib/hubspotNanoBrows";
import { Clock, Droplets, Mail, Phone, ScanLine, Shield, User } from "lucide-react";
import { type ComponentProps, FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

/** Full-face / lifestyle hero (no brow close-up) */
const HERO_LIFESTYLE_SRC = "/images/OurStanderd.jpeg";

const cardBorder = "border border-[rgba(103,92,83,0.12)]";
const mutedBody = "font-barlow text-base font-light leading-[1.65] text-[rgba(45,41,38,0.78)] md:text-lg";

const BOOKING_ERICA = "/bookings?specialist=Erica#booking-embed";

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
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
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
    if (!isHubSpotNanoBrowsConfigured()) {
      toast.error(
        "Form connection is not configured. Add VITE_HUBSPOT_PORTAL_ID and VITE_HUBSPOT_NANO_BROWS_FORM_GUID.",
      );
      return;
    }
    setSubmitting(true);
    const result = await submitNanoBrowsLead({
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
  };

  return (
    <Layout>
      <article>
        {/* Hero — same split as LuxeLookLashOffer: left cream panel (copy + form), right lifestyle image */}
        <section className="w-full bg-[#FAFAF5]" aria-labelledby="nano-brows-hero-heading">
          <div className="flex min-h-[min(100dvh,720px)] flex-col md:min-h-[calc(100dvh-85px)] md:flex-row">
            <div className="flex w-full flex-col justify-center bg-[#FAFAF5] px-6 pb-10 pt-24 md:w-1/2 md:max-w-[50%] md:py-16 md:pl-10 md:pr-8 lg:pl-14 lg:pr-10 xl:pl-20">
              <div className="mx-auto w-full max-w-xl md:mx-0">
                <p className="font-barlow text-[10px] font-light uppercase tracking-[0.15em] text-warm-brown/85 md:text-xs">
                  Nano brows launch
                </p>
                <h1
                  id="nano-brows-hero-heading"
                  className="mt-3 font-barlow font-extralight text-[clamp(36px,5vw,64px)] leading-none tracking-[-0.05em] text-charcoal md:mt-4"
                >
                  Wake Up With Soft, Natural Brows.
                </h1>
                <p className={`mt-4 ${mutedBody}`}>
                  Save time every day with Nano Brows that are sweat-proof, gym-proof, and beach-proof. No brow
                  pencil—just a polished look customized to your unique face.
                </p>
                <div className="mt-5 flex flex-wrap items-baseline gap-x-4 gap-y-1">
                  <span className="font-barlow text-2xl font-light tracking-[-0.02em] text-charcoal md:text-3xl">
                    $399 launch offer
                  </span>
                  <span className="font-barlow text-lg font-light text-[rgba(45,41,38,0.45)] line-through md:text-xl">
                    $500
                  </span>
                </div>

                <div id="nano-lead-form" className={`mt-8 ${cardBorder} bg-[#FAFAF5] p-6 shadow-sm md:p-8`}>
                  <h2 className="font-barlow text-lg font-extralight tracking-[-0.02em] text-charcoal md:text-xl">
                    Request a callback
                  </h2>
                  <p className="mt-2 font-barlow text-sm font-light leading-relaxed text-[rgba(45,41,38,0.65)]">
                    Claim your launch pricing — we’ll reach out shortly.
                  </p>

                  <form className="professional-intake-form mt-6 space-y-4" onSubmit={handleSubmit} noValidate>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="relative">
                        <User
                          className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-warm-brown/70"
                          strokeWidth={1.25}
                          aria-hidden
                        />
                        <Input
                          id="nano-firstname"
                          name="firstname"
                          autoComplete="given-name"
                          placeholder="First name"
                          value={firstName}
                          onChange={(ev) => setFirstName(ev.target.value)}
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
                          id="nano-lastname"
                          name="lastname"
                          autoComplete="family-name"
                          placeholder="Last name"
                          value={lastName}
                          onChange={(ev) => setLastName(ev.target.value)}
                          className="h-11 rounded-none border-[rgba(103,92,83,0.2)] bg-[#fafaf5] pl-10 font-barlow text-sm focus-visible:ring-2 focus-visible:ring-warm-brown/30 focus-visible:ring-offset-0"
                          required
                        />
                      </div>
                    </div>
                    <div className="relative">
                      <Mail
                        className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-warm-brown/70"
                        strokeWidth={1.25}
                        aria-hidden
                      />
                      <Input
                        id="nano-email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        placeholder="Email"
                        value={email}
                        onChange={(ev) => setEmail(ev.target.value)}
                        className="h-11 rounded-none border-[rgba(103,92,83,0.2)] bg-[#fafaf5] pl-10 font-barlow text-sm focus-visible:ring-2 focus-visible:ring-warm-brown/30 focus-visible:ring-offset-0"
                        required
                      />
                    </div>
                    <div className="relative">
                      <Phone
                        className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-warm-brown/70"
                        strokeWidth={1.25}
                        aria-hidden
                      />
                      <Input
                        id="nano-phone"
                        name="phone"
                        type="tel"
                        autoComplete="tel"
                        placeholder="Phone number"
                        value={phone}
                        onChange={(ev) => setPhone(ev.target.value)}
                        className="h-11 rounded-none border-[rgba(103,92,83,0.2)] bg-[#fafaf5] pl-10 font-barlow text-sm focus-visible:ring-2 focus-visible:ring-warm-brown/30 focus-visible:ring-offset-0"
                        required
                      />
                    </div>
                    <label className="flex cursor-pointer gap-3 text-left font-barlow text-xs font-light leading-relaxed text-[rgba(45,41,38,0.72)]">
                      <input
                        type="checkbox"
                        checked={consent}
                        onChange={(ev) => setConsent(ev.target.checked)}
                        className="mt-0.5 h-4 w-4 shrink-0 rounded-sm border-[rgba(103,92,83,0.35)] accent-[hsl(var(--warm-brown))]"
                      />
                      <span>
                        By clicking, I agree to the{" "}
                        <Link to="/privacy" className="text-warm-brown underline decoration-warm-brown/30 underline-offset-2">
                          Privacy Policy
                        </Link>{" "}
                        and consent to receive SMS/Email communications.
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
                    <Link
                      to={BOOKING_ERICA}
                      className="text-warm-brown underline decoration-warm-brown/30 underline-offset-2 transition-colors hover:text-warm-brown/90"
                    >
                      Book your appointment now
                    </Link>
                    .
                  </p>
                </div>
              </div>
            </div>

            <div className="relative min-h-[min(42vh,380px)] w-full md:w-1/2 md:max-w-[50%] md:min-h-[calc(100dvh-85px)] md:flex-1">
              <img
                src={HERO_LIFESTYLE_SRC}
                alt="Woman at the clinic — natural, polished look"
                className="absolute inset-0 h-full w-full object-cover object-[center_20%]"
                fetchPriority="high"
                decoding="async"
              />
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
                      poster="/images/Permanent%20Makeup.webp"
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
                <Button type="button" className="rounded-none px-8 py-5 font-barlow text-xs font-light uppercase tracking-[0.1em]" asChild>
                  <Link to={BOOKING_ERICA}>Book your appointment now</Link>
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
                  asChild
                >
                  <Link to={BOOKING_ERICA}>Book with Erica</Link>
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
          <p className="mx-auto max-w-3xl text-center font-barlow text-xs font-light leading-relaxed text-[rgba(45,41,38,0.65)] md:text-sm">
            Results may vary. This site is not a part of the Meta website or Meta Platforms, Inc. All treatments are
            performed by certified specialists.
          </p>
        </section>
      </article>
    </Layout>
  );
}
