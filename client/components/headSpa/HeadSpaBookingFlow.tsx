import { BookingFlowPanel } from "@/components/booking/BookingFlowPanel";
import { BookingIntakePanel, type BookingIntakeValues } from "@/components/booking/BookingIntakePanel";
import { useBooking } from "@/components/booking/hooks/useBooking";
import type { ClientInformation } from "@/components/booking/utils/boulevardApi";
import { submitHeadSpaFormLead } from "@/lib/websiteFormLead";
import { cn } from "@/lib/utils";
import { type FormEvent, useCallback, useMemo, useState } from "react";
import { toast } from "sonner";

const SOURCE = "beauty_rooms_clinic_website";
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
  const [intakeValues, setIntakeValues] = useState<BookingIntakeValues>({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    consent: false,
    providerSlug: "first-available",
  });
  const [submitting, setSubmitting] = useState(false);

  const bookingClientInfo = useMemo(
    (): ClientInformation => ({
      firstName: intakeValues.firstName.trim(),
      lastName: intakeValues.lastName.trim(),
      email: intakeValues.email.trim(),
      phoneNumber: intakeValues.phone.trim(),
    }),
    [intakeValues],
  );

  const { initialize, reset, ...bookingPanel } = useBooking(serviceId, serviceName, bookingClientInfo);
  void reset;

  const baseLead = useCallback(
    () => ({
      source: SOURCE,
      form: "head_spa_detox" as const,
      pageUri: typeof window !== "undefined" ? window.location.href : "",
      firstName: intakeValues.firstName.trim(),
      lastName: intakeValues.lastName.trim(),
      phone: intakeValues.phone.trim(),
      email: intakeValues.email.trim(),
      consent: intakeValues.consent,
      providerSlug: intakeValues.providerSlug,
      serviceName,
    }),
    [intakeValues, serviceName],
  );

  const handleContactSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!intakeValues.firstName.trim() || !intakeValues.lastName.trim()) {
      toast.error("Please enter your first and last name.");
      return;
    }
    if (!intakeValues.phone.trim() || !intakeValues.email.trim()) {
      toast.error("Please fill in all fields.");
      return;
    }
    if (!intakeValues.consent) {
      toast.error("Please agree to the Privacy Policy and communications consent to continue.");
      return;
    }

    setSubmitting(true);
    const leadResult = await submitHeadSpaFormLead({
      ...baseLead(),
      step: "contact",
    });
    if (leadResult.ok === false) {
      setSubmitting(false);
      toast.error(leadResult.message);
      return;
    }

    const result = await initialize();
    setSubmitting(false);

    if (!result.ok) {
      toast.error(result.error ?? "Could not start booking. Please try again.");
      return;
    }
    setView("booking");
  };

  return (
    <div id={anchorId} className={cn(cardBorder, "scroll-mt-28 bg-[#FAFAF5] shadow-sm")}>
      {view === "contact" && (
        <BookingIntakePanel
          idPrefix={idPrefix}
          title="Start Booking Your Head Spa Detox Experience"
          subtitle="Add your details to view live date and time availability."
          values={intakeValues}
          onChange={setIntakeValues}
          onSubmit={handleContactSubmit}
          submitLabel="Book your slot now"
          submitting={submitting}
          className="border-0 bg-transparent p-0 shadow-none"
        />
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
