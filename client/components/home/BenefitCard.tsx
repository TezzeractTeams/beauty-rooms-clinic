import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface BenefitCardProps {
  icon: ReactNode;
  title: string;
  description?: string;
  titleWeight: string;
  /** Tighter icon + spacing: small icon, header, brief description (e.g. service category benefits) */
  compact?: boolean;
}

export function BenefitCard({ icon, title, description, titleWeight, compact }: BenefitCardProps) {
  return (
    <div className="bg-[#FAFAF5] flex flex-col gap-0 px-8 py-8">
      <div
        className={cn(
          compact
            ? "mb-5 inline-block origin-top-left scale-[0.88] [&_svg]:block"
            : "mb-[46px]",
        )}
      >
        {icon}
      </div>
      <h3
        className={`font-barlow ${titleWeight} text-2xl leading-8 tracking-[-0.02em] text-[#2D2926] mb-[14px]`}
      >
        {title}
      </h3>
      {description ? (
        <p className="font-barlow font-light text-base leading-[26px] text-[rgba(45,41,38,0.60)] max-w-[285px]">
          {description}
        </p>
      ) : null}
    </div>
  );
}
