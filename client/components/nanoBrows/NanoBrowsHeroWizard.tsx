import { BookingFlowPanel } from "@/components/booking/BookingFlowPanel";
import { useBooking } from "@/components/booking/hooks/useBooking";
import type { ClientInformation } from "@/components/booking/utils/boulevardApi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  NANO_BROWS_HERO_BOOKING_URL_PARAMS,
  NANO_BROWS_QUALIFIED_SPECIALIST_CALL_BOOKING_URL_PARAMS,
  tryOpenBoulevardBooking,
} from "@/lib/boulevardBooking";
import { trackMetaPixelCustom } from "@/lib/metaPixel";
import { submitWebsiteFormLead } from "@/lib/websiteFormLead";
import { cn } from "@/lib/utils";
import { Loader2, Mail, Phone, User } from "lucide-react";
import { type FormEvent, useCallback, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const cardBorder = "border border-[rgba(103,92,83,0.12)]";

type WizardView = "contact" | "checklist" | "reject" | "qualified" | "qualifiedClinicianCall" | "booking";

const SOURCE = "beauty_rooms_clinic_website";

type Props = {
  idPrefix?: string;
  anchorId?: string;
  serviceId: string;
  serviceName: string;
};

export function NanoBrowsHeroWizard({ idPrefix = "nano", anchorId, serviceId, serviceName }: Props) {
  const [view, setView] = useState<WizardView>("contact");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

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
  const [consent, setConsent] = useState(false);

  /** Primary “I confirm that” + bullet list (required). Secondary = medical / prefer clinician call (client-only routing). */
  const [primaryConfirm, setPrimaryConfirm] = useState(false);
  const [prefersClinicianCall, setPrefersClinicianCall] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const baseLead = useCallback(
    () => ({
      source: SOURCE,
      form: "nano_brows_wizard" as const,
      pageUri: typeof window !== "undefined" ? window.location.href : "",
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      phone: phone.trim(),
      email: email.trim(),
      consent,
    }),
    [firstName, lastName, phone, email, consent],
  );

  const handleContactSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!firstName.trim()) {
      toast.error("Please enter your first name.");
      return;
    }
    if (!phone.trim()) {
      toast.error("Please enter your phone number.");
      return;
    }
    if (!email.trim()) {
      toast.error("Please enter your email address.");
      return;
    }
    if (!consent) {
      toast.error("Please agree to the Privacy Policy and communications consent to continue.");
      return;
    }

    setSubmitting(true);
    const result = await submitWebsiteFormLead({
      ...baseLead(),
      step: "contact",
    });
    setSubmitting(false);

    if (result.ok === false) {
      toast.error(result.message);
      return;
    }

    setView("checklist");
  };

  /**
   * Eligible path: create cart + load dates on this click, then show inline booking (no intermediate screen).
   * Clinician path: unchanged — no cart API here (handled later).
   */
  const handleChecklistNext = async () => {
    if (prefersClinicianCall) {
      setView("qualifiedClinicianCall");
      return;
    }
    if (!primaryConfirm) {
      toast.error("Please confirm the eligibility statements above to continue.");
      return;
    }
    const result = await initialize();
    if (result.ok) {
      setView("booking");
    } else {
      toast.error(result.error ?? "Could not start booking. Please try again.");
    }
  };

  return (
    <div id={anchorId} className={cn(cardBorder, "scroll-mt-28 bg-[#FAFAF5] p-6 shadow-sm md:p-8")}>
      {view === "contact" && (
        <>
          <h2 className="font-barlow text-lg font-extralight tracking-[-0.02em] text-charcoal md:text-xl">
          Book your Free Brow Design Consultation
          </h2>
          <p className="mt-2 font-barlow text-sm font-light leading-relaxed text-[rgba(45,41,38,0.65)]">
            Please provide your details to begin the checklist:
          </p>

          <form className="professional-intake-form mt-6 space-y-4" onSubmit={handleContactSubmit}>
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
                  placeholder="First name *"
                  value={firstName}
                  onChange={(ev) => setFirstName(ev.target.value)}
                  className="h-11 rounded-none border-[rgba(103,92,83,0.2)] bg-[#fafaf5] pl-10 font-barlow text-sm focus-visible:ring-2 focus-visible:ring-warm-brown/30 focus-visible:ring-offset-0"
                  required
                  aria-required
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
                  placeholder="Phone number *"
                  value={phone}
                  onChange={(ev) => setPhone(ev.target.value)}
                  className="h-11 rounded-none border-[rgba(103,92,83,0.2)] bg-[#fafaf5] pl-10 font-barlow text-sm focus-visible:ring-2 focus-visible:ring-warm-brown/30 focus-visible:ring-offset-0"
                  required
                  aria-required
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
                  placeholder="Email *"
                  value={email}
                  onChange={(ev) => setEmail(ev.target.value)}
                  className="h-11 rounded-none border-[rgba(103,92,83,0.2)] bg-[#fafaf5] pl-10 font-barlow text-sm focus-visible:ring-2 focus-visible:ring-warm-brown/30 focus-visible:ring-offset-0"
                  required
                  aria-required
                />
              </div>
            </div>
            <label className="flex cursor-pointer gap-3 text-left font-barlow text-xs font-light leading-relaxed text-[rgba(45,41,38,0.72)]">
              <input
                type="checkbox"
                checked={consent}
                onChange={(ev) => setConsent(ev.target.checked)}
                required
                aria-required
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
                (privacy contact:{" "}
                <a
                  href="mailto:admin@beautyroomsclinic.com"
                  className="text-warm-brown underline decoration-warm-brown/30 underline-offset-2"
                >
                  admin@beautyroomsclinic.com
                </a>
                ) and consent to receive SMS/Email communications.
              </span>
            </label>
            <Button
              type="submit"
              size="lg"
              disabled={submitting}
              className="w-full rounded-none px-6 py-6 font-barlow text-[11px] font-light uppercase tracking-[0.1em]"
            >
              {submitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden />
                  Sending…
                </>
              ) : (
                "Next"
              )}
            </Button>
          </form>
          <p className="mt-5 font-barlow text-sm font-light text-[rgba(45,41,38,0.55)]">
            Ready to skip the wait?{" "}
            <button
              type="button"
              onClick={() => tryOpenBoulevardBooking({ ...NANO_BROWS_HERO_BOOKING_URL_PARAMS })}
              className="text-warm-brown underline decoration-warm-brown/30 underline-offset-2 transition-colors hover:text-warm-brown/90"
            >
              Book your appointment now
            </button>
            .
          </p>
        </>
      )}

      {view === "checklist" && (
        <>
          <label className="flex cursor-pointer gap-3 text-left font-barlow text-sm font-light leading-relaxed text-[rgba(45,41,38,0.85)]">
            <input
              type="checkbox"
              checked={primaryConfirm}
              onChange={(ev) => setPrimaryConfirm(ev.target.checked)}
              className="mt-1 h-4 w-4 shrink-0 rounded-sm border-[rgba(103,92,83,0.35)] accent-[hsl(var(--warm-brown))]"
            />
            <span className="min-w-0">
              <span className="font-normal text-charcoal">I confirm that:</span>
              <ul className="mt-2 list-disc space-y-2 pl-5">
                <li>I am not pregnant or nursing.</li>
                <li>I have no active skin conditions in the treatment area.</li>
                <li>I have not used Accutane in the past 12 months.</li>
                <li>I am not undergoing chemotherapy or radiation.</li>
                <li>I have not had Botox or fillers within the past 2 weeks.</li>
                <li>I have not had chemical peels, laser treatments, or antibiotics within the past 4 weeks.</li>
                <li>My skin is fully healed with no sunburn.</li>
                <li>
                  I will follow pre-appointment guidelines (avoid alcohol, caffeine, blood thinners, and certain
                  skincare products as advised).
                </li>
                <li>I understand that certain medical conditions may require doctor approval.</li>
                <li>I understand my suitability will be confirmed before treatment.</li>
                <li>I understand my deposit may be forfeited if I do not meet these requirements.</li>
              </ul>
            </span>
          </label>

          <label className="mt-6 flex cursor-pointer gap-3 text-left font-barlow text-sm font-light leading-relaxed text-[rgba(45,41,38,0.85)]">
            <input
              type="checkbox"
              checked={prefersClinicianCall}
              onChange={(ev) => setPrefersClinicianCall(ev.target.checked)}
              className="mt-0.5 h-4 w-4 shrink-0 rounded-sm border-[rgba(103,92,83,0.35)] accent-[hsl(var(--warm-brown))]"
            />
            <span>
              I have a medical condition (such as diabetes, autoimmune disorder, heart condition, or history of keloid
              scarring), or would feel more comfortable speaking with a Beauty Rooms Clinic clinician.
            </span>
          </label>

          <Button
            type="button"
            size="lg"
            disabled={bookingPanel.state.loading}
            onClick={() => void handleChecklistNext()}
            className="mt-8 w-full rounded-none px-6 py-6 font-barlow text-[11px] font-light uppercase tracking-[0.1em] disabled:opacity-60"
          >
            {bookingPanel.state.loading ? (
              <span className="inline-flex items-center justify-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" strokeWidth={1.5} aria-hidden />
                Starting booking…
              </span>
            ) : (
              "I Confirm & Continue to Booking"
            )}
          </Button>
        </>
      )}

      {view === "reject" && (
        <div className="space-y-4 font-barlow font-light leading-relaxed text-[rgba(45,41,38,0.78)]">
          <h2 className="text-lg font-extralight tracking-[-0.02em] text-charcoal md:text-xl">
            Based on your responses, we cannot safely perform the Nano Brow procedure at this time.
          </h2>
          <p className="text-sm md:text-base">
            Your safety and skin health are our absolute priority. To ensure the best results and proper healing, we
            require clients to be outside of specific medical windows or treatment recovery periods before proceeding.
          </p>
          <p className="text-sm md:text-base">
            Want to explore our entire service menu?{" "}
            <Link
              to="/services"
              className="text-warm-brown underline decoration-warm-brown/30 underline-offset-2 transition-colors hover:text-warm-brown/90"
            >
              Click here to see what else we offer!
            </Link>
          </p>
        </div>
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

      {view === "qualifiedClinicianCall" && (
        <div className="space-y-5 font-barlow font-light leading-relaxed text-[rgba(45,41,38,0.78)]">
          <h2 className="text-xl font-extralight tracking-[-0.02em] text-charcoal md:text-2xl">
            Almost Ready! We Just Need a Quick Note.
          </h2>
          <p className="text-sm md:text-base">
            The next step is a complimentary 15-minute call with our clinic specialist.
          </p>
          <ul className="list-disc space-y-2 pl-5 text-sm md:text-base">
            <li>Understand the requirements for medical clearance (if needed).</li>
            <li>Get professional answers to any questions you have before starting.</li>
          </ul>
          <Button
            type="button"
            size="lg"
            onClick={() => tryOpenBoulevardBooking({ ...NANO_BROWS_QUALIFIED_SPECIALIST_CALL_BOOKING_URL_PARAMS })}
            className="mt-2 w-full rounded-none px-6 py-6 font-barlow text-[11px] font-light uppercase tracking-[0.1em]"
          >
            Book a 15 minutes call with our specialist
          </Button>
        </div>
      )}
    </div>
  );
}
