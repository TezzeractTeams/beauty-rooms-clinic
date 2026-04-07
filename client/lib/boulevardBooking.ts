/**
 * Boulevard booking overlay (`injector.min.js` in `index.html` → `window.blvd`).
 *
 * **Full service menu (root):** `openBookingWidget` with `path: "/cart/menu/"` — `BOULEVARD_MAIN_MENU_BOOKING_URL_PARAMS`.
 * Fallback when `blvd` is not ready: native navigation to `BOULEVARD_DEFAULT_BOOK_NOW_HREF` (`/#book-now`).
 *
 * **Specific service:** include a deeper `path` (see launch-offer constants). `visitType` is always `SELF_VISIT`.
 */
export const BOULEVARD_BUSINESS_ID = "563b491d-6e0d-4898-b272-6a9565abde38";

/** Full-page widget URL (new-tab fallback when overlay API is unavailable). */
export const BOULEVARD_INJECTOR_SCRIPT_SRC = `https://www.joinblvd.com/b/${BOULEVARD_BUSINESS_ID}/widget?injector-version=1.0`;

/** Root cart menu — opens the full booking menu (not a single-service deep link). */
export const BOULEVARD_MAIN_MENU_BOOKING_URL_PARAMS = {
  locationId: "e3e0275b-4bbb-4c7c-a020-0dbb7ef96e2f",
  path: "/cart/menu",
  visitType: "SELF_VISIT",
} as const satisfies Record<string, string>;

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

/** Nano brows special — pre-selected PMU menu path in Boulevard overlay. */
export const NANO_BROWS_HERO_BOOKING_URL_PARAMS = {
  locationId: "e3e0275b-4bbb-4c7c-a020-0dbb7ef96e2f",
  path: "/cart/menu/PMU%20SERVICES/s_b9ede027-ab6b-4797-ae08-3c106b6001a4",
  visitType: "SELF_VISIT",
} as const satisfies Record<string, string>;

/**
 * Boulevard’s injector opens the **default** booking overlay when the URL ends with this hash
 * (e.g. `https://yoursite.com/#book-now`). Prefer this over `openBookingWidget` without a path,
 * which can follow a prior deep link (e.g. Lip Blush) in the same session.
 */
export const BOULEVARD_BOOK_NOW_HASH = "book-now";

/** Native `<a href>` for the default overlay — prefer this over RR `<Link>` so the injector sees `hashchange`. */
export const BOULEVARD_DEFAULT_BOOK_NOW_HREF = `/#${BOULEVARD_BOOK_NOW_HASH}`;

/** React Router target when client-side navigation is acceptable (e.g. secondary links). */
export const BOULEVARD_DEFAULT_BOOK_NOW_TO = {
  pathname: "/",
  hash: BOULEVARD_BOOK_NOW_HASH,
} as const;

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

/** Full-page widget URL when the head injector has not loaded `window.blvd` yet. */
export function openBoulevardBookingInNewTab(): void {
  if (typeof window === "undefined") return;
  window.open(BOULEVARD_INJECTOR_SCRIPT_SRC, "_blank", "noopener,noreferrer");
}

export function tryOpenBoulevardBooking(urlParams: Record<string, string>): void {
  if (!openBoulevardBookingWidget(urlParams)) {
    openBoulevardBookingInNewTab();
  }
}

/** Navbar / generic “Book now”: overlay at menu root; if injector not ready, same-tab `/#book-now`. */
export function openMainMenuBoulevardBooking(): void {
  if (openBoulevardBookingWidget({ ...BOULEVARD_MAIN_MENU_BOOKING_URL_PARAMS })) return;
  if (typeof window !== "undefined") {
    window.location.assign(`${window.location.origin}${BOULEVARD_DEFAULT_BOOK_NOW_HREF}`);
  }
}
