const API_KEY = import.meta.env.VITE_BLVD_API_KEY as string;
const BUSINESS_ID = import.meta.env.VITE_BLVD_BUSINESS_ID as string;

const API_BASE = `https://sandbox.joinblvd.com/api/2020-01/${BUSINESS_ID}/client`;

function authHeader(): string {
  return `Basic ${btoa(`${API_KEY}:`)}`;
}

async function gql<T>(query: string, variables: Record<string, unknown>): Promise<T> {
  const res = await fetch(API_BASE, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: authHeader(),
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
  await gql<{ updateCart: { cart: BlvdCart } }>(
    `mutation UpdateCart($cartId: ID!, $clientInformation: CartClientInformationInput!) {
      updateCart(input: { id: $cartId, clientInformation: $clientInformation }) {
        cart { id }
      }
    }`,
    { cartId, clientInformation },
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
