export interface ServiceCategory {
  id: string;
  eyebrow: string;
  title: string;
  /** When set, used as the split-hero main heading on /services/:id only */
  detailPageHeroTitle?: string;
  treatments: string[];
  benefits: { title: string; description: string }[];
  ctaLabel: string;
  imageSrc: string;
  imageAlt: string;
  /** If set, used only on the /services category blocks (listing); detail page uses imageSrc */
  listingImageSrc?: string;
  listingImageAlt?: string;
  imageClassName?: string;
  /** When true, image appears on the left on md+ */
  imageOnLeft: boolean;
}
