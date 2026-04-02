import Layout from "@/components/Layout";
import { ConsultationCtaSection } from "@/components/home/ConsultationCtaSection";
import { ArrowRightIcon } from "@/components/home/icons";
import { ProfessionalIntakeFormSection } from "@/components/work-with-us/ProfessionalIntakeFormSection";
import { Link } from "react-router-dom";

const BEAUTY_ROOMS_NJ_URL = "https://www.beautyroomsbynj.com/";

const eyebrowClass =
  "font-barlow font-light text-[10px] tracking-[0.15em] text-warm-brown/80 md:text-xs";

const bodyClass =
  "font-barlow font-light text-lg leading-[1.65] text-[rgba(45,41,38,0.75)] md:text-xl";

const sectionClass = "w-full bg-[#F9F8F6] px-6 py-20 md:px-10 md:py-28 lg:py-32";

const platformBenefits = [
  {
    title: "Client Generation",
    body: "We invest in paid advertising, local search, and digital funnels to bring new clients into the clinic.",
  },
  {
    title: "Booking & CRM System",
    body: "We handle lead capture, booking, follow-ups, and client communication so your schedule stays full.",
  },
  {
    title: "Front Desk & Operations",
    body: "Our front desk manages check-ins, scheduling, and client experience — so you're not dealing with admin.",
  },
  {
    title: "High-End Environment",
    body: "A professional clinic space designed to support premium services and client retention.",
  },
] as const;

const disciplines = [
  "Nurse injectors (Botox / fillers)",
  "Medical aestheticians",
  "Licensed estheticians",
  "Lash artists (classic / volume / mega)",
  "Permanent makeup (PMU) artists",
  "Brow specialists (microblading / lamination)",
  "Skin specialists (acne / anti-aging treatments)",
  "Advanced facial providers (Hydrafacial, peels, etc.)",
  "Laser technicians",
  "Regenerative service (peptides, etc.)",
] as const;

export default function WorkWithUs() {
  return (
    <Layout>
      <section className="relative w-full min-h-[calc(65vh-85px)] overflow-hidden bg-[#FAFAF5]">
        <div className="absolute inset-0">
          <img
            src="/images/workwithus.webp"
            alt="Beauty Rooms Clinic team and workspace"
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
            <p className={`mb-4 ${eyebrowClass}`}>For professionals</p>
            <h1
              id="work-with-us-heading"
              className="mb-6 font-barlow font-light text-[clamp(36px,5vw,56px)] leading-[1.08] tracking-[-0.04em] text-charcoal"
            >
              Join Our Team
            </h1>
            <p className={`max-w-[560px] ${bodyClass}`}>
              Join a boutique clinic in Sarasota where clinical skill meets a calm, luxury experience. We
              welcome talented specialists who share our commitment to thoughtful care and natural-looking
              results.
            </p>
            <div className="mt-8">
              <Link
                to="/contact"
                className="inline-flex items-center gap-3 bg-primary px-10 py-5 font-barlow font-light text-xs uppercase tracking-[0.1em] text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                <span>Contact us</span>
                <ArrowRightIcon />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section
        className="relative w-full overflow-hidden bg-[#FAFAF5] px-6 pt-20 "
        aria-labelledby="platform-focus-heading"
      >
        <div
          className="pointer-events-none absolute left-0 top-0 h-[min(420px,55vw)] w-[min(420px,90vw)] -translate-x-1/3 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(103,92,83,0.06)_0%,transparent_70%)]"
          aria-hidden
        />
        <div className="relative mx-auto max-w-5xl">
          <div className="mb-14  lg:flex lg:items-center lg:justify-between lg:gap-16 xl:gap-24">
            <h2
              id="platform-focus-heading"
              className="mb-6 max-w-[28rem] font-barlow font-light text-2xl leading-snug tracking-[-0.02em] text-charcoal md:max-w-xl md:text-3xl lg:mb-0 lg:shrink-0"
            >
              Focus on your clients. We&apos;ll handle everything else.
            </h2>
            <p className={`max-w-xl lg:pt-1 ${bodyClass}`}>
              The Beauty Rooms Clinic Platform has invested in marketing, technology, and front-of-house
              systems so you can focus on delivering high-value services and growing your income.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 sm:gap-5 lg:gap-6">
            {platformBenefits.map((item, index) => (
              <article
                key={item.title}
                className="group relative border border-[rgba(103,92,83,0.12)] bg-[#F9F8F6]/80 p-8 shadow-[0_1px_0_rgba(255,255,255,0.6)_inset] backdrop-blur-[2px] transition-[box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:shadow-md md:p-9"
              >
                <div className="mb-6 flex items-center gap-4">
                  <span
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[rgba(103,92,83,0.18)] bg-[#FAFAF5] font-barlow text-xs font-light tracking-[0.12em] text-warm-brown"
                    aria-hidden
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span
                    className="h-px min-w-[2rem] flex-1 max-w-[6rem] bg-gradient-to-r from-[rgba(103,92,83,0.28)] to-transparent"
                    aria-hidden
                  />
                  <span className="font-barlow text-[10px] font-light tracking-[0.35em] text-warm-brown/50">
                    ⸻
                  </span>
                </div>
                <h3 className="mb-3 font-barlow font-light text-xl tracking-[-0.02em] text-charcoal md:text-[1.35rem]">
                  {index + 1}. {item.title}
                </h3>
                <p className="font-barlow font-light text-base leading-[1.65] text-[rgba(45,41,38,0.72)] md:text-lg">
                  {item.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={sectionClass} aria-labelledby="disciplines-heading">
        <div className="mx-auto max-w-3xl">
          <h2
            id="disciplines-heading"
            className="mb-6 font-barlow font-light text-2xl tracking-[-0.02em] text-charcoal md:text-3xl"
          >
            Who we&apos;re looking for
          </h2>
          <p className={`mb-8 ${bodyClass}`}>
          We partner with licensed and certified professionals who are reliable, client-focused, and serious about growing their business.


Our platform is best suited to providers offering repeatable, high-demand services — those who value consistency, professionalism, and want to maximize their earning potential within a structured, growth-focused environment.
          </p>
          <ul className="flex flex-col gap-3 border-l-2 border-[rgba(103,92,83,0.25)] pl-6">
            {disciplines.map((item) => (
              <li key={item} className="font-barlow font-light text-lg text-charcoal md:text-xl">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <ProfessionalIntakeFormSection professionSuggestions={disciplines} />

      <section className={sectionClass} aria-labelledby="nj-heading">
        <div className="mx-auto max-w-3xl border border-[rgba(103,92,83,0.12)] bg-[#FAFAF5] px-8 py-10 md:px-12 md:py-12">
          <p className={`mb-3 ${eyebrowClass}`}>Sister brand</p>
          <h2
            id="nj-heading"
            className="mb-4 font-barlow font-light text-2xl tracking-[-0.02em] text-charcoal md:text-3xl"
          >
            Beauty Rooms by NJ
          </h2>
          <p className={`mb-6 ${bodyClass}`}>
          Looking for a booth? Beauty Rooms by NJ offers premium, independent leasing for hair professionals in Sarasota. Same location, separate model—Elevated platform designed for your autonomy
          </p>
          <a
            href={BEAUTY_ROOMS_NJ_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-barlow font-light text-sm uppercase tracking-[0.1em] text-warm-brown underline decoration-warm-brown/40 underline-offset-4 transition-colors hover:text-charcoal hover:decoration-charcoal/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-charcoal"
          >
            Visit beautyroomsbynj.com
            <span aria-hidden>↗</span>
          </a>
        </div>
      </section>

      <ConsultationCtaSection
        headingId="work-with-us-cta-heading"
        titleLines={["Let's talk about", "your next chapter"]}
        subtext="Reach out through our contact page—we’ll respond as soon as we can."
        ctaLabel="Contact us"
        ctaTo="/contact"
      />
    </Layout>
  );
}
