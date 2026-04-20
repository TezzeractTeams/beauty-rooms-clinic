import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { CookieConsentChoice } from "@/lib/cookieConsent";

type Props = {
  onChoose: (choice: CookieConsentChoice) => void;
  className?: string;
};

export function CookieConsentBanner({ onChoose, className }: Props) {
  return (
    <div
      role="region"
      aria-label="Cookie preferences"
      aria-live="polite"
      className={cn(
        "fixed bottom-4 right-4 left-4 z-[90] max-w-md rounded-lg border border-border bg-background/95 p-4 shadow-lg backdrop-blur-sm sm:left-auto",
        className,
      )}
    >
      <p className="text-sm leading-relaxed text-foreground">
        We use cookies to remember your choices and to improve the site. Essential cookies are required; you can
        accept optional cookies for analytics and similar features. See our{" "}
        <Link
          to="/privacy"
          className="font-medium text-primary underline underline-offset-2 hover:text-primary/90"
        >
          Privacy Policy
        </Link>
        .
      </p>
      <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:justify-end">
        <Button type="button" variant="outline" size="sm" className="w-full font-light sm:w-auto" onClick={() => onChoose("essential")}>
          Essential only
        </Button>
        <Button type="button" size="sm" className="w-full font-light sm:w-auto" onClick={() => onChoose("all")}>
          Accept all
        </Button>
      </div>
    </div>
  );
}
