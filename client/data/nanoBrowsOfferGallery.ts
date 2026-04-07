import {
  DEFAULT_LASH_GALLERY_IMAGES,
  type LashCarouselImage,
} from "@/components/LashImageCarousel";

export const NANO_BROW_OFFER_GALLERY: LashCarouselImage[] = [
  {
    src: "/images/nanobrowoffer/287670de-78a9-4edc-a134-b2474b016186.jpg",
    alt: "Nano brows — natural healed look at Beauty Rooms Clinic",
  },
  {
    src: "/images/nano-beforeafter.jpg",
    alt: "Nano brows — before and after comparison",
    imageClassName: "object-contain bg-[#ebe9e4]",
  },
  { src: "/images/nanobrowoffer/IMG_1862.JPG", alt: "Nano brow procedure and mapping detail" },
  { src: "/images/nanobrowoffer/IMG_1905.JPG", alt: "Soft nano brow strokes, close-up" },
  { src: "/images/nanobrowoffer/IMG_1933.JPG", alt: "Nano brows — before and after style result" },
  { src: "/images/nanobrowoffer/IMG_1954.JPG", alt: "Healed nano brows, natural finish" },
  { src: "/images/nanobrowoffer/IMG_1965.JPG", alt: "Brow line and nano brow artistry" },
];

export const NANO_PAGE_GALLERY_IMAGES: LashCarouselImage[] = [
  ...NANO_BROW_OFFER_GALLERY,
  ...DEFAULT_LASH_GALLERY_IMAGES,
];
