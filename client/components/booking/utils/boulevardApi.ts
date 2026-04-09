/** Server proxies to Boulevard; API key never ships in the client bundle. */
const BLVD_GRAPHQL_URL = "/api/blvd/graphql";

export async function getBookingLocationId(): Promise<string> {
  const res = await fetch("/api/blvd/booking-config");
  if (!res.ok) {
    const err = await res.text();
    throw new Error(err || `Booking config error: ${res.status}`);
  }
  const data = (await res.json()) as { locationId?: string };
  const id = data.locationId?.trim();
  if (!id) throw new Error("Booking config did not return locationId");
  return id;
}

async function gql<T>(query: string, variables: Record<string, unknown>): Promise<T> {
  const res = await fetch(BLVD_GRAPHQL_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query, variables }),
  });

  if (!res.ok) {
    throw new Error(`Boulevard API error: ${res.status} ${res.statusText}`);
  }

  const json = (await res.json()) as { data?: T; errors?: { message: string }[] };

  if (json.errors?.length) {
    throw new Error(json.errors.map((e) => e.message).join("; "));
  }

  if (!json.data) {
    throw new Error("Boulevard API returned no data");
  }

  return json.data;
}

// ─── Types ────────────────────────────────────────────────────────────────────

export interface BlvdCart {
  id: string;
}

export interface BookableDate {
  date: string;
}

export interface BookableTime {
  id: string;
  startTime: string;
}

export interface ClientInformation {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
}

/**
 * Boulevard `PhoneNumber` expects E.164 (e.g. +13105551234), not formatted strings like "+1 (310) 555-1234".
 */
export function normalizePhoneForBoulevard(input: string): string {
  const raw = input.trim();
  if (!raw) return "";
  const hasPlus = raw.startsWith("+");
  const digits = raw.replace(/\D/g, "");
  if (!digits) return "";
  if (hasPlus) return `+${digits}`;
  if (digits.length === 10) return `+1${digits}`;
  if (digits.length === 11 && digits.startsWith("1")) return `+${digits}`;
  return `+${digits}`;
}

export interface AppointmentDetails {
  id: string;
  startAt: string;
  duration: number;
  location: { name: string };
  appointmentServices: { service: { name: string } }[];
  client: { name: string };
  /** Set when the cart resolved a staff member for the slot (from `selectedStaffVariant`). */
  specialistName?: string | null;
}

/**
 * Client API `CartAppointment` (see Boulevard book-sdk / developer docs) — only IDs + flag.
 * Full `Appointment` fields are not available on this type; use flow state for date/time display.
 */
export interface CartAppointment {
  appointmentId: string;
  clientId: string;
  forCartOwner: boolean;
}

/** `checkoutCart` payload: `appointments` is on the payload, not on `Cart`. */
export interface CheckoutCartPayload {
  cart: BlvdCart;
  appointments: CartAppointment[];
}

// ─── Mutations / Queries ──────────────────────────────────────────────────────

export async function createCart(locationId: string): Promise<string> {
  const data = await gql<{ createCart: { cart: BlvdCart } }>(
    `mutation CreateCart($locationId: ID!) {
      createCart(input: { locationId: $locationId }) {
        cart { id }
      }
    }`,
    { locationId },
  );
  return data.createCart.cart.id;
}

export async function addCartSelectedBookableItem(
  cartId: string,
  itemId: string,
): Promise<void> {
  await gql<{ addCartSelectedBookableItem: { cart: BlvdCart } }>(
    `mutation AddItem($cartId: ID!, $itemId: ID!) {
      addCartSelectedBookableItem(input: { id: $cartId, itemId: $itemId }) {
        cart { id }
      }
    }`,
    { cartId, itemId },
  );
}

/** `Money` scalar is in cents; sums all bookable line totals on the cart. */
export async function getCartBookableLineTotalUsd(cartId: string): Promise<number | null> {
  const data = await gql<{
    cart: {
      selectedItems: Array<{
        __typename?: string;
        lineTotal?: number;
      } | null> | null;
    } | null;
  }>(
    `query CartLineTotals($cartId: ID!) {
      cart(id: $cartId) {
        selectedItems {
          __typename
          ... on CartBookableItem {
            lineTotal
          }
        }
      }
    }`,
    { cartId },
  );

  let cents = 0;
  let found = false;
  for (const item of data.cart?.selectedItems ?? []) {
    if (item?.lineTotal != null && typeof item.lineTotal === "number") {
      cents += item.lineTotal;
      found = true;
    }
  }
  if (!found) return null;
  return cents / 100;
}

export async function cartBookableDates(
  cartId: string,
  searchRangeLower: string,
  searchRangeUpper: string,
  tz: string,
): Promise<BookableDate[]> {
  // `cartBookableDates` returns [CartBookableDate!]! — select `date` on each item (Date scalar).
  const data = await gql<{ cartBookableDates: BookableDate[] }>(
    `query BookableDates($cartId: ID!, $searchRangeLower: Date!, $searchRangeUpper: Date!, $tz: Tz!) {
      cartBookableDates(
        id: $cartId
        searchRangeLower: $searchRangeLower
        searchRangeUpper: $searchRangeUpper
        tz: $tz
      ) {
        date
      }
    }`,
    { cartId, searchRangeLower, searchRangeUpper, tz },
  );
  return data.cartBookableDates;
}

export async function cartBookableTimes(
  cartId: string,
  searchDate: string,
  tz: string,
): Promise<BookableTime[]> {
  // `cartBookableTimes` returns [CartBookableTime!]! — same pattern as `cartBookableDates`.
  const data = await gql<{ cartBookableTimes: BookableTime[] }>(
    `query BookableTimes($cartId: ID!, $searchDate: Date!, $tz: Tz!) {
      cartBookableTimes(id: $cartId, searchDate: $searchDate, tz: $tz) {
        id
        startTime
      }
    }`,
    { cartId, searchDate, tz },
  );
  return data.cartBookableTimes;
}

export async function reserveCartBookableItems(
  cartId: string,
  bookableTimeId: string,
): Promise<void> {
  await gql<{ reserveCartBookableItems: { cart: BlvdCart } }>(
    `mutation Reserve($cartId: ID!, $bookableTimeId: ID!) {
      reserveCartBookableItems(input: { id: $cartId, bookableTimeId: $bookableTimeId }) {
        cart { id }
      }
    }`,
    { cartId, bookableTimeId },
  );
}

export async function updateCart(
  cartId: string,
  clientInformation: ClientInformation,
): Promise<void> {
  const phoneNumber = normalizePhoneForBoulevard(clientInformation.phoneNumber);
  if (!phoneNumber || phoneNumber.length < 8) {
    throw new Error("Please enter a valid phone number.");
  }
  const payload: ClientInformation = {
    ...clientInformation,
    phoneNumber,
  };
  await gql<{ updateCart: { cart: BlvdCart } }>(
    `mutation UpdateCart($cartId: ID!, $clientInformation: CartClientInformationInput!) {
      updateCart(input: { id: $cartId, clientInformation: $clientInformation }) {
        cart { id }
      }
    }`,
    { cartId, clientInformation: payload },
  );
}

export async function addCartCardPaymentMethod(
  cartId: string,
  token: string,
): Promise<void> {
  await gql<{ addCartCardPaymentMethod: { cart: BlvdCart } }>(
    `mutation AddPayment($cartId: ID!, $token: String!) {
      addCartCardPaymentMethod(input: { id: $cartId, token: $token, select: true }) {
        cart { id }
      }
    }`,
    { cartId, token },
  );
}

/** Staff assigned to the cart’s bookable line item after a time is reserved (first-available may be null). */
export async function getCartSpecialistDisplayName(cartId: string): Promise<string | null> {
  const data = await gql<{
    cart: {
      selectedItems: Array<{
        selectedStaffVariant?: {
          staff?: {
            displayName?: string | null;
            firstName?: string | null;
            lastName?: string | null;
          } | null;
        } | null;
      } | null> | null;
    } | null;
  }>(
    `query CartSpecialist($cartId: ID!) {
      cart(id: $cartId) {
        selectedItems {
          ... on CartBookableItem {
            selectedStaffVariant {
              staff {
                displayName
                firstName
                lastName
              }
            }
          }
        }
      }
    }`,
    { cartId },
  );

  const items = data.cart?.selectedItems ?? [];
  for (const item of items) {
    if (!item?.selectedStaffVariant?.staff) continue;
    const s = item.selectedStaffVariant.staff;
    const display = s.displayName?.trim();
    if (display) return display;
    const joined = [s.firstName, s.lastName].filter(Boolean).join(" ").trim();
    if (joined) return joined;
  }
  return null;
}

export async function checkoutCart(cartId: string): Promise<CartAppointment[]> {
  const data = await gql<{ checkoutCart: CheckoutCartPayload }>(
    `mutation Checkout($cartId: ID!) {
      checkoutCart(input: { id: $cartId }) {
        cart {
          id
        }
        appointments {
          appointmentId
          clientId
          forCartOwner
        }
      }
    }`,
    { cartId },
  );
  return data.checkoutCart.appointments;
}
