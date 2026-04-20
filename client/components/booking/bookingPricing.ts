/** Default deposit charged at booking (USD); balance due at appointment. */
export const DEFAULT_BOOKING_DEPOSIT_USD = 50;

export function formatUsd(amount: number): string {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount);
}

export function computeDepositSplit(
  serviceTotalUsd: number | null,
  depositUsd: number = DEFAULT_BOOKING_DEPOSIT_USD,
): { payNow: number | null; balance: number | null } {
  if (serviceTotalUsd == null || !Number.isFinite(serviceTotalUsd)) {
    return { payNow: null, balance: null };
  }
  const total = Math.max(serviceTotalUsd, 0);
  const payNow = Math.min(depositUsd, total);
  const balance = Math.max(total - payNow, 0);
  return { payNow, balance };
}
