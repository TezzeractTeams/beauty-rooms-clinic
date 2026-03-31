import Layout from "@/components/Layout";
import { ConsultationCtaSection } from "@/components/home/ConsultationCtaSection";
import { ArrowRightIcon } from "@/components/home/icons";
import { Link } from "react-router-dom";

const BEAUTY_ROOMS_NJ_URL = "https://www.beautyroomsbynj.com/";

const eyebrowClass =
  "font-barlow font-light text-[10px] tracking-[0.15em] text-warm-brown/80 md:text-xs";

const bodyClass =
  "font-barlow font-light text-lg leading-[1.65] text-[rgba(45,41,38,0.75)] md:text-xl";

const sectionClass = "w-full bg-[#F9F8F6] px-6 py-20 md:px-10 md:py-28 lg:py-32";

const disciplines = [
  "Lash artists",
  "Head spa and scalp care specialists",
  "Permanent makeup (PMU) artists",
  "Estheticians and skin-focused practitioners",
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
              className="mb-6 font-barlow font-light text-[clamp(36px,5vw,56px)] capitalize leading-[1.08] tracking-[-0.04em] text-charcoal"
            >
              Work with us
            </h1>
            <p className={`max-w-[560px] ${bodyClass}`}>
              Join a boutique clinic in Sarasota where clinical skill meets a calm, luxury experience. We
              welcome talented specialists who share our commitment to thoughtful care and natural-looking
              results.
            </p>
            <div className="mt-8">
              <Link
                to="/contact"
                className="inline-flex items-center gap-3 bg-charcoal px-10 py-5 font-barlow font-light text-xs uppercase tracking-[0.1em] text-cream transition-colors hover:bg-charcoal/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-charcoal"
              >
                <span>Contact us</span>
                <ArrowRightIcon />
              </Link>
            </div>
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
            We build our menu around advanced beauty and wellness services. If you excel in one of these
            areas and value a refined, client-first environment, we would love to hear from you.
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

      <section
        className="w-full bg-[#FAFAF5] px-6 py-20 md:px-10 md:py-28 lg:py-32"
        aria-labelledby="environment-heading"
      >
        <div className="mx-auto max-w-3xl">
          <h2
            id="environment-heading"
            className="mb-6 font-barlow font-light text-2xl tracking-[-0.02em] text-charcoal md:text-3xl"
          >
            What you can expect
          </h2>
          <p className={`mb-6 ${bodyClass}`}>
            Beauty Rooms Clinic is designed as a sanctuary for guests and a professional home for
            specialists. We focus on clear standards, respectful collaboration, and a space where your
            expertise can shine.
          </p>
          <p className={bodyClass}>
            Whether you are exploring a new home for your practice or the next step in your career, tell us
            about your background and goals—we will follow up with next steps.
          </p>
        </div>
      </section>

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
            Interested in running your own suite or renting a booth?{" "}
            <span className="text-charcoal">Beauty Rooms by NJ</span> offers adjoining salon suite and booth
            rental spaces for hair, wellness, and beauty professionals in the Sarasota area—separate from
            our clinic services, with its own leasing model.
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
