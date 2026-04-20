import { BookingFlowPanel } from "@/components/booking/BookingFlowPanel";
import { useBooking } from "@/components/booking/hooks/useBooking";
import type { ClientInformation } from "@/components/booking/utils/boulevardApi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Loader2, Mail, Phone, User } from "lucide-react";
import { type FormEvent, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const cardBorder = "border border-[rgba(103,92,83,0.12)]";

type View = "contact" | "booking";

type Props = {
  idPrefix?: string;
  anchorId?: string;
  serviceId: string;
  serviceName: string;
};

export function HeadSpaBookingFlow({ idPrefix = "headspa", anchorId, serviceId, serviceName }: Props) {
  const [view, setView] = useState<View>("contact");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const bookingClientInfo = useMemo(
    (): ClientInformation => ({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim(),
      phoneNumber: phone.trim(),
    }),
    [firstName, lastName, email, phone],
  );

  const { initialize, reset, ...bookingPanel } = useBooking(serviceId, serviceName, bookingClientInfo);
  void reset;

  const handleContactSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!firstName.trim() || !lastName.trim()) {
      toast.error("Please enter your first and last name.");
      return;
    }
    if (!phone.trim() || !email.trim()) {
      toast.error("Please fill in all fields.");
      return;
    }
    if (!consent) {
      toast.error("Please agree to the Privacy Policy and communications consent to continue.");
      return;
    }

    setSubmitting(true);
    const result = await initialize();
    setSubmitting(false);

    if (!result.ok) {
      toast.error(result.error ?? "Could not start booking. Please try again.");
      return;
    }
    setView("booking");
  };

  return (
    <div id={anchorId} className={cn(cardBorder, "scroll-mt-28 bg-[#FAFAF5] p-6 shadow-sm md:p-8")}>
      {view === "contact" && (
        <>
          <h2 className="font-barlow text-lg font-extralight tracking-[-0.02em] text-charcoal md:text-xl">
            Start Booking Your Head Spa Detox Experience
          </h2>
          <p className="mt-2 font-barlow text-sm font-light leading-relaxed text-[rgba(45,41,38,0.65)]">
            Add your details to view live date and time availability.
          </p>

          <form className="professional-intake-form mt-6 space-y-4" onSubmit={handleContactSubmit} noValidate>
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
                  value={firstName}
                  onChange={(ev) => setFirstName(ev.target.value)}
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
                  value={lastName}
                  onChange={(ev) => setLastName(ev.target.value)}
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
                  value={phone}
                  onChange={(ev) => setPhone(ev.target.value)}
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
                  value={email}
                  onChange={(ev) => setEmail(ev.target.value)}
                  className="h-11 rounded-none border-[rgba(103,92,83,0.2)] bg-[#fafaf5] pl-10 font-barlow text-sm focus-visible:ring-2 focus-visible:ring-warm-brown/30 focus-visible:ring-offset-0"
                  required
                />
              </div>
            </div>
            <label className="flex cursor-pointer gap-3 text-left font-barlow text-xs font-light leading-relaxed text-[rgba(45,41,38,0.72)]">
              <input
                type="checkbox"
                checked={consent}
                onChange={(ev) => setConsent(ev.target.checked)}
                className="mt-0.5 h-4 w-4 shrink-0 rounded-sm border-[rgba(103,92,83,0.35)] accent-[hsl(var(--warm-brown))]"
              />
              <span>
                By clicking, I agree to the{" "}
                <Link
                  to="/privacy"
                  className="text-warm-brown underline decoration-warm-brown/30 underline-offset-2"
                >
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
                  Loading availability...
                </span>
              ) : (
                "Book your slot now"
              )}
            </Button>
          </form>
        </>
      )}

      {view === "booking" && (
        <div className="w-full min-w-0 -mx-1 sm:mx-0">
          <BookingFlowPanel
            {...bookingPanel}
            serviceName={serviceName}
            className="border-0 bg-transparent shadow-none"
          />
        </div>
      )}
    </div>
  );
}
