import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

export type LashCarouselImage = {
  src: string;
  alt: string;
};

export const DEFAULT_LASH_GALLERY_IMAGES: LashCarouselImage[] = [
  { src: "/images/lashes.webp", alt: "Custom eyelash extension results" },
  { src: "/images/home-lashes.jpg", alt: "Full lash set, natural finish" },
  { src: "/images/curated.webp", alt: "Lash styling tailored to eye shape" },
  { src: "/images/rightside.jpeg", alt: "Client after lash appointment" },
  { src: "/images/HowWe.jpeg", alt: "Beauty Rooms Clinic lash service" },
];

export type LashImageCarouselProps = {
  images: LashCarouselImage[];
  ariaLabel: string;
  className?: string;
};

export function LashImageCarousel({ images, ariaLabel, className }: LashImageCarouselProps) {
  return (
    <Carousel
      opts={{ align: "start", loop: true }}
      className={cn("w-full", className)}
      aria-label={ariaLabel}
    >
      <CarouselContent className="-ml-3 md:-ml-4">
        {images.map((img) => (
          <CarouselItem
            key={img.src}
            className="basis-[85%] pl-3 sm:basis-1/2 sm:pl-4 lg:basis-1/3"
          >
            <div className="overflow-hidden rounded-sm border border-[rgba(103,92,83,0.12)] bg-[#F4F4EF]">
              <img
                src={img.src}
                alt={img.alt}
                className="aspect-[4/5] w-full object-cover object-center"
                loading="lazy"
                decoding="async"
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
