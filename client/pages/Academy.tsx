import Layout from "@/components/Layout";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ArrowRightIcon } from "@/components/home/icons";
import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import {
  Clock3,
  DollarSign,
  Briefcase,
  GraduationCap,
  Hand,
  Play,
  ArrowRight,
  Stethoscope,
  Users,
} from "lucide-react";

function smoothScrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}

const HUBSPOT_ACADEMY_EMBED_SCRIPT_SRC = "https://js-na2.hsforms.net/forms/embed/245575840.js";
const HUBSPOT_ACADEMY_EMBED_SCRIPT_ID = "hs-forms-embed-academy";

export default function Academy() {
  const aboutVideoRef = useRef<HTMLVideoElement | null>(null);
  const academyFormRef = useRef<HTMLDivElement | null>(null);
  const [isAboutVideoPlaying, setIsAboutVideoPlaying] = useState(false);
  const showModelsWanted = false;

  const handleSmoothScroll = useCallback((id: string) => {
    // Guard for SSR (shouldn't occur in this SPA, but keeps it safe).
    if (typeof document === "undefined") return;
    smoothScrollToId(id);
  }, []);

  const handlePlayAboutVideo = useCallback(() => {
    if (!aboutVideoRef.current) return;
    aboutVideoRef.current.muted = false;
    aboutVideoRef.current.volume = 1;
    void aboutVideoRef.current.play();
    setIsAboutVideoPlaying(true);
  }, []);

  useEffect(() => {
    academyFormRef.current?.replaceChildren();
    document.getElementById(HUBSPOT_ACADEMY_EMBED_SCRIPT_ID)?.remove();
    const script = document.createElement("script");
    script.id = HUBSPOT_ACADEMY_EMBED_SCRIPT_ID;
    script.src = HUBSPOT_ACADEMY_EMBED_SCRIPT_SRC;
    script.defer = true;
    document.body.appendChild(script);

    return () => {
      script.remove();
    };
  }, []);

  const curriculum = [
    {
      value: "level-1",
      title: "BRC PMU Level 1 - Foundation Course",
      overview:
        "Your entry point into Permanent Makeup. This course is designed for beginners looking to build a strong foundation in PMU techniques, safety, and client handling. You'll learn one core procedure (Brows, Lips, or Eyeliner) while developing confidence through guided practice and hands-on training.",
      learn: [
        "PMU fundamentals & safety protocols",
        "Skin anatomy & hygiene",
        "Color theory basics",
        "Machine & tool setup",
        "Core technique (Brows OR Lips OR Eyeliner)",
        "Client consultation",
        "Hands-on practice (latex + model)",
      ],
      duration: "3 Days (30 Hours Total) (1 Day Theory, 2 Days Hands-On Training)",
      price: "$1,800",
    },
    {
      value: "level-2",
      title: "BRC PMU Level 2 - Advanced Techniques",
      overview: "Expand your skillset and increase your earning potential.",
      learn: [
        "Powder brows, microblading, lip blush, eyeliner",
        "Advanced color selection",
        "Mapping & symmetry",
        "Live model practice",
      ],
      duration: "3 Days (30 Hours Total)",
      price: "$2,000",
    },
    {
      value: "level-3",
      title: "BRC PMU Level 3 - Master Artist Course",
      overview: "Advanced training focused on precision and premium services.",
      learn: [
        "Advanced techniques",
        "Color correction",
        "Business & pricing strategy",
      ],
      duration: "3 Days (30 Hours Total)",
      price: "$1,800",
    },
    {
      value: "level-4",
      title: "BRC PMU Level 4 - Trainer Certification Course",
      overview: "Learn how to teach and build training income.",
      learn: [
        "Teaching techniques",
        "Course structuring",
        "Student evaluation",
      ],
      duration: "2-3 Days",
      price: "$1,800",
    },
  ] as const;

  const whyChooseUsItems = [
    {
      title: "Hands-on training",
      body: "Guided technique from day one.",
      icon: <Hand className="h-5 w-5 text-warm-brown" strokeWidth={1.6} />,
    },
    {
      title: "Real clinic environment",
      body: "Learn in a setting built for clients.",
      icon: <Stethoscope className="h-5 w-5 text-warm-brown" strokeWidth={1.6} />,
    },
    {
      title: "Small groups",
      body: "More attention, better outcomes.",
      icon: <Users className="h-5 w-5 text-warm-brown" strokeWidth={1.6} />,
    },
    {
      title: "Career progression",
      body: "Level up with proven curriculum steps.",
      icon: <Briefcase className="h-5 w-5 text-warm-brown" strokeWidth={1.6} />,
    },
    {
      title: "Expert instructors",
      body: "Learn from trainers who've done it.",
      icon: <GraduationCap className="h-5 w-5 text-warm-brown" strokeWidth={1.6} />,
    },
  ] as const;

  return (
    <Layout>
      {/* 1. HERO SECTION */}
      <section className="flex w-full min-h-[calc(100dvh-85px)] flex-col md:h-[calc(100dvh-85px)] md:flex-row md:items-stretch">
        <div className="flex w-full flex-col justify-center px-6 py-14 md:h-full md:w-1/3 md:flex-none md:px-10 md:py-10 lg:px-[72px]">
          <div className="mx-auto w-full max-w-md md:mx-0">
            <p className="font-barlow font-light text-[10px] md:text-xs tracking-[0.15em] uppercase text-[#757575] mb-5 md:mb-6">
              BRC Permanent Makeup Academy
            </p>
            <h1 className="font-barlow font-extralight text-[clamp(36px,5vw,64px)] leading-none tracking-[-0.05em] text-charcoal mb-6 md:mb-8">
              Train. Certify. Build Your Beauty Career.
            </h1>

            <a
              href="#apply-now-form"
              onClick={(e) => {
                e.preventDefault();
                handleSmoothScroll("apply-now-form");
              }}
              className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-primary text-primary-foreground font-barlow font-light text-xs tracking-[0.1em] uppercase hover:bg-primary/90 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              <span>Apply Now</span>
            </a>
          </div>
        </div>

        <div className="relative w-full min-h-[52vh] overflow-hidden md:h-full md:w-2/3 md:flex-none md:min-h-0">
          <video
            className="absolute inset-0 h-full w-full object-cover object-center"
            src="/video/Academy Hero Video.mp4"
            autoPlay
            muted
            loop
            playsInline
          />
        </div>
      </section>

      {/* 2. ABOUT THE ACADEMY (Authority Section) */}
      <section className="w-full px-6 md:px-10 py-12 md:py-14">
        <div className="mx-auto max-w-5xl px-6 py-6 text-center md:px-10 md:py-8">
          <div className="mx-auto max-w-3xl">
            <p className="font-barlow font-light text-[10px] tracking-[0.15em] uppercase text-warm-brown/70 mb-5">
              About the Academy
            </p>
            <h2 className="font-barlow font-extralight text-[clamp(28px,3.5vw,44px)] leading-[1.15] tracking-[-0.03em] text-charcoal">
              A leader in precision training
            </h2>
            <p className="font-barlow font-light text-lg leading-[1.65] text-[rgba(45,41,38,0.75)] mt-6">
              As a forefront leader in the beauty industry, our academy is committed to excellence and
              innovation. We empower the next generation of beauty professionals with structured
              coaching, safety-first technique, and real-world clinic exposure.
            </p>
          </div>

          <div className="mx-auto mt-10 w-full max-w-3xl">
            <div className="relative aspect-[16/9] overflow-hidden">
              <video
                ref={aboutVideoRef}
                className="h-full w-full object-cover object-center"
                src="/video/Academy About Video.mp4"
                playsInline
                controls={isAboutVideoPlaying}
                muted={false}
                onPlay={() => setIsAboutVideoPlaying(true)}
                onPause={() => setIsAboutVideoPlaying(false)}
              />

              {!isAboutVideoPlaying ? (
                <button
                  type="button"
                  onClick={handlePlayAboutVideo}
                  className="group absolute inset-0 flex items-center justify-center bg-black/30 transition-colors hover:bg-black/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                  aria-label="Play academy about video"
                >
                  <span className="flex flex-col items-center gap-3">
                    <span className="flex h-24 w-24 items-center justify-center rounded-full bg-white text-charcoal shadow-md transition-transform duration-200 group-hover:scale-105">
                      <Play className="ml-1.5 h-10 w-10" strokeWidth={1.75} fill="currentColor" />
                    </span>
                    <span className="font-barlow text-[11px] uppercase tracking-[0.12em] text-white/95 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                      Click to play with sound
                    </span>
                  </span>
                </button>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      {/* 3. WHY CHOOSE US (Trust Bullets) */}
      <section className="w-full px-6 md:px-10 py-12 md:py-14">
        <div className="mx-auto max-w-5xl px-6 py-6 md:px-10 md:py-8">
          <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="order-2 overflow-hidden lg:order-1">
              <video
                className="aspect-[10/14] h-full w-full object-cover object-center"
                src="/video/Results.mp4"
                autoPlay
                muted
                loop
                playsInline
              />
            </div>

            <div className="order-1 lg:order-2">
              <p className="font-barlow font-light text-[10px] tracking-[0.15em] uppercase text-warm-brown/70 mb-5">
                Why choose us
              </p>
              <h2 className="font-barlow font-extralight text-[clamp(28px,3.5vw,44px)] leading-[1.15] tracking-[-0.03em] text-charcoal max-w-[520px]">
                Trust the training that shows up in the clinic
              </h2>

              <div className="mt-8 space-y-4">
                {whyChooseUsItems.map((item) => (
                  <div key={item.title} className="flex items-start gap-4">
                    <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-none bg-[#F4F4EF]">
                      {item.icon}
                    </span>
                    <div className="pt-1">
                      <p className="font-barlow font-light text-lg text-charcoal">{item.title}</p>
                      <p className="mt-1 font-barlow font-light text-sm leading-[1.65] text-[rgba(45,41,38,0.70)]">
                        {item.body}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. PROGRAMS OVERVIEW */}
      <section className="w-full px-6 md:px-10 py-12 md:py-14">
        <div className="mx-auto max-w-5xl px-6 py-6 md:px-10 md:py-8">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.5fr_1fr] lg:items-start">
          <div className="max-w-[520px]">
            <p className="font-barlow font-light text-[10px] tracking-[0.15em] uppercase text-warm-brown/70 mb-5">
              Programs overview
            </p>
            <h2 className="font-barlow font-extralight text-[clamp(28px,3.5vw,44px)] leading-[1.15] tracking-[-0.03em] text-charcoal max-w-[480px]">
              Structured learning, built for real client results
            </h2>
            <p className="font-barlow font-light text-lg leading-[1.65] text-[rgba(45,41,38,0.75)] mt-6 max-w-[760px]">
              Our modular structure supports PMU now, with Esthetics and Laser designed for the future.
              Each level builds confidence through safety, technique, and guided practice - so you're ready
              to perform with consistency.
            </p>

            <div className="mt-8 space-y-7 max-w-[520px]">
              <div className="flex items-start gap-3">
                <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center bg-[#F4F4EF]">
                  <Clock3 className="h-4 w-4 text-warm-brown" strokeWidth={1.6} />
                </span>
                <div>
                  <p className="font-barlow font-light text-sm uppercase tracking-[0.12em] text-warm-brown/80">
                    30-hour program
                  </p>
                  <p className="mt-1 font-barlow font-light text-sm leading-[1.65] text-[rgba(45,41,38,0.75)]">
                    10h theory, 10h hands-on, 10h instructor-led.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center bg-[#F4F4EF]">
                  <Briefcase className="h-4 w-4 text-warm-brown" strokeWidth={1.6} />
                </span>
                <div>
                  <p className="font-barlow font-light text-sm uppercase tracking-[0.12em] text-warm-brown/80">
                    Career path
                  </p>
                  <p className="mt-1 font-barlow font-light text-sm leading-[1.65] text-[rgba(45,41,38,0.75)]">
                    Beginner -&gt; Advanced -&gt; Master -&gt; Trainer
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center bg-[#F4F4EF]">
                  <DollarSign className="h-4 w-4 text-warm-brown" strokeWidth={1.6} />
                </span>
                <div>
                  <p className="font-barlow font-light text-sm uppercase tracking-[0.12em] text-warm-brown/80">
                    Pricing
                  </p>
                  <p className="mt-1 font-barlow font-light text-sm leading-[1.65] text-[rgba(45,41,38,0.75)]">
                    From $1,800-$2,000 per course
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="aspect-[9/16] overflow-hidden">
              <video
                className="h-full w-full object-cover object-center"
                src="/video/Process.mp4"
                autoPlay
                muted
                loop
                playsInline
              />
            </div>
          </div>
        </div>
        </div>
      </section>

      {/* 5. THE BRC PMU CERTIFICATION JOURNEY: CURRICULUM & LEVELS (Accordion) */}
      <section
        id="academy-curriculum"
        className="w-full px-6 md:px-10 py-12 md:py-14 scroll-mt-24"
        aria-labelledby="academy-curriculum-heading"
      >
        <div className="mx-auto max-w-5xl px-6 py-6 text-center md:px-10 md:py-8">
          <div className="mb-8 md:mb-10">
            <p className="font-barlow font-light text-[10px] tracking-[0.15em] uppercase text-warm-brown/70 mb-5">
              The BRC PMU Certification Journey
            </p>
            <h2
              id="academy-curriculum-heading"
              className="font-barlow font-extralight text-[clamp(28px,3.5vw,56px)] leading-[1.1] tracking-[-0.03em] text-charcoal"
            >
              Curriculum &amp; Levels
            </h2>
          </div>

          <Accordion type="single" collapsible className="w-full text-left">
            {curriculum.map((item) => (
              <AccordionItem
                key={item.value}
                value={item.value}
                className="mb-4 last:mb-0"
              >
                <AccordionTrigger className="px-6 md:px-10 py-6 md:py-7 text-left font-barlow font-light text-lg text-charcoal hover:no-underline">
                  {item.title}
                </AccordionTrigger>

                <AccordionContent className="px-6 md:px-10 pb-8 md:pb-10">
                  <div className="flex flex-col gap-6">
                    <p className="font-barlow font-light text-base leading-[1.7] text-[rgba(45,41,38,0.75)]">
                      {item.overview}
                    </p>

                    <div className="space-y-3">
                      <p className="font-barlow font-light text-xs tracking-[0.12em] uppercase text-warm-brown/85">
                        What You'll Learn
                      </p>
                      <ul className="list-disc pl-6 space-y-2">
                        {item.learn.map((l) => (
                          <li
                            key={l}
                            className="font-barlow font-light text-base leading-[1.6] text-[rgba(45,41,38,0.78)]"
                          >
                            {l}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="px-4 py-4">
                        <p className="font-barlow font-light text-xs tracking-[0.12em] uppercase text-warm-brown/85">
                          Duration
                        </p>
                        <p className="font-barlow font-light text-base leading-[1.5] text-charcoal mt-2">
                          {item.duration}
                        </p>
                      </div>
                      <div className="px-4 py-4">
                        <p className="font-barlow font-light text-xs tracking-[0.12em] uppercase text-warm-brown/85">
                          Price
                        </p>
                        <p className="font-barlow font-light text-base leading-[1.5] text-charcoal mt-2">
                          {item.price}
                        </p>
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* 6. FUTURE PROGRAMS */}
      <section className="w-full bg-[#F4F4EF] px-6 md:px-10 py-12 md:py-14">
        <div className="mx-auto max-w-5xl px-6 py-6 md:px-10 md:py-8">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="font-barlow font-light text-[10px] tracking-[0.15em] uppercase text-warm-brown/70">
                Future programs
              </p>
              <h2 className="mt-5 font-barlow font-extralight text-[clamp(28px,3.5vw,44px)] leading-[1.15] tracking-[-0.03em] text-charcoal max-w-[420px]">
                Esthetics, Laser &amp; advanced skin treatments
              </h2>
            </div>

            <div className="space-y-4">
              {[
                "Esthetics",
                "Laser",
                "Advanced Skin Treatments",
              ].map((label) => (
                <div
                  key={label}
                  className="flex items-center justify-between gap-4 bg-[#FAFAF5] px-6 py-5"
                >
                  <p className="font-barlow font-light text-xl leading-[1.15] text-charcoal">
                    {label}
                  </p>
                  <span className="inline-flex shrink-0 items-center bg-[#EDE8E1] px-4 py-2 font-barlow font-light text-xs tracking-[0.12em] uppercase text-warm-brown/90">
                    Coming Soon
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 7. MODELS WANTED (Lead Capture Funnel) */}
      {showModelsWanted ? (
      <section className="w-full px-6 md:px-10 py-12 md:py-14">
        <div className="mx-auto max-w-[1536px]">
          <div className="relative px-6 md:px-10 py-12 md:py-14">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-center">
              <div className="lg:col-span-2">
                <p className="font-barlow font-light text-[10px] tracking-[0.15em] uppercase text-warm-brown/70 mb-5">
                  Models wanted
                </p>
                <h2 className="font-barlow font-extralight text-[clamp(28px,3.5vw,44px)] leading-[1.15] tracking-[-0.03em] text-charcoal max-w-[680px]">
                  Discounted treatments for training support
                </h2>
                <p className="font-barlow font-light text-lg leading-[1.65] text-[rgba(45,41,38,0.75)] mt-6 max-w-[760px]">
                  Help students practice in a professional clinic setting. In exchange, models receive
                  discounted treatments while supporting the next generation of certified artists.
                </p>

                <div className="mt-8">
                  <a
                    href="#apply-now-form"
                    onClick={(e) => {
                      e.preventDefault();
                      handleSmoothScroll("apply-now-form");
                    }}
                    className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-primary text-primary-foreground font-barlow font-light text-xs tracking-[0.1em] uppercase hover:bg-primary/90 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                  >
                    <span>Apply as a Model</span>
                    <ArrowRightIcon />
                  </a>
                </div>
              </div>

              <div className="lg:col-span-1">
                <div className="aspect-[9/16] overflow-hidden">
                  <img
                    src="/images/OurHands.jpeg"
                    alt="Model and treatment environment"
                    className="h-full w-full object-cover object-center"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      ) : null}

      {/* 8. HOW IT WORKS (3-Step Flow) */}
      <section className="w-full px-6 md:px-10 py-12 md:py-14">
        <div className="mx-auto max-w-5xl px-6 py-6 md:px-10 md:py-8">
          <div className="flex flex-col items-center gap-4 text-center mb-10 md:mb-12">
            <p className="font-barlow font-light text-[10px] tracking-[0.15em] uppercase text-warm-brown/70">
              How it works
            </p>
            <h2 className="font-barlow font-extralight text-[clamp(28px,3.5vw,44px)] leading-[1.15] tracking-[-0.03em] text-charcoal max-w-[720px]">
              Apply - Train - Get Certified
            </h2>
          </div>

          <div className="flex flex-col items-center gap-4 md:flex-row md:items-stretch md:justify-center md:gap-3">
            {[
              {
                n: "01",
                title: "Apply",
                body: "Tell us about your goals and experience. We'll guide you to the right level.",
              },
              {
                n: "02",
                title: "Train",
                body: "Learn safety-first PMU with guided hands-on coaching and clinic exposure.",
              },
              {
                n: "03",
                title: "Get Certified",
                body: "Complete your level with confidence, ready to deliver premium services.",
              },
            ].map((step, index, arr) => (
              <Fragment key={step.n}>
                <div
                  className="w-full max-w-[290px] bg-[#F4F4EF] px-6 py-8 text-center"
                >
                  <div className="mx-auto flex h-12 w-12 items-center justify-center bg-[#FAFAF5]">
                    <span className="font-barlow font-light text-sm tracking-[0.12em] text-warm-brown/90">
                      {step.n}
                    </span>
                  </div>
                  <p className="mt-5 font-barlow font-light text-2xl text-charcoal">{step.title}</p>
                  <p className="mt-4 font-barlow font-light text-base leading-[1.7] text-[rgba(45,41,38,0.75)]">
                    {step.body}
                  </p>
                </div>
                {index < arr.length - 1 ? (
                  <div
                    className="flex h-10 items-center justify-center text-warm-brown md:h-auto"
                    aria-hidden
                  >
                    <ArrowRight className="h-5 w-5 rotate-90 md:rotate-0" strokeWidth={1.5} />
                  </div>
                ) : null}
              </Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* 9. RESERVE YOUR SPOT + APPLY FORM */}
      <section
        id="apply-now-form"
        className="w-full px-6 py-12 md:px-10 md:py-14 scroll-mt-24"
        aria-labelledby="apply-now-form-heading"
      >
        <div className="mx-auto max-w-5xl px-6 py-6 text-center md:px-10 md:py-8">
          <p className="font-barlow font-light text-[10px] tracking-[0.15em] uppercase text-warm-brown/70 mb-5">
            Reserve your spot
          </p>
          <h2
            id="apply-now-form-heading"
            className="mb-6 font-barlow font-extralight text-[clamp(28px,3.5vw,44px)] leading-[1.15] tracking-[-0.03em] text-charcoal"
          >
            Apply Now
          </h2>

          <p className="mx-auto mb-8 max-w-3xl font-barlow font-light text-lg leading-[1.65] text-[rgba(45,41,38,0.75)]">
            Students apply to book their PMU course. Models apply for discounted training and clinic support.
          </p>

          <div className="mx-auto max-w-3xl p-8 text-left md:p-10 [color-scheme:light]">
            <p className="mb-4 font-barlow font-light text-sm text-[rgba(45,41,38,0.6)]">
              Loading application form...
            </p>
            <div
              ref={academyFormRef}
              className="hs-form-frame min-h-[12rem]"
              data-region="na2"
              data-form-id="ce8339ab-5414-419e-b7f0-7c63c5921798"
              data-portal-id="245575840"
            />
          </div>
        </div>
      </section>
    </Layout>
  );
}

