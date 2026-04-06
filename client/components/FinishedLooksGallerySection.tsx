import { LashImageCarousel, type LashCarouselImage } from "@/components/LashImageCarousel";
import { NANO_PAGE_GALLERY_IMAGES } from "@/data/nanoBrowsOfferGallery";

const DEFAULT_HEADLINE = "Your Face Is Unique. Your Brows Should Be Too.";
const DEFAULT_SUBHEADLINE = "Finished looks";
const DEFAULT_DISCLAIMER =
  "Results may vary based on skin type, healing, and natural features.";
const DEFAULT_CAROUSEL_ARIA = "Beauty Rooms Clinic finished looks and services";

export type FinishedLooksGallerySectionProps = {
  sectionHeadingId: string;
  headline?: string;
  subheadline?: string;
  disclaimer?: string;
  images?: LashCarouselImage[];
  carouselAriaLabel?: string;
};

export function FinishedLooksGallerySection({
  sectionHeadingId,
  headline = DEFAULT_HEADLINE,
  subheadline = DEFAULT_SUBHEADLINE,
  disclaimer = DEFAULT_DISCLAIMER,
  images = NANO_PAGE_GALLERY_IMAGES,
  carouselAriaLabel = DEFAULT_CAROUSEL_ARIA,
}: FinishedLooksGallerySectionProps) {
  return (
    <section
      className="w-full bg-[#F9F8F6] py-14 md:py-20 lg:py-24"
      aria-labelledby={sectionHeadingId}
    >
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <h2
          id={sectionHeadingId}
          className="mb-6 text-center font-barlow text-[clamp(28px,4vw,40px)] font-extralight tracking-[-0.03em] text-charcoal md:mb-8"
        >
          {headline}
        </h2>
        <h3 className="mb-3 text-center font-barlow text-[clamp(22px,3vw,30px)] font-extralight tracking-[-0.03em] text-charcoal">
          {subheadline}
        </h3>
        <p className="mb-10 text-center font-barlow text-sm font-light text-[rgba(45,41,38,0.65)] md:mb-12 md:text-base">
          {disclaimer}
        </p>
      </div>
      <div className="w-full overflow-hidden">
        <LashImageCarousel images={images} ariaLabel={carouselAriaLabel} />
      </div>
    </section>
  );
}
