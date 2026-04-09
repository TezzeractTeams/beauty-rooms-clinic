import { X } from "lucide-react";
import { useEffect, useMemo } from "react";
import { BookingFlowPanel } from "./BookingFlowPanel";
import { useBooking } from "./hooks/useBooking";
import type { ClientInformation } from "./utils/boulevardApi";

export interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  serviceId: string;
  serviceName: string;
  /** Required for checkout; pass empty only if collecting details elsewhere before opening. */
  clientInformation?: ClientInformation;
}

const EMPTY_CLIENT: ClientInformation = {
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
};

export function BookingModal({
  isOpen,
  onClose,
  serviceId,
  serviceName,
  clientInformation,
}: BookingModalProps) {
  const client = useMemo(() => clientInformation ?? EMPTY_CLIENT, [clientInformation]);
  const { initialize, reset, ...bookingRest } = useBooking(serviceId, serviceName, client);

  useEffect(() => {
    if (isOpen) {
      void initialize();
    } else {
      reset();
    }
  }, [isOpen, initialize, reset]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  function handleClose() {
    reset();
    onClose();
  }

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-50 bg-charcoal/50 backdrop-blur-[2px]"
        aria-hidden="true"
        onClick={handleClose}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label={`Book ${serviceName}`}
        className="fixed inset-x-4 bottom-0 top-0 z-50 my-auto mx-auto flex max-h-[90dvh] max-w-lg flex-col overflow-hidden sm:inset-x-auto sm:left-1/2 sm:-translate-x-1/2"
      >
        <div className="flex shrink-0 items-center justify-end border-b border-[rgba(103,92,83,0.12)] bg-[#FAFAF5] px-4 py-2">
          {bookingRest.state.step !== "confirmed" && (
            <button
              type="button"
              onClick={handleClose}
              className="flex h-8 w-8 items-center justify-center text-charcoal/50 transition-colors hover:text-charcoal"
              aria-label="Close booking"
            >
              <X className="h-5 w-5" strokeWidth={1.5} />
            </button>
          )}
        </div>

        <BookingFlowPanel
          {...bookingRest}
          serviceName={serviceName}
          onConfirmedClose={handleClose}
          className="max-h-[calc(90dvh-48px)] rounded-none border-0 bg-[#FAFAF5] shadow-none"
        />
      </div>
    </>
  );
}
