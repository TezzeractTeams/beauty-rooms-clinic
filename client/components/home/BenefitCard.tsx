import type { ReactNode } from "react";

export interface BenefitCardProps {
  icon: ReactNode;
  title: string;
  description?: string;
  titleWeight: string;
}

export function BenefitCard({ icon, title, description, titleWeight }: BenefitCardProps) {
  return (
    <div className="bg-[#FAFAF5] flex flex-col gap-0 px-10 md:px-12 py-12">
      <div className="mb-[46px]">{icon}</div>
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
