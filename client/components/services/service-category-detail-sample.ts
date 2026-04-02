export interface FeaturedServiceCardData {
  name: string;
  description: string;
  /** e.g. "90 MINUTES"; omitted when no duration in source data */
  duration?: string;
  imageSrc: string;
  imageAlt: string;
}
