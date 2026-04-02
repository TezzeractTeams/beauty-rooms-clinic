import Layout from "@/components/Layout";
import { Link } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqCategories } from "@/lib/faq-from-json";
import { cn } from "@/lib/utils";

function formatCategoryLabel(category: string) {
  const key = category.trim();
  if (key === "PMU") return "PMU";
  return key
    .toLowerCase()
    .split(/\s+/)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

const sectionCardClass =
  "border border-[rgba(103,92,83,0.12)] bg-[#FAFAF5] px-6 py-8 md:px-10 md:py-10";

export default function Faq() {
  return (
    <Layout>
      <section className="relative w-full min-h-[calc(50vh-85px)] overflow-hidden bg-[#FAFAF5]">
        <div className="absolute inset-0">
          <img
            src="/images/About%20us.webp"
            alt=""
            className="h-full w-full object-cover object-center"
            aria-hidden
          />
        </div>
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, rgba(250,250,245,0.94) 0%, rgba(250,250,245,0.88) 42%, rgba(250,250,245,0.45) 62%, rgba(250,250,245,0.08) 100%)",
          }}
        />
        <div className="relative z-10 flex min-h-[calc(50vh-85px)] flex-col justify-end px-6 py-16 md:px-10 md:py-24 lg:px-[90px]">
          <div className="max-w-[720px]">
            <p className="mb-4 font-barlow font-light text-[10px] tracking-[0.15em] text-warm-brown/80 md:text-xs">
              Help center
            </p>
            <h1
              id="faq-heading"
              className="mb-4 font-barlow font-extralight text-[clamp(36px,5vw,56px)] capitalize leading-[1.08] tracking-[-0.04em] text-charcoal"
            >
              Frequently asked questions
            </h1>
            <p className="max-w-[560px] font-barlow font-light text-lg leading-[1.65] text-[rgba(45,41,38,0.75)] md:text-xl">
              Answers about our treatments, preparation, and what to expect—organized by category.
            </p>
          </div>
        </div>
      </section>

      <section
        className="w-full bg-[#F9F8F6] px-6 py-16 md:px-10 md:py-24 lg:py-28"
        aria-labelledby="faq-heading"
      >
        <div className="mx-auto max-w-3xl space-y-14 md:space-y-16">
          {faqCategories.length === 0 ? (
            <p className="text-center font-barlow font-light text-warm-brown/80">
              Questions and answers will appear here once added to the FAQ data file.
            </p>
          ) : (
            faqCategories.map((cat, ci) => (
              <div key={cat.category}>
                <h2 className="mb-8 font-barlow font-extralight text-2xl tracking-[-0.02em] text-charcoal md:text-3xl">
                  {formatCategoryLabel(cat.category)}
                </h2>
                <div className="space-y-10">
                  {cat.services.map((svc, si) => (
                    <div key={`${cat.category}-${svc.service}`} className={sectionCardClass}>
                      <h3 className="mb-4 font-barlow font-extralight text-xs tracking-[0.12em] uppercase text-warm-brown/85">
                        {svc.service}
                      </h3>
                      <Accordion type="multiple" className="w-full">
                        {svc.items.map((item, ii) => (
                          <AccordionItem
                            key={`${ci}-${si}-${ii}`}
                            value={`faq-${ci}-${si}-${ii}`}
                            className="border-[rgba(103,92,83,0.12)]"
                          >
                            <AccordionTrigger
                              className={cn(
                                "py-4 text-left font-barlow font-light text-base text-charcoal hover:no-underline md:text-[17px]",
                                "[&[data-state=open]]:text-warm-brown",
                              )}
                            >
                              {item.question}
                            </AccordionTrigger>
                            <AccordionContent>
                              <p className="whitespace-pre-line pb-2 font-barlow font-light text-sm leading-relaxed text-[rgba(45,41,38,0.78)] md:text-base">
                                {item.answer}
                              </p>
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      <section
        className="flex w-full flex-col items-center justify-center bg-[#696969] px-6 py-20 text-center md:py-28"
        aria-labelledby="faq-cta-heading"
      >
        <h2
          id="faq-cta-heading"
          className="mb-8 max-w-2xl font-barlow font-extralight text-3xl leading-[1.15] tracking-[-0.03em] text-white sm:text-4xl"
        >
          Still have questions?
        </h2>
        <Link
          to="/contact"
          className="inline-block border border-white bg-transparent px-10 py-4 font-barlow font-light text-[11px] uppercase tracking-[0.12em] text-white transition-colors hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white md:px-12 md:py-5 md:text-xs"
        >
          Contact us
        </Link>
      </section>
    </Layout>
  );
}
