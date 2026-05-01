import type { BookingCatalog, BookingCategory } from "@/components/booking/utils/bookingCatalogApi";

export const SERVICE_SITE_SLUGS = ["lash", "head-spa", "pmu"] as const;
export type ServiceSiteSlug = (typeof SERVICE_SITE_SLUGS)[number];

function labelMatchesSite(siteSlug: ServiceSiteSlug, label: string): boolean {
  const n = label.trim().toLowerCase();
  switch (siteSlug) {
    case "head-spa":
      return /head[\s-]*spa|headspa/.test(n);
    case "pmu":
      return n.includes("pmu") || n.includes("permanent");
    case "lash":
      return n.includes("eyelash") || n.includes("lash");
    default:
      return false;
  }
}

/** Map `/services/:slug` to a live Boulevard menu tab; ties go to the category with more bookable services. */
export function resolveBookingCategoryForSiteSlug(
  catalog: BookingCatalog,
  siteSlug: string,
): BookingCategory | null {
  if (!catalog.categories.length) return null;
  if (!SERVICE_SITE_SLUGS.includes(siteSlug as ServiceSiteSlug)) return null;
  const slug = siteSlug as ServiceSiteSlug;

  const candidates = catalog.categories.filter((c) => labelMatchesSite(slug, c.label));
  if (candidates.length === 0) return null;
  if (candidates.length === 1) return candidates[0];

  let best = candidates[0];
  let bestCount = -1;
  for (const cat of candidates) {
    const count = catalog.services.filter((s) => s.category === cat.id).length;
    if (count > bestCount) {
      bestCount = count;
      best = cat;
    }
  }
  return best;
}
