import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  NANO_BROWS_QUALIFIED_INITIAL_CONSULTATION_BOOKING_URL_PARAMS,
  NANO_BROWS_QUALIFIED_SPECIALIST_CALL_BOOKING_URL_PARAMS,
  tryOpenBoulevardBooking,
} from "@/lib/boulevardBooking";
import { trackMetaPixelCustom } from "@/lib/metaPixel";
import { submitWebsiteFormLead } from "@/lib/websiteFormLead";
import { cn } from "@/lib/utils";
import { Loader2, Mail, Phone, User } from "lucide-react";
import { type FormEvent, useCallback, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const cardBorder = "border border-[rgba(103,92,83,0.12)]";

const SOURCE = "beauty_rooms_clinic_website";

type WizardView = "contact" | "checklist" | "reject" | "qualified" | "qualifiedClinicianCall";

type Props = {
  idPrefix?: string;
  anchorId?: string;
  onBookAppointment: () => void;
};

export function NanoBrowsHeroWizard({ idPrefix = "nano", anchorId, onBookAppointment }: Props) {
  const [view, setView] = useState<WizardView>("contact");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
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

    trackMetaPixelCustom("NanoBrowsContactComplete");
    setView("checklist");
  };

  /** Eligibility routing is client-only: medical/clinician path does not require the primary list tick. */
  const handleChecklistNext = () => {
    if (prefersClinicianCall) {
      setView("qualifiedClinicianCall");
      return;
    }
    if (!primaryConfirm) {
      toast.error("Please confirm the eligibility statements above to continue.");
      return;
    }
    setView("qualified");
  };

  return (
    <div id={anchorId} className={cn(cardBorder, "scroll-mt-28 bg-[#FAFAF5] p-6 shadow-sm md:p-8")}>
      {view === "contact" && (
        <>
          <h2 className="font-barlow text-lg font-extralight tracking-[-0.02em] text-charcoal md:text-xl">
            Start Your Eligibility Checklist Now!
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
                  placeholder="Last name (optional)"
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
              onClick={onBookAppointment}
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
            onClick={handleChecklistNext}
            className="mt-8 w-full rounded-none px-6 py-6 font-barlow text-[11px] font-light uppercase tracking-[0.1em]"
          >
            I Confirm & Continue to Booking
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

      {view === "qualified" && (
        <div className="space-y-5 font-barlow font-light leading-relaxed text-[rgba(45,41,38,0.78)]">
          <h2 className="text-xl font-extralight tracking-[-0.02em] text-charcoal md:text-2xl">
            Let&apos;s Get Your Dream Brows.
          </h2>
          <p className="text-sm md:text-base">
            Great news! Based on your screening, you are a perfect candidate for Nano Brows. Please review our Detailed
            Eligibility &amp; Prep Checklist before your visit—we&apos;ll also cover everything during your consultation.
          </p>
          <div>
            <p className="text-base font-light text-charcoal md:text-lg">
              Claim the Exclusive Launch Offer:{" "}
              <span className="tracking-[-0.02em]">$399</span>{" "}
              <span className="text-[rgba(45,41,38,0.45)] line-through">$500</span>
            </p>
            <p className="mt-3 text-sm md:text-base">
              We want to make your transformation as seamless as possible. Secure this limited-time pricing by following
              our simple two-step booking process:
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm md:text-base">
              <li>
                <span className="font-normal text-charcoal">Step 1:</span> Book your Initial Consultation for just{" "}
                <span className="tracking-[-0.02em]">$50</span>{" "}
                <span className="text-[rgba(45,41,38,0.45)] line-through">$100</span> to lock in this special offer.
              </li>
              <li>
                <span className="font-normal text-charcoal">Step 2:</span> Meet our specialist, get the special
                consultation, then book your service. You&apos;ll pay the remaining $349 at the time of your procedure.
              </li>
            </ul>
          </div>
          <p className="pt-1 text-sm font-light uppercase tracking-[0.08em] text-warm-brown/90">Ready to Begin?</p>
          <div className="grid grid-cols-2 gap-3 pt-1">
            <Button
              type="button"
              size="lg"
              onClick={() =>
                tryOpenBoulevardBooking({ ...NANO_BROWS_QUALIFIED_INITIAL_CONSULTATION_BOOKING_URL_PARAMS })
              }
              className="h-auto min-h-11 min-w-0 whitespace-normal rounded-none px-3 py-5 text-center font-barlow text-[10px] font-light uppercase leading-snug tracking-[0.08em] sm:px-4 sm:text-[11px] sm:tracking-[0.1em]"
            >
              Book your Nano Brows Session Now
            </Button>
            <Button
              type="button"
              variant="outline"
              size="lg"
              onClick={() => tryOpenBoulevardBooking({ ...NANO_BROWS_QUALIFIED_SPECIALIST_CALL_BOOKING_URL_PARAMS })}
              className="h-auto min-h-11 min-w-0 whitespace-normal rounded-none border-charcoal/25 bg-transparent px-3 py-5 text-center font-barlow text-[10px] font-light uppercase leading-snug tracking-[0.08em] text-charcoal hover:border-charcoal hover:bg-[#433243] hover:text-[#FAFAF5] sm:px-4 sm:text-[11px] sm:tracking-[0.1em]"
            >
              Book a 15 minutes call with our specialist
            </Button>
          </div>
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
