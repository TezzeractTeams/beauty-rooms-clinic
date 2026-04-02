import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { GalleryIcon } from "./icons";

export interface ServiceCardProps {
  title: string;
  description: string;
  to: string;
  /** Merged onto the card root (e.g. tighter padding for split tiles). */
  className?: string;
}

export function ServiceTextCard({ title, description, to, className }: ServiceCardProps) {
  return (
    <div
      className={cn(
        "bg-[#F4F4EF] flex flex-col justify-center px-8 py-12 md:px-10 md:py-14 lg:px-12 h-full min-h-[280px]",
        className,
      )}
    >
      <h3 className="font-barlow font-light text-[clamp(22px,2.5vw,30px)] leading-[1.2] tracking-[-0.02em] text-charcoal mb-4 whitespace-pre-line">
        {title}
      </h3>
      <div className="w-full h-px bg-[rgba(103,92,83,0.15)] mb-6" />
      <p className="font-barlow font-light text-[15px] leading-[1.65] text-[rgba(45,41,38,0.65)] mb-8 max-w-[280px]">
        {description}
      </p>
      <Link
        to={to}
        className="inline-flex items-center gap-2 font-barlow font-light text-[10px] tracking-[0.15em] uppercase text-warm-brown/80 hover:text-warm-brown transition-colors"
      >
        View Gallery
        <GalleryIcon />
      </Link>
    </div>
  );
}
