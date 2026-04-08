import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  NANO_BROWS_QUALIFIED_INITIAL_CONSULTATION_BOOKING_URL_PARAMS,
  NANO_BROWS_QUALIFIED_SPECIALIST_CALL_BOOKING_URL_PARAMS,
  tryOpenBoulevardBooking,
} from "@/lib/boulevardBooking";
import { cn } from "@/lib/utils";
import { Mail, Phone, User } from "lucide-react";
import { type FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const cardBorder = "border border-[rgba(103,92,83,0.12)]";

type WizardView = "contact" | "checklist" | "reject" | "qualified";

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

  const [notPregnantOrNursing, setNotPregnantOrNursing] = useState(false);
  const [noActiveSkinConditions, setNoActiveSkinConditions] = useState(false);
  const [understandsMedicalClearance, setUnderstandsMedicalClearance] = useState(false);
  const [reviewedPreTreatmentGuidelines, setReviewedPreTreatmentGuidelines] = useState(false);

  const handleContactSubmit = (e: FormEvent<HTMLFormElement>) => {
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

    setView("checklist");
  };

  /** Eligibility routing is client-only: no API / webhook for qualified vs reject. */
  const handleChecklistNext = () => {
    const allChecked =
      notPregnantOrNursing &&
      noActiveSkinConditions &&
      understandsMedicalClearance &&
      reviewedPreTreatmentGuidelines;

    setView(allChecked ? "qualified" : "reject");
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
              className="w-full rounded-none px-6 py-6 font-barlow text-[11px] font-light uppercase tracking-[0.1em]"
            >
              Next
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
          <h2 className="font-barlow text-lg font-extralight tracking-[-0.02em] text-charcoal md:text-xl">
            Nano Brows Eligibility Checklist
          </h2>
          <p className="mt-2 font-barlow text-sm font-light leading-relaxed text-[rgba(45,41,38,0.65)]">
            Please check each box to confirm you meet the requirements for Nano Brows.
            <br />
            If you cannot check these boxes, we cannot safely perform the procedure at this time:
          </p>
         

          <div className="mt-6 space-y-4 font-barlow text-sm font-light leading-relaxed text-[rgba(45,41,38,0.85)]">
            <label className="flex cursor-pointer gap-3 text-left">
              <input
                type="checkbox"
                checked={notPregnantOrNursing}
                onChange={(ev) => setNotPregnantOrNursing(ev.target.checked)}
                className="mt-0.5 h-4 w-4 shrink-0 rounded-sm border-[rgba(103,92,83,0.35)] accent-[hsl(var(--warm-brown))]"
              />
              <span>I am not pregnant or nursing</span>
            </label>
            <label className="flex cursor-pointer gap-3 text-left">
              <input
                type="checkbox"
                checked={noActiveSkinConditions}
                onChange={(ev) => setNoActiveSkinConditions(ev.target.checked)}
                className="mt-0.5 h-4 w-4 shrink-0 rounded-sm border-[rgba(103,92,83,0.35)] accent-[hsl(var(--warm-brown))]"
              />
              <span>I have no active skin conditions in the treatment area</span>
            </label>
            <label className="flex cursor-pointer gap-3 text-left">
              <input
                type="checkbox"
                checked={understandsMedicalClearance}
                onChange={(ev) => setUnderstandsMedicalClearance(ev.target.checked)}
                className="mt-0.5 h-4 w-4 shrink-0 rounded-sm border-[rgba(103,92,83,0.35)] accent-[hsl(var(--warm-brown))]"
              />
              <span>I understand some conditions may require medical clearance</span>
            </label>
            <label className="flex cursor-pointer gap-3 text-left">
              <input
                type="checkbox"
                checked={reviewedPreTreatmentGuidelines}
                onChange={(ev) => setReviewedPreTreatmentGuidelines(ev.target.checked)}
                className="mt-0.5 h-4 w-4 shrink-0 rounded-sm border-[rgba(103,92,83,0.35)] accent-[hsl(var(--warm-brown))]"
              />
              <span>I have reviewed pre-treatment guidelines</span>
            </label>
          </div>

          <Button
            type="button"
            size="lg"
            onClick={handleChecklistNext}
            className="mt-8 w-full rounded-none px-6 py-6 font-barlow text-[11px] font-light uppercase tracking-[0.1em]"
          >
            Next
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
              Book Your Initial Consultation Now to Claim the Offer
            </Button>
            <Button
              type="button"
              variant="outline"
              size="lg"
              onClick={() => tryOpenBoulevardBooking({ ...NANO_BROWS_QUALIFIED_SPECIALIST_CALL_BOOKING_URL_PARAMS })}
              className="h-auto min-h-11 min-w-0 whitespace-normal rounded-none border-charcoal/25 bg-transparent px-3 py-5 text-center font-barlow text-[10px] font-light uppercase leading-snug tracking-[0.08em] text-charcoal hover:border-charcoal hover:bg-[#433243] hover:text-[#FAFAF5] sm:px-4 sm:text-[11px] sm:tracking-[0.1em]"
            >
              Still have more questions? Book a call with our specialist
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
