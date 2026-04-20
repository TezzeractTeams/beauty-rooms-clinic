import { CalendarCheck, Clock, MapPin, Sparkles, User, UserRound } from "lucide-react";
import { BookingOrderSummary } from "../BookingOrderSummary";
import { AppointmentDetails } from "../utils/boulevardApi";
import { formatAppointmentInSalon } from "../utils/salonTimezone";

interface Props {
  appointments: AppointmentDetails[];
  serviceName: string;
  serviceTotalUsd: number | null;
  specialistName: string | null;
  onClose: () => void;
}

function formatDuration(minutes: number): string {
  if (minutes < 60) return `${minutes} min`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m > 0 ? `${h}h ${m}min` : `${h}h`;
}

export function ConfirmationStep({
  appointments,
  serviceName,
  serviceTotalUsd,
  specialistName,
  onClose,
}: Props) {
  const appt = appointments[0];
  const salonWhen = appt?.startAt ? formatAppointmentInSalon(appt.startAt) : null;
  const providerLabel =
    specialistName?.trim() || appt?.specialistName?.trim() || "First available";

  return (
    <div className="flex w-full flex-col items-center gap-6 py-2 text-center">
      <div className="flex h-16 w-16 items-center justify-center border border-[rgba(103,92,83,0.15)] bg-white/60">
        <Sparkles className="h-7 w-7 text-warm-brown" strokeWidth={1.25} aria-hidden />
      </div>

      <div className="space-y-1">
        <h3 className="font-barlow text-2xl font-extralight tracking-[-0.03em] text-charcoal">
          You&apos;re booked!
        </h3>
        <p className="font-barlow text-sm font-light text-charcoal/55">
          A confirmation has been sent to your email address.
        </p>
      </div>

      <BookingOrderSummary
        className="w-full text-left"
        serviceName={appt?.appointmentServices?.[0]?.service?.name ?? serviceName}
        serviceTotalUsd={serviceTotalUsd}
        providerLabel={providerLabel}
      />

      {appt ? (
        <div className="w-full border border-[rgba(103,92,83,0.15)] bg-[#F4F4EF] px-6 py-5 text-left">
          <p className="mb-4 font-barlow text-[10px] font-light uppercase tracking-[0.14em] text-warm-brown/80">
            Appointment details
          </p>

          <ul className="space-y-3">
            <li className="flex items-start gap-3 font-barlow text-sm font-light text-charcoal/80">
              <CalendarCheck className="mt-0.5 h-4 w-4 shrink-0 text-warm-brown/70" strokeWidth={1.25} aria-hidden />
              <div>
                <span className="block text-xs uppercase tracking-[0.08em] text-charcoal/45">Service</span>
                <span>
                  {appt.appointmentServices?.[0]?.service?.name ?? serviceName}
                </span>
              </div>
            </li>

            {appt.specialistName ? (
              <li className="flex items-start gap-3 font-barlow text-sm font-light text-charcoal/80">
                <UserRound className="mt-0.5 h-4 w-4 shrink-0 text-warm-brown/70" strokeWidth={1.25} aria-hidden />
                <div>
                  <span className="block text-xs uppercase tracking-[0.08em] text-charcoal/45">Specialist</span>
                  <span>{appt.specialistName}</span>
                </div>
              </li>
            ) : null}

            {salonWhen && (
              <li className="flex items-start gap-3 font-barlow text-sm font-light text-charcoal/80">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-warm-brown/70" strokeWidth={1.25} aria-hidden />
                <div>
                  <span className="block text-xs uppercase tracking-[0.08em] text-charcoal/45">
                    Date &amp; time
                  </span>
                  <span className="text-charcoal/90">
                    {salonWhen.date}
                    <span className="mx-1.5 text-charcoal/40">·</span>
                    <span className="font-medium text-charcoal">
                      {salonWhen.time} {salonWhen.tzShort}
                    </span>
                    {appt.duration > 0 && (
                      <span className="ml-2 text-xs text-charcoal/40">({formatDuration(appt.duration)})</span>
                    )}
                  </span>
                </div>
              </li>
            )}

            {appt.location?.name && (
              <li className="flex items-start gap-3 font-barlow text-sm font-light text-charcoal/80">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-warm-brown/70" strokeWidth={1.25} aria-hidden />
                <div>
                  <span className="block text-xs uppercase tracking-[0.08em] text-charcoal/45">Location</span>
                  <span>{appt.location.name}</span>
                </div>
              </li>
            )}

            {appt.client?.name && (
              <li className="flex items-start gap-3 font-barlow text-sm font-light text-charcoal/80">
                <User className="mt-0.5 h-4 w-4 shrink-0 text-warm-brown/70" strokeWidth={1.25} aria-hidden />
                <div>
                  <span className="block text-xs uppercase tracking-[0.08em] text-charcoal/45">Client</span>
                  <span>{appt.client.name}</span>
                </div>
              </li>
            )}
          </ul>
        </div>
      ) : (
        <div className="w-full border border-[rgba(103,92,83,0.15)] bg-[#F4F4EF] px-6 py-5 text-left">
          <p className="font-barlow text-sm font-light text-charcoal/70">
            Your appointment for <span className="text-charcoal">{serviceName}</span> has been confirmed.
          </p>
        </div>
      )}

      <p className="max-w-xs font-barlow text-xs font-light leading-relaxed text-charcoal/50">
        We look forward to seeing you. Please arrive 5–10 minutes early for your appointment.
      </p>

      <button
        type="button"
        onClick={onClose}
        className="w-full max-w-md border border-charcoal/20 bg-transparent px-6 py-4 font-barlow text-[11px] font-light uppercase tracking-[0.1em] text-charcoal transition-colors hover:border-charcoal/40 hover:bg-charcoal/5"
      >
        Close
      </button>
    </div>
  );
}
