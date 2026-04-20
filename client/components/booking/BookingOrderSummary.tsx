import { cn } from "@/lib/utils";
import {
  computeDepositSplit,
  DEFAULT_BOOKING_DEPOSIT_USD,
  formatUsd,
  isComplimentaryCartTotal,
} from "./bookingPricing";

export interface BookingOrderSummaryProps {
  serviceName: string;
  serviceTotalUsd: number | null;
  /** Defaults to $50 booking deposit. */
  depositUsd?: number;
  /** e.g. "First available" before reserve, or specialist name after. */
  providerLabel: string;
  /** Extra emphasis on paying only the deposit today (payment step). */
  emphasizeBookingCharge?: boolean;
  className?: string;
}

function Row({
  label,
  value,
  valueClassName,
}: {
  label: string;
  value: string;
  valueClassName?: string;
}) {
  return (
    <div className="flex items-baseline justify-between gap-4 font-barlow text-sm font-light text-charcoal/80">
      <span className="text-charcoal/55">{label}</span>
      <span className={cn("text-right font-medium text-charcoal", valueClassName)}>{value}</span>
    </div>
  );
}

export function BookingOrderSummary({
  serviceName,
  serviceTotalUsd,
  depositUsd = DEFAULT_BOOKING_DEPOSIT_USD,
  providerLabel,
  emphasizeBookingCharge,
  className,
}: BookingOrderSummaryProps) {
  const complimentary = isComplimentaryCartTotal(serviceTotalUsd);
  const { payNow, balance } = computeDepositSplit(serviceTotalUsd, depositUsd);
  const totalLabel =
    serviceTotalUsd != null && Number.isFinite(serviceTotalUsd) ? formatUsd(serviceTotalUsd) : "—";
  const payNowLabel = payNow != null ? formatUsd(payNow) : "—";
  const balanceLabel = balance != null ? formatUsd(balance) : "—";

  return (
    <div
      className={cn(
        "border border-[rgba(103,92,83,0.15)] bg-[#F4F4EF]/80 px-4 py-4 sm:px-5",
        className,
      )}
    >
      <p className="mb-3 font-barlow text-[10px] font-light uppercase tracking-[0.14em] text-warm-brown/85">
        Order summary
      </p>
      <div className="space-y-2.5">
        <Row label="Selected service" value={serviceName} />
        {!complimentary ? (
          <>
            <Row label="Item cost" value={totalLabel} />
            <Row label="You pay now" value={payNowLabel} valueClassName="text-primary" />
            <Row label="Pay when you arrive" value={balanceLabel} />
          </>
        ) : null}
        <div className="border-t border-[rgba(103,92,83,0.1)] pt-2.5">
          <Row label="Service provider" value={providerLabel} valueClassName="font-normal" />
        </div>
      </div>
      {!complimentary && emphasizeBookingCharge && payNow != null ? (
        <p className="mt-3 border-t border-[rgba(103,92,83,0.08)] pt-3 font-barlow text-xs font-light leading-relaxed text-charcoal/60">
          Only {formatUsd(payNow)} is charged today to secure this booking. The remainder is due at your appointment.
        </p>
      ) : !complimentary && !emphasizeBookingCharge && serviceTotalUsd != null && payNow != null && payNow < serviceTotalUsd ? (
        <p className="mt-3 border-t border-[rgba(103,92,83,0.08)] pt-3 font-barlow text-xs font-light leading-relaxed text-charcoal/55">
          Booking deposit {formatUsd(payNow)}; balance {formatUsd(balance ?? 0)} due at check-in.
        </p>
      ) : null}
    </div>
  );
}
