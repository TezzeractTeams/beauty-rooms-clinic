export interface FeaturedServiceCardData {
  name: string;
  /** Omit or leave empty for API-driven cards with no long-form blurb. */
  description?: string;
  /** e.g. "90 MINUTES"; omitted when no duration in source data */
  duration?: string;
  imageSrc: string;
  imageAlt: string;
  /** From booking catalog list price (USD); triggers price row when set. */
  priceDiscountedUsd?: number;
  priceActualUsd?: number;
}
