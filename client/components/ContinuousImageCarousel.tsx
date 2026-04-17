type CarouselImage = {
  src: string;
  alt: string;
};

type ContinuousImageCarouselProps = {
  images: readonly CarouselImage[];
  ariaLabel: string;
  itemWidthClassName?: string;
  imageAspectClassName?: string;
  durationSeconds?: number;
  className?: string;
};

export function ContinuousImageCarousel({
  images,
  ariaLabel,
  itemWidthClassName = "w-[clamp(240px,32vw,420px)]",
  imageAspectClassName = "aspect-[4/5]",
  durationSeconds = 40,
  className,
}: ContinuousImageCarouselProps) {
  const loopImages = [...images, ...images];

  return (
    <div className={`relative w-full overflow-hidden ${className ?? ""}`.trim()} aria-label={ariaLabel}>
      <div
        className="continuous-carousel-track flex w-max"
        style={{ animationDuration: `${durationSeconds}s` }}
        aria-live="off"
      >
        {loopImages.map((img, index) => (
          <div key={`${img.src}-${index}`} className={`${itemWidthClassName} shrink-0`}>
            <div className="overflow-hidden bg-[#F4F4EF]">
              <img
                src={img.src}
                alt={img.alt}
                className={`${imageAspectClassName} w-full object-cover object-center`}
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
