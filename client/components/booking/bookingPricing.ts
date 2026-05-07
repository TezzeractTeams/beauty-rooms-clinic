import type { CartPricingBreakdown } from "./utils/boulevardApi";

export function formatUsd(amount: number): string {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount);
}

/**
 * Pay today from {@link CartPricingBreakdown.depositAmountUsd} (`cart.summary.depositAmount`), clamped to amount due.
 * Falls back via `depositType` when Boulevard omits amount but sends `NO_DEPOSIT` / `FULL_DEPOSIT`.
 */
export function depositPayNowAndBalance(
  amountDueUsd: number | null,
  pricingBreakdown: CartPricingBreakdown | null,
): { payNow: number | null; balance: number | null } {
  if (amountDueUsd == null || !Number.isFinite(amountDueUsd)) {
    return { payNow: null, balance: null };
  }
  const due = Math.max(amountDueUsd, 0);
  if (due === 0) {
    return { payNow: 0, balance: 0 };
  }

  let depositUsd = pricingBreakdown?.depositAmountUsd ?? null;
  const depositType = pricingBreakdown?.depositType ?? null;

  if (depositUsd != null && !Number.isFinite(depositUsd)) {
    depositUsd = null;
  }

  if (depositUsd == null && depositType === "NO_DEPOSIT") {
    depositUsd = 0;
  }
  if (depositUsd == null && depositType === "FULL_DEPOSIT") {
    depositUsd = due;
  }

  if (depositUsd == null) {
    return { payNow: null, balance: null };
  }

  const payNow = Math.min(Math.max(depositUsd, 0), due);
  return { payNow, balance: Math.max(due - payNow, 0) };
}

/** Strict: only explicit $0 cart total (not unknown/null) skips payment. */
export function isComplimentaryCartTotal(serviceTotalUsd: number | null): boolean {
  return serviceTotalUsd !== null && Number.isFinite(serviceTotalUsd) && serviceTotalUsd === 0;
}
