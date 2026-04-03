import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

const sectionCardClass =
  "border border-[rgba(103,92,83,0.12)] bg-[#FAFAF5] px-6 py-8 md:px-10 md:py-10";

const LASH_KNOW_IMAGE_SRC = "/images/OurHands.jpeg";

const LASH_FAQ_ITEMS = [
  {
    question: "What is the difference between classic and volume lash extensions?",
    answer:
      "Classic extensions place one extension on each natural lash for a clean, mascara-like look. Volume uses lighter fans (multiple ultra-fine lashes per natural lash) for fuller, fluffier density. We map the right style to your natural lashes and the look you want.",
  },
  {
    question: "How often should I book a fill?",
    answer:
      "Most guests return every 2–3 weeks as natural shedding creates gaps. Timing depends on your growth cycle, aftercare, and how full you like your set. We’ll recommend a schedule after your first appointment.",
  },
  {
    question: "What is a lash lift and tint—do I still need extensions?",
    answer:
      "A lash lift curls your natural lashes from the root and tint deepens the color, so they look longer and darker without daily mascara. It’s ideal if you want low-maintenance enhancement without individual extensions.",
  },
  {
    question: "How should I care for my lashes after the appointment?",
    answer:
      "Keep them dry and avoid steam, saunas, and heavy oils around the eyes for the first day or as advised. Cleanse gently with a lash-safe cleanser, avoid rubbing or pulling, and sleep on your back when you can to help retention.",
  },
  {
    question: "Can I wear mascara or use an eyelash curler with extensions?",
    answer:
      "We generally recommend skipping mascara and mechanical curlers on extensions—they can weaken the bond and damage fans. If you ever need removal or a break, book a professional removal rather than pulling them at home.",
  },
] as const;

export function LashKnowFaqSection() {
  return (
    <section
      className="w-full border-t border-[rgba(103,92,83,0.1)] bg-[#F9F8F6] px-6 py-16 md:px-10 md:py-20 lg:py-24"
      aria-labelledby="lash-know-heading"
    >
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-start gap-10 lg:grid-cols-2 lg:gap-12 xl:gap-16">
        <div className="relative w-full overflow-hidden lg:sticky lg:top-28">
          <img
            src={LASH_KNOW_IMAGE_SRC}
            alt="Lash and brow styling at Beauty Rooms Clinic"
            className="aspect-[4/5] w-full object-cover object-center"
            width={960}
            height={1200}
            loading="lazy"
            decoding="async"
          />
        </div>
        <div className="min-w-0">
          <h2
            id="lash-know-heading"
            className="mb-4 font-barlow font-extralight text-[clamp(28px,4vw,40px)] leading-[1.12] tracking-[-0.03em] text-charcoal md:mb-5"
          >
            Get to know about Lashes
          </h2>
          <p className="mb-10 max-w-[560px] font-barlow font-light text-base leading-[1.65] text-[rgba(45,41,38,0.75)] md:mb-12 md:text-lg">
            Quick answers about styles, fills, lifts, and how to get the most from your appointment.
          </p>
          <div className={sectionCardClass}>
            <Accordion type="multiple" className="w-full">
              {LASH_FAQ_ITEMS.map((item, i) => (
                <AccordionItem
                  key={item.question}
                  value={`lash-faq-${i}`}
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
        </div>
      </div>
    </section>
  );
}
