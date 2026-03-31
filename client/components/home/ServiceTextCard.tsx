import { Link } from "react-router-dom";
import { GalleryIcon } from "./icons";

export interface ServiceCardProps {
  title: string;
  description: string;
  to: string;
}

export function ServiceTextCard({ title, description, to }: ServiceCardProps) {
  return (
    <div className="bg-[#FAFAF5] flex flex-col justify-center pt-50 px-10 md:px-12 py-12 h-full">
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
