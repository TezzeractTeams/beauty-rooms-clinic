import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Loader2, Mail, Phone, User } from "lucide-react";
import { type FormEvent } from "react";
import { Link } from "react-router-dom";

export interface BookingIntakeValues {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  consent: boolean;
  providerSlug: string;
}

export interface BookingIntakeProviderOption {
  slug: string;
  name: string;
}

type Props = {
  idPrefix?: string;
  title: string;
  subtitle: string;
  values: BookingIntakeValues;
  providers?: BookingIntakeProviderOption[];
  providerLabel?: string;
  submitLabel?: string;
  submittingLabel?: string;
  submitting?: boolean;
  onChange: (next: BookingIntakeValues) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  className?: string;
};

const cardBorder = "border border-[rgba(103,92,83,0.12)]";

export function BookingIntakePanel({
  idPrefix = "booking",
  title,
  subtitle,
  values,
  providers,
  providerLabel = "Provider",
  submitLabel = "View Available Appointments",
  submittingLabel = "Loading availability...",
  submitting = false,
  onChange,
  onSubmit,
  className,
}: Props) {
  const withField = (key: keyof BookingIntakeValues, value: string | boolean) => {
    onChange({ ...values, [key]: value });
  };

  return (
    <div className={cn(cardBorder, "scroll-mt-28 bg-[#FAFAF5] p-6 shadow-sm md:p-8", className)}>
      <h2 className="font-barlow text-lg font-extralight tracking-[-0.02em] text-charcoal md:text-xl">{title}</h2>
      <p className="mt-2 font-barlow text-sm font-light leading-relaxed text-[rgba(45,41,38,0.65)]">{subtitle}</p>

      <form className="professional-intake-form mt-6 space-y-4" onSubmit={onSubmit} noValidate>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="relative">
            <User
              className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-warm-brown/70"
              strokeWidth={1.25}
              aria-hidden
            />
            <Input
              id={`${idPrefix}-firstname`}
              name="firstname"
              autoComplete="given-name"
              placeholder="First name"
              value={values.firstName}
              onChange={(ev) => withField("firstName", ev.target.value)}
              className="h-11 rounded-none border-[rgba(103,92,83,0.2)] bg-[#fafaf5] pl-10 font-barlow text-sm focus-visible:ring-2 focus-visible:ring-warm-brown/30 focus-visible:ring-offset-0"
              required
            />
          </div>
          <div className="relative">
            <User
              className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-warm-brown/70"
              strokeWidth={1.25}
              aria-hidden
            />
            <Input
              id={`${idPrefix}-lastname`}
              name="lastname"
              autoComplete="family-name"
              placeholder="Last name"
              value={values.lastName}
              onChange={(ev) => withField("lastName", ev.target.value)}
              className="h-11 rounded-none border-[rgba(103,92,83,0.2)] bg-[#fafaf5] pl-10 font-barlow text-sm focus-visible:ring-2 focus-visible:ring-warm-brown/30 focus-visible:ring-offset-0"
              required
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="relative min-w-0">
            <Phone
              className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-warm-brown/70"
              strokeWidth={1.25}
              aria-hidden
            />
            <Input
              id={`${idPrefix}-phone`}
              name="phone"
              type="tel"
              autoComplete="tel"
              placeholder="Phone number"
              value={values.phone}
              onChange={(ev) => withField("phone", ev.target.value)}
              className="h-11 rounded-none border-[rgba(103,92,83,0.2)] bg-[#fafaf5] pl-10 font-barlow text-sm focus-visible:ring-2 focus-visible:ring-warm-brown/30 focus-visible:ring-offset-0"
              required
            />
          </div>
          <div className="relative min-w-0">
            <Mail
              className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-warm-brown/70"
              strokeWidth={1.25}
              aria-hidden
            />
            <Input
              id={`${idPrefix}-email`}
              name="email"
              type="email"
              autoComplete="email"
              placeholder="Email"
              value={values.email}
              onChange={(ev) => withField("email", ev.target.value)}
              className="h-11 rounded-none border-[rgba(103,92,83,0.2)] bg-[#fafaf5] pl-10 font-barlow text-sm focus-visible:ring-2 focus-visible:ring-warm-brown/30 focus-visible:ring-offset-0"
              required
            />
          </div>
        </div>
        {providers && providers.length > 0 && (
          <div className="space-y-3">
            <label
              className="block font-barlow text-[10px] font-light uppercase tracking-[0.12em] text-[rgba(45,41,38,0.65)]"
            >
              {providerLabel}
            </label>
            <div className="grid gap-2 sm:grid-cols-3">
              {providers.map((provider) => (
                <label
                  key={provider.slug}
                  className={cn(
                    "relative cursor-pointer border px-3 py-3 text-center transition-colors",
                    "font-barlow text-xs font-light uppercase tracking-[0.08em]",
                    values.providerSlug === provider.slug
                      ? "border-charcoal bg-charcoal text-[#FAFAF5]"
                      : "border-[rgba(103,92,83,0.22)] bg-[#fafaf5] text-charcoal hover:bg-[#F1EFE8]",
                  )}
                >
                  <input
                    type="radio"
                    name={`${idPrefix}-provider`}
                    value={provider.slug}
                    checked={values.providerSlug === provider.slug}
                    onChange={() => withField("providerSlug", provider.slug)}
                    className="sr-only"
                  />
                  {provider.name}
                </label>
              ))}
            </div>
          </div>
        )}
        <label className="flex cursor-pointer gap-3 text-left font-barlow text-xs font-light leading-relaxed text-[rgba(45,41,38,0.72)]">
          <input
            type="checkbox"
            checked={values.consent}
            onChange={(ev) => withField("consent", ev.target.checked)}
            className="mt-0.5 h-4 w-4 shrink-0 rounded-sm border-[rgba(103,92,83,0.35)] accent-[hsl(var(--warm-brown))]"
          />
          <span>
            By clicking, I agree to the{" "}
            <Link to="/privacy" className="text-warm-brown underline decoration-warm-brown/30 underline-offset-2">
              Privacy Policy
            </Link>{" "}
            and consent to receive SMS/Email communications.
          </span>
        </label>
        <Button
          type="submit"
          size="lg"
          disabled={submitting}
          className="w-full rounded-none px-6 py-6 font-barlow text-[11px] font-light uppercase tracking-[0.1em] disabled:opacity-60"
        >
          {submitting ? (
            <span className="inline-flex items-center justify-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" strokeWidth={1.5} aria-hidden />
              {submittingLabel}
            </span>
          ) : (
            submitLabel
          )}
        </Button>
      </form>
    </div>
  );
}
