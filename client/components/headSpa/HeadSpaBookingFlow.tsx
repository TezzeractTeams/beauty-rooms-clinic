import { BookingFlowPanel } from "@/components/booking/BookingFlowPanel";
import { BookingIntakePanel, type BookingIntakeValues } from "@/components/booking/BookingIntakePanel";
import { useBooking } from "@/components/booking/hooks/useBooking";
import type { ClientInformation } from "@/components/booking/utils/boulevardApi";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getLeadAttributionSnapshot } from "@/lib/leadAttribution";
import { submitHeadSpaFormLead, type HeadSpaFormLeadPayload } from "@/lib/websiteFormLead";
import { cn } from "@/lib/utils";
import { type FormEvent, type MutableRefObject, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";

const SOURCE = "beauty_rooms_clinic_website";
const cardBorder = "border border-[rgba(103,92,83,0.12)]";

type View = "contact" | "booking";

export type HeadSpaBookingServiceOption = {
  id: string;
  name: string;
};

type Props = {
  idPrefix?: string;
  anchorId?: string;
  /** At least one. Multiple entries show tabs; first is the default. */
  services: readonly HeadSpaBookingServiceOption[];
  leadForm?: HeadSpaFormLeadPayload["form"];
  intakeTitle?: string;
  intakeSubtitle?: string;
};

const tabListClass =
  "flex h-auto w-full flex-col gap-2 rounded-none bg-[rgba(103,92,83,0.08)] p-2 sm:inline-flex sm:flex-row sm:gap-0";
const tabTriggerClass =
  "flex-1 rounded-none px-4 py-3 font-barlow text-xs font-light uppercase tracking-[0.08em] text-[rgba(45,41,38,0.7)] data-[state=active]:bg-[#FAFAF5] data-[state=active]:text-charcoal data-[state=active]:shadow-none";

type ServicePanelProps = {
  idPrefix: string;
  service: HeadSpaBookingServiceOption;
  leadForm: HeadSpaFormLeadPayload["form"];
  intakeTitle: string;
  intakeSubtitle: string;
  intakeValues: BookingIntakeValues;
  onIntakeChange: (values: BookingIntakeValues) => void;
  view: View;
  onViewChange: (view: View) => void;
  submitting: boolean;
  setSubmitting: (v: boolean) => void;
  selectedTabRef: MutableRefObject<string>;
};

function HeadSpaBookingServicePanel({
  idPrefix,
  service,
  leadForm,
  intakeTitle,
  intakeSubtitle,
  intakeValues,
  onIntakeChange,
  view,
  onViewChange,
  submitting,
  setSubmitting,
  selectedTabRef,
}: ServicePanelProps) {
  const bookingClientInfo = useMemo(
    (): ClientInformation => ({
      firstName: intakeValues.firstName.trim(),
      lastName: intakeValues.lastName.trim(),
      email: intakeValues.email.trim(),
      phoneNumber: intakeValues.phone.trim(),
    }),
    [intakeValues],
  );

  const { initialize, ...bookingPanel } = useBooking(service.id, service.name, bookingClientInfo);

  const baseLead = useCallback(
    () => ({
      source: SOURCE,
      form: leadForm,
      pageUri: typeof window !== "undefined" ? window.location.href : "",
      firstName: intakeValues.firstName.trim(),
      lastName: intakeValues.lastName.trim(),
      phone: intakeValues.phone.trim(),
      email: intakeValues.email.trim(),
      consent: intakeValues.consent,
      providerSlug: intakeValues.providerSlug,
      serviceName: service.name,
    }),
    [intakeValues, leadForm, service.name],
  );

  const handleContactSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!intakeValues.firstName.trim()) {
      toast.error("Please enter your first name.");
      return;
    }
    if (!intakeValues.lastName.trim()) {
      toast.error("Please enter your last name.");
      return;
    }
    if (!intakeValues.phone.trim()) {
      toast.error("Please enter your phone number.");
      return;
    }
    if (!intakeValues.email.trim()) {
      toast.error("Please enter your email address.");
      return;
    }
    if (!intakeValues.consent) {
      toast.error("Please agree to the Privacy Policy and communications consent to continue.");
      return;
    }

    const serviceIdForRun = service.id;

    setSubmitting(true);
    const leadResult = await submitHeadSpaFormLead({
      ...baseLead(),
      step: "contact",
      attribution: getLeadAttributionSnapshot(),
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
    if (serviceIdForRun !== selectedTabRef.current) {
      return;
    }
    onViewChange("booking");
  };

  return (
    <>
      {view === "contact" && (
        <BookingIntakePanel
          key={service.id}
          idPrefix={`${idPrefix}-${service.id.slice(-8)}`}
          title={intakeTitle}
          subtitle={intakeSubtitle}
          values={intakeValues}
          onChange={onIntakeChange}
          onSubmit={handleContactSubmit}
          submitLabel="Book your slot now"
          submitting={submitting}
          enforceNativeRequired
          className="border-0 bg-transparent p-0 shadow-none"
        />
      )}

      {view === "booking" && (
        <div className="w-full min-w-0 -mx-1 sm:mx-0" key={`${service.id}-flow`}>
          <BookingFlowPanel
            {...bookingPanel}
            serviceName={service.name}
            className="border-0 bg-transparent shadow-none"
          />
        </div>
      )}
    </>
  );
}

export function HeadSpaBookingFlow({
  idPrefix = "headspa",
  anchorId,
  services,
  leadForm = "head_spa_detox",
  intakeTitle = "Start Booking Your Head Spa Detox Experience",
  intakeSubtitle = "Add your details to view live date and time availability.",
}: Props) {
  const [selectedServiceId, setSelectedServiceId] = useState(() => services[0].id);
  const selectedTabRef = useRef(selectedServiceId);
  selectedTabRef.current = selectedServiceId;

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

  useEffect(() => {
    if (!services.some((s) => s.id === selectedServiceId)) {
      setSelectedServiceId(services[0].id);
    }
  }, [services, selectedServiceId]);

  const handleTabChange = (value: string) => {
    setSelectedServiceId(value);
    setView("contact");
    setSubmitting(false);
  };

  const multi = services.length > 1;

  const panelProps = (s: HeadSpaBookingServiceOption) => ({
    idPrefix,
    service: s,
    leadForm,
    intakeTitle: multi ? `Book your ${s.name}` : intakeTitle,
    intakeSubtitle,
    intakeValues,
    onIntakeChange: setIntakeValues,
    view,
    onViewChange: setView,
    submitting,
    setSubmitting,
    selectedTabRef,
  });

  return (
    <div
      id={anchorId}
      className={cn(cardBorder, "scroll-mt-28 bg-[#FAFAF5] shadow-sm", multi && "p-6 md:p-8")}
    >
      {multi ? (
        <Tabs value={selectedServiceId} onValueChange={handleTabChange}>
          <TabsList className={tabListClass} aria-label="Choose experience">
            {services.map((s) => (
              <TabsTrigger key={s.id} value={s.id} className={tabTriggerClass}>
                {s.name}
              </TabsTrigger>
            ))}
          </TabsList>
          {services.map((s) => (
            <TabsContent key={s.id} value={s.id} className="mt-6 outline-none">
              {selectedServiceId === s.id ? <HeadSpaBookingServicePanel {...panelProps(s)} /> : null}
            </TabsContent>
          ))}
        </Tabs>
      ) : (
        <HeadSpaBookingServicePanel {...panelProps(services[0])} />
      )}
    </div>
  );
}
