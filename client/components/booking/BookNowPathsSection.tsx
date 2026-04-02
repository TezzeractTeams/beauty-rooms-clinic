import { Link } from "react-router-dom";
import { Calendar, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const IMG_FAST =
  "https://images.unsplash.com/photo-1583001931099-4a6cfdc679db?w=900&q=80&auto=format&fit=crop";
const IMG_CONSULT =
  "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=900&q=80&auto=format&fit=crop";

function ServiceList({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-col gap-0">
      {items.map((item) => (
        <li
          key={item}
          className="flex items-center justify-between gap-4 border-b border-charcoal/[0.08] py-3.5 font-barlow text-sm font-light text-charcoal last:border-b-0 md:text-base"
        >
          <span>{item}</span>
          <ChevronRight className="h-4 w-4 shrink-0 text-charcoal/35" strokeWidth={1.25} aria-hidden />
        </li>
      ))}
    </ul>
  );
}

interface PathColumnProps {
  imageSrc: string;
  imageAlt: string;
  eyebrow: string;
  title: string;
  items: string[];
  ctaLabel: string;
  ctaTo: string;
  variant: "solid" | "outline";
  className?: string;
}

function PathColumn({
  imageSrc,
  imageAlt,
  eyebrow,
  title,
  items,
  ctaLabel,
  ctaTo,
  variant,
  className,
}: PathColumnProps) {
  return (
    <div className={cn("flex flex-col", className)}>
      <div className="relative mb-8 aspect-[4/5] w-full overflow-hidden bg-charcoal/10 md:mb-10">
        <img
          src={imageSrc}
          alt={imageAlt}
          className="h-full w-full object-cover object-center grayscale"
        />
      </div>
      <p className="mb-3 font-barlow text-[10px] font-light uppercase tracking-[0.2em] text-charcoal/45 md:text-xs">
        {eyebrow}
      </p>
      <h2 className="font-barlow text-[clamp(1.75rem,4vw,2.5rem)] font-light leading-[1.15] tracking-[-0.02em] text-charcoal">
        {title}
      </h2>
      <div className="my-6 h-px w-full bg-charcoal/[0.12]" />
      <ServiceList items={items} />
      <div className="mt-10">
        {variant === "solid" ? (
          <Link
            to={ctaTo}
            className="inline-flex w-full items-center justify-center gap-2.5 bg-primary px-8 py-4 font-barlow text-xs font-light uppercase tracking-[0.1em] text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:w-auto"
          >
            <span>{ctaLabel}</span>
            <Calendar className="h-4 w-4" strokeWidth={1.5} aria-hidden />
          </Link>
        ) : (
          <Link
            to={ctaTo}
            className="inline-flex w-full items-center justify-center gap-2.5 border border-charcoal/35 bg-transparent px-8 py-4 font-barlow text-xs font-light uppercase tracking-[0.1em] text-charcoal transition-colors hover:bg-charcoal/[0.04] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-charcoal sm:w-auto"
          >
            <span>{ctaLabel}</span>
            <Calendar className="h-4 w-4" strokeWidth={1.5} aria-hidden />
          </Link>
        )}
      </div>
    </div>
  );
}

export function BookNowPathsSection() {
  return (
    <section
      className="w-full bg-[#FAF9F6] py-20 md:py-28 lg:py-32"
      aria-labelledby="booking-paths-heading"
    >
      <h2 id="booking-paths-heading" className="sr-only">
        Choose how to book
      </h2>
      <div className="mx-auto grid w-[90%] grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-x-20 lg:gap-y-0">
        <PathColumn
          imageSrc={IMG_CONSULT}
          imageAlt="Close-up of an eye with long lashes"
          eyebrow="Available now"
          title="Fast Booking Services"
          items={["Lash Extensions", "Lash Fills", "Basic Facials"]}
          ctaLabel="Book now"
          ctaTo="/bookings#booking-embed"
          variant="solid"
        />
        <PathColumn
          className="lg:pt-20"
          imageSrc={IMG_CONSULT}
          imageAlt="Clinic professional providing specialized care"
          eyebrow="Specialized care"
          title="Consultation Services"
          items={["Microblading", "Lip Blush", "Powder Brows", "Advanced Skin Treatments"]}
          ctaLabel="Book consultation"
          ctaTo="/bookings#booking-embed"
          variant="outline"
        />
      </div>
    </section>
  );
}
