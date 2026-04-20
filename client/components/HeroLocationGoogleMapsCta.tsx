import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const GOOGLE_MAPS_SHARE_URL = "https://maps.app.goo.gl/HadUxFmD3vnVth7w6";

type Props = {
  className?: string;
};

export function HeroLocationGoogleMapsCta({ className }: Props) {
  return (
    <div
      className={cn(
        "absolute bottom-4 right-4 z-[2]  max-w-[min(100%,280px)] sm:max-w-sm md:bottom-6 md:right-6",
        "border-none bg-transparent p-4 md:p-5",
        className,
      )}
    >
      <p className="font-barlow text-sm font-light text-right leading-snug tracking-[-0.02em] text-white md:text-[15px]">
        Visit Beauty Rooms Clinic in <br />Downtown Sarasota, FL!
      </p>
      <Button
        asChild
        className="mt-3 w-full rounded-none px-4 py-4 font-barlow text-[10px] font-light uppercase tracking-[0.1em] md:mt-4 md:py-5 md:text-xs"
      >
        <a href={GOOGLE_MAPS_SHARE_URL} target="_blank" rel="noopener noreferrer">
          Locate Us on Google Maps
        </a>
      </Button>
    </div>
  );
}
