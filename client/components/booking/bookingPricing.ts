/** Default booking deposit rate (fraction of initial list price before discount). */
export const DEFAULT_BOOKING_DEPOSIT_FRACTION = 0.25;

export function formatUsd(amount: number): string {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount);
}

/**
 * Deposit as a fraction of **initial / list price** (before discounts). Pay-now is capped at {@link amountDueUsd}
 * (what the client owes for the line after discounts) so the deposit never exceeds the cart total.
 */
export function computeDepositFromInitialPriceFraction(
  amountDueUsd: number | null,
  initialPriceUsd: number | null,
  fraction: number,
): { payNow: number | null; balance: number | null } {
  if (amountDueUsd == null || !Number.isFinite(amountDueUsd) || !Number.isFinite(fraction)) {
    return { payNow: null, balance: null };
  }
  const due = Math.max(amountDueUsd, 0);
  if (due === 0) {
    return { payNow: 0, balance: 0 };
  }

  const list =
    initialPriceUsd != null && Number.isFinite(initialPriceUsd) && initialPriceUsd > 0
      ? Math.max(initialPriceUsd, 0)
      : due;

  if (fraction >= 1) {
    return { payNow: due, balance: 0 };
  }
  if (fraction <= 0) {
    return { payNow: 0, balance: due };
  }

  const rawCents = Math.round(list * 100 * fraction);
  let payNow = rawCents / 100;
  payNow = Math.min(payNow, due);
  const balance = Math.max(due - payNow, 0);
  return { payNow, balance };
}

/** Strict: only explicit $0 cart total (not unknown/null) skips payment. */
export function isComplimentaryCartTotal(serviceTotalUsd: number | null): boolean {
  return serviceTotalUsd !== null && Number.isFinite(serviceTotalUsd) && serviceTotalUsd === 0;
}
