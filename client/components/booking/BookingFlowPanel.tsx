import { cn } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";
import { useBooking } from "./hooks/useBooking";
import { ConfirmationStep } from "./steps/ConfirmationStep";
import { DateTimeStep } from "./steps/DateTimeStep";
import { PaymentStep } from "./steps/PaymentStep";

export type BookingFlowPanelProps = Omit<ReturnType<typeof useBooking>, "initialize" | "reset"> & {
  serviceName: string;
  onConfirmedClose?: () => void;
  className?: string;
};

const STEPS = [
  { id: "datetime", label: "Date & Time" },
  { id: "payment", label: "Payment" },
  { id: "confirmed", label: "Confirmation" },
] as const;

export function BookingFlowPanel({
  serviceName,
  state,
  selectDate,
  selectTime,
  confirmDateTime,
  submitPayment,
  goBack,
  onConfirmedClose,
  className,
}: BookingFlowPanelProps) {
  const currentStepIndex = STEPS.findIndex((s) => s.id === state.step);
  const canGoBack = state.step !== "datetime" && state.step !== "confirmed" && !state.loading;

  return (
    <div className={cn("flex flex-col overflow-hidden rounded-sm border border-[rgba(103,92,83,0.12)] bg-white shadow-sm", className)}>
      <div className="flex shrink-0 items-center justify-between border-b border-[rgba(103,92,83,0.12)] px-4 py-3 sm:px-6">
        <div className="flex min-w-0 items-center gap-3">
          {canGoBack && (
            <button
              type="button"
              onClick={goBack}
              className="flex shrink-0 items-center gap-1.5 font-barlow text-xs font-light uppercase tracking-[0.1em] text-charcoal/60 transition-colors hover:text-charcoal"
              aria-label="Go back"
            >
              <ArrowLeft className="h-4 w-4" strokeWidth={1.5} />
              Back
            </button>
          )}
          {!canGoBack && (
            <span className="truncate font-barlow text-xs font-light uppercase tracking-[0.1em] text-warm-brown/70">
              {serviceName}
            </span>
          )}
        </div>
      </div>

      <div className="shrink-0 border-b border-[rgba(103,92,83,0.08)] px-4 py-3 sm:px-6" aria-label="Booking progress">
        <div className="flex items-center gap-0">
          {STEPS.map((step, i) => {
            const stepIndex = STEPS.findIndex((s) => s.id === step.id);
            const isComplete = stepIndex < currentStepIndex;
            const isActive = step.id === state.step;
            const isConfirmationLocked = step.id === "confirmed" && state.step !== "confirmed";

            return (
              <div key={step.id} className="flex flex-1 items-center">
                <div
                  className={cn(
                    "flex flex-col items-center gap-1",
                    isConfirmationLocked && "opacity-45",
                  )}
                  aria-current={isActive ? "step" : undefined}
                  aria-disabled={isConfirmationLocked ? true : undefined}
                >
                  <div
                    className={cn(
                      "flex h-5 w-5 items-center justify-center text-[10px] font-barlow font-light transition-colors",
                      isComplete
                        ? "bg-warm-brown/80 text-white"
                        : isActive
                          ? "border border-charcoal bg-charcoal text-white"
                          : isConfirmationLocked
                            ? "border border-charcoal/15 text-charcoal/25"
                            : "border border-charcoal/20 text-charcoal/35",
                    )}
                  >
                    {isComplete ? "✓" : i + 1}
                  </div>
                  <span
                    className={cn(
                      "whitespace-nowrap font-barlow text-[9px] font-light uppercase leading-none tracking-[0.07em]",
                      isActive
                        ? "text-charcoal"
                        : isConfirmationLocked
                          ? "text-charcoal/30"
                          : "text-charcoal/40",
                    )}
                  >
                    {step.label}
                  </span>
                </div>
                {i < STEPS.length - 1 && (
                  <div
                    className={cn(
                      "mx-1 h-px flex-1 transition-colors",
                      isComplete ? "bg-warm-brown/40" : "bg-charcoal/12",
                    )}
                    aria-hidden
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-5 sm:px-6 sm:py-6">
        {state.step === "datetime" && (
          <DateTimeStep
            availableDates={state.availableDates}
            availableTimes={state.availableTimes}
            selectedDate={state.selectedDate}
            selectedTime={state.selectedTime}
            loading={state.loading}
            error={state.error}
            serviceName={serviceName}
            serviceTotalUsd={state.serviceTotalUsd}
            onSelectDate={selectDate}
            onSelectTime={selectTime}
            onConfirm={confirmDateTime}
          />
        )}

        {state.step === "payment" && (
          <PaymentStep
            loading={state.loading}
            error={state.error}
            serviceName={serviceName}
            serviceTotalUsd={state.serviceTotalUsd}
            specialistName={state.specialistName}
            onSubmit={submitPayment}
          />
        )}

        {state.step === "confirmed" && (
          <ConfirmationStep
            appointments={state.appointments}
            serviceName={serviceName}
            serviceTotalUsd={state.serviceTotalUsd}
            specialistName={state.specialistName}
            onClose={onConfirmedClose ?? (() => {})}
          />
        )}
      </div>
    </div>
  );
}
