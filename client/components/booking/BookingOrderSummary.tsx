import { cn } from "@/lib/utils";
import {
  computeDepositFromInitialPriceFraction,
  DEFAULT_BOOKING_DEPOSIT_FRACTION,
  formatUsd,
  isComplimentaryCartTotal,
} from "./bookingPricing";

import type { CartPricingBreakdown } from "./utils/boulevardApi";

export interface BookingOrderSummaryProps {
  serviceName: string;
  serviceTotalUsd: number | null;
  /** When set, shows priced lines from Boulevard; deposit uses list price (`itemCostUsd`) vs amount due (`totalUsd`). */
  pricingBreakdown?: CartPricingBreakdown | null;
  /** Fraction of **initial/list price** (before discounts) charged as deposit today. Capped at post-discount total. */
  depositFraction?: number;
  providerLabel: string;
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
  pricingBreakdown,
  depositFraction = DEFAULT_BOOKING_DEPOSIT_FRACTION,
  providerLabel,
  emphasizeBookingCharge,
  className,
}: BookingOrderSummaryProps) {
  const complimentary = isComplimentaryCartTotal(serviceTotalUsd);
  const showOfferLines = pricingBreakdown != null;
  const showDiscountRow = pricingBreakdown != null && pricingBreakdown.discountUsd > 0;

  const amountDueUsd =
    pricingBreakdown != null ? pricingBreakdown.totalUsd : serviceTotalUsd;
  const initialPriceUsd =
    pricingBreakdown != null ? pricingBreakdown.itemCostUsd : serviceTotalUsd;

  const fraction =
    depositFraction != null && Number.isFinite(depositFraction) ? depositFraction : DEFAULT_BOOKING_DEPOSIT_FRACTION;

  const { payNow, balance } = computeDepositFromInitialPriceFraction(amountDueUsd, initialPriceUsd, fraction);

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
            {showOfferLines ? (
              <>
                {showDiscountRow ? (
                  <>
                    <Row label="Item cost" value={formatUsd(pricingBreakdown.itemCostUsd)} />
                    <Row
                      label={`Discount (${pricingBreakdown.discountCode})`}
                      value={formatUsd(-pricingBreakdown.discountUsd)}
                      valueClassName="text-charcoal/75"
                    />
                    <Row label="Total" value={formatUsd(pricingBreakdown.totalUsd)} />
                  </>
                ) : (
                  <Row label="Total" value={formatUsd(pricingBreakdown.totalUsd)} />
                )}
                <div className="border-t border-[rgba(103,92,83,0.12)] pt-2.5" aria-hidden />
                <Row label="Deposit / You pay now" value={payNowLabel} valueClassName="text-primary" />
                <Row label="Pay when you arrive" value={balanceLabel} />
              </>
            ) : (
              <>
                <Row label="Item cost" value={totalLabel} />
                <Row label="You pay now" value={payNowLabel} valueClassName="text-primary" />
                <Row label="Pay when you arrive" value={balanceLabel} />
              </>
            )}
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
      ) : !complimentary &&
        !emphasizeBookingCharge &&
        amountDueUsd != null &&
        payNow != null &&
        payNow < amountDueUsd ? (
        <p className="mt-3 border-t border-[rgba(103,92,83,0.08)] pt-3 font-barlow text-xs font-light leading-relaxed text-charcoal/55">
          Booking deposit {formatUsd(payNow)}; balance {formatUsd(balance ?? 0)} due at check-in.
        </p>
      ) : null}
    </div>
  );
}
