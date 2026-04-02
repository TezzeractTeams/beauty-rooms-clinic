import Layout from "@/components/Layout";
import { Link } from "react-router-dom";
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone } from "lucide-react";

const PHONE_DISPLAY = "(941) 555-1234";
const PHONE_HREF = "tel:+19415551234";
const EMAIL = "hello@beautyroomsclinic.com";

const SOCIAL_LINKS = [
  { label: "Instagram", href: "https://www.instagram.com/", Icon: Instagram },
  { label: "Facebook", href: "https://www.facebook.com/", Icon: Facebook },
  { label: "LinkedIn", href: "https://www.linkedin.com/", Icon: Linkedin },
] as const;

const cardClass =
  "flex flex-col gap-4 border border-[rgba(103,92,83,0.12)] bg-[#FAFAF5] p-8 md:p-10 transition-shadow hover:shadow-sm";

const cardEyebrowClass =
  "font-barlow font-light text-[10px] md:text-xs tracking-[0.15em] uppercase text-warm-brown/80";

export default function Contact() {
  return (
    <Layout>
      <section className="relative w-full min-h-[calc(65vh-85px)] overflow-hidden bg-[#FAFAF5]">
        <div className="absolute inset-0">
          <img
            src="/images/About%20us.webp"
            alt="Beauty Rooms Clinic"
            className="h-full w-full object-cover object-center"
          />
        </div>
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, rgba(250,250,245,0.94) 0%, rgba(250,250,245,0.88) 42%, rgba(250,250,245,0.45) 62%, rgba(250,250,245,0.08) 100%)",
          }}
        />
        <div className="relative z-10 flex min-h-[calc(65vh-85px)] flex-col justify-end px-6 py-20 md:px-10 md:py-28 lg:px-[90px]">
          <div className="max-w-[720px]">
            <p className="mb-4 font-barlow font-light text-[10px] tracking-[0.15em] text-warm-brown/80 md:text-xs">
              Get in touch
            </p>
            <h1
              id="contact-heading"
              className="mb-6 font-barlow font-extralight text-[clamp(36px,5vw,56px)] capitalize leading-[1.08] tracking-[-0.04em] text-charcoal"
            >
              Contact Beauty Rooms Clinic
            </h1>
            <p className="max-w-[560px] font-barlow font-light text-lg leading-[1.65] text-[rgba(45,41,38,0.75)] md:text-xl">
              Have questions or need help choosing the right treatment? We&apos;re here to help.
            </p>
          </div>
        </div>
      </section>

      <section
        className="w-full bg-[#F9F8F6] px-6 py-20 md:px-10 md:py-28 lg:py-32"
        aria-labelledby="contact-options-heading"
      >
        <div className="mx-auto max-w-6xl">
          <h2
            id="contact-options-heading"
            className="mb-12 text-center font-barlow font-extralight text-2xl tracking-[-0.02em] text-charcoal md:mb-16 md:text-3xl"
          >
            Contact options
          </h2>
          <div className="grid gap-6 md:grid-cols-3 md:gap-8">
            <div className={cardClass}>
              <div className="flex h-12 w-12 items-center justify-center border border-[rgba(103,92,83,0.15)] bg-white/60">
                <Phone className="h-5 w-5 text-warm-brown" strokeWidth={1.25} aria-hidden />
              </div>
              <div>
                <p className={cardEyebrowClass}>Phone</p>
                <a
                  href={PHONE_HREF}
                  className="mt-2 inline-block font-barlow font-light text-lg text-charcoal transition-colors hover:text-warm-brown focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-charcoal"
                >
                  {PHONE_DISPLAY}
                </a>
              </div>
            </div>

            <div className={cardClass}>
              <div className="flex h-12 w-12 items-center justify-center border border-[rgba(103,92,83,0.15)] bg-white/60">
                <Mail className="h-5 w-5 text-warm-brown" strokeWidth={1.25} aria-hidden />
              </div>
              <div>
                <p className={cardEyebrowClass}>Email</p>
                <a
                  href={`mailto:${EMAIL}`}
                  className="mt-2 inline-block break-all font-barlow font-light text-lg text-charcoal transition-colors hover:text-warm-brown focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-charcoal"
                >
                  {EMAIL}
                </a>
              </div>
            </div>

            <div className={cardClass}>
              <div className="flex h-12 w-12 items-center justify-center border border-[rgba(103,92,83,0.15)] bg-white/60">
                <Instagram className="h-5 w-5 text-warm-brown" strokeWidth={1.25} aria-hidden />
              </div>
              <div>
                <p className={cardEyebrowClass}>Social media</p>
                <ul className="mt-3 flex flex-col gap-2">
                  {SOCIAL_LINKS.map(({ label, href, Icon }) => (
                    <li key={label}>
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 font-barlow font-light text-base text-charcoal transition-colors hover:text-warm-brown focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-charcoal"
                      >
                        <Icon className="h-4 w-4 shrink-0 text-warm-brown/80" strokeWidth={1.25} aria-hidden />
                        {label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="mx-auto mt-14 max-w-2xl border border-[rgba(103,92,83,0.12)] bg-[#FAFAF5] px-8 py-10 text-center md:mt-20 md:px-12 md:py-12">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center border border-[rgba(103,92,83,0.15)] bg-white/60">
              <MapPin className="h-5 w-5 text-warm-brown" strokeWidth={1.25} aria-hidden />
            </div>
            <p className={cardEyebrowClass}>Location</p>
            <p className="mt-3 font-barlow font-light text-xl tracking-[-0.02em] text-charcoal md:text-2xl">
              Sarasota, Florida
            </p>
          </div>
        </div>
      </section>

      <section
        className="flex w-full flex-col items-center justify-center bg-[#696969] px-6 py-28 text-center md:py-36 lg:py-60"
        aria-labelledby="contact-cta-heading"
      >
        <h2
          id="contact-cta-heading"
          className="mb-10 max-w-3xl font-barlow font-extralight text-4xl leading-[1.12] tracking-[-0.03em] text-white sm:text-5xl lg:text-6xl"
        >
          <span className="block">Book your appointment</span>
          <span className="block">or send us a message today</span>
        </h2>
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-6">
          <Link
            to="/bookings"
            className="inline-block border border-white bg-transparent px-10 py-4 font-barlow font-light text-[11px] uppercase tracking-[0.12em] text-white transition-colors hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white md:px-12 md:py-5 md:text-xs"
          >
            Book now
          </Link>
          <a
            href={`mailto:${EMAIL}`}
            className="inline-block border border-white/60 bg-transparent px-10 py-4 font-barlow font-light text-[11px] uppercase tracking-[0.12em] text-white/95 transition-colors hover:border-white hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white md:px-12 md:py-5 md:text-xs"
          >
            Email us
          </a>
        </div>
      </section>
    </Layout>
  );
}
