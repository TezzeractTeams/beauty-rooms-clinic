/**
 * Same business id as Boulevard head injector in `index.html` (`blvd.init`) and `BookNow` iframe.
 * Overlay: `static.joinboulevard.com/injector.min.js` → `window.blvd.openBookingWidget`.
 */
export const BOULEVARD_BUSINESS_ID = "563b491d-6e0d-4898-b272-6a9565abde38";

/** Full-page iframe embed URL (Book Now page), not the static overlay injector script. */
export const BOULEVARD_INJECTOR_SCRIPT_SRC = `https://www.joinblvd.com/b/${BOULEVARD_BUSINESS_ID}/widget?injector-version=1.0`;

/** Microneedling launch hero CTA — pre-selected menu path in Boulevard. */
export const MICRONEEDLING_HERO_BOOKING_URL_PARAMS = {
  locationId: "e3e0275b-4bbb-4c7c-a020-0dbb7ef96e2f",
  path: "/cart/menu/PMU%20SERVICES/s_28820f70-2286-41ec-96ce-c80a5ba0a165",
  visitType: "SELF_VISIT",
} as const satisfies Record<string, string>;

/** Lip blush launch offer — pre-selected PMU menu path in Boulevard overlay. */
export const LIP_BLUSH_LAUNCH_BOOKING_URL_PARAMS = {
  locationId: "e3e0275b-4bbb-4c7c-a020-0dbb7ef96e2f",
  path: "/cart/menu/PMU%20SERVICES/s_05f28d85-2107-4711-a224-6aca945bf06e",
  visitType: "SELF_VISIT",
} as const satisfies Record<string, string>;

declare global {
  interface Window {
    blvd?: {
      openBookingWidget: (options: { urlParams: Record<string, string> }) => void;
    };
  }
}

export function openBoulevardBookingWidget(urlParams: Record<string, string>): boolean {
  if (typeof window === "undefined") return false;
  const { blvd } = window;
  if (!blvd?.openBookingWidget) return false;
  blvd.openBookingWidget({ urlParams });
  return true;
}
