export interface ServiceCategory {
  id: string;
  eyebrow: string;
  title: string;
  treatments: string[];
  benefits: { title: string; description: string }[];
  ctaLabel: string;
  imageSrc: string;
  imageAlt: string;
  imageClassName?: string;
  /** When true, image appears on the left on md+ */
  imageOnLeft: boolean;
}
