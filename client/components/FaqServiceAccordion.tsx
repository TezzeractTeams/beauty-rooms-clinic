import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { FaqEntry } from "@/lib/faq-from-json";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

type FaqServiceAccordionProps = {
  items: FaqEntry[];
  /** Unique prefix for Radix item values (per page instance). */
  valuePrefix: string;
  className?: string;
};

export function FaqServiceAccordion({ items, valuePrefix, className }: FaqServiceAccordionProps) {
  if (items.length === 0) {
    return (
      <p className="font-barlow text-sm font-light leading-relaxed text-[rgba(45,41,38,0.72)] md:text-base">
        FAQ content will appear here soon.{" "}
        <Link to="/faq" className="text-warm-brown underline decoration-warm-brown/30 underline-offset-2">
          View all FAQs
        </Link>
        .
      </p>
    );
  }

  return (
    <Accordion type="multiple" className={cn("w-full", className)}>
      {items.map((item, i) => (
        <AccordionItem
          key={`${valuePrefix}-${i}`}
          value={`${valuePrefix}-${i}`}
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
  );
}
