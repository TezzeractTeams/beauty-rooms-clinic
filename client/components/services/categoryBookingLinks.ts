/** Deep-link targets for `/booking` from service category detail pages. */
export const CATEGORY_BOOKING_LINKS: Record<string, string> = {
  lash: "/booking?category=eyelash-services--3",
  "head-spa": "/booking?category=headspa-services--0",
  pmu: "/booking?category=pmu-services--4",
  esthetician: "/booking?category=facials--5",
};

export function bookingPathForCategory(categoryId: string): string {
  return CATEGORY_BOOKING_LINKS[categoryId] ?? "/booking";
}
