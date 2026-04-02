import { Award } from "lucide-react";
import { BadgeCheckIcon, SparkleIcon } from "@/components/home/icons";

const ExpertIcon = () => (
  <Award className="h-7 w-7 text-[#675C53]/50" strokeWidth={1.25} aria-hidden />
);

export const aboutApproachItems = [
  {
    icon: <SparkleIcon />,
    title: "Natural Results",
    description: "Subtle enhancements that never look overdone.",
    titleWeight: "font-extralight" as const,
  },
  {
    icon: <BadgeCheckIcon />,
    title: "Personalized Treatments",
    description: "Every service tailored to your features and goals.",
    titleWeight: "font-light" as const,
  },
  {
    icon: <ExpertIcon />,
    title: "Expert Care",
    description: "Certified professionals using advanced techniques.",
    titleWeight: "font-extralight" as const,
  },
];
