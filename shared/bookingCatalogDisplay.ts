/**
 * Booking page: hide Head Spa “add-on” upsells as their own Boulevard menu tab, and drop
 * add-on line items from the main Head Spa service list where they still appear.
 */

function looksLikeHeadSpaMenuName(name: string): boolean {
  return /head[\s_-]*spa|headspa/i.test(name.trim());
}

/** Entire Boulevard `availableCategories` row is a Head Spa add-on / upsells group — omit the tab. */
export function shouldOmitHeadSpaAddOnCategoryTab(categoryLabel: string): boolean {
  const n = categoryLabel.trim();
  if (!looksLikeHeadSpaMenuName(n)) return false;

  if (/\bupsells?\b/i.test(n)) return true;

  const compact = n.toLowerCase().replace(/[^a-z0-9]/g, "");
  if (compact.includes("upsell")) return true;

  // Separator between words ("HEAD SPA ADD-ONS", "Head Spa — Add-Ons").
  if (/\badd[\s_-]*ons?\b/i.test(n) || /\baddons?\b/i.test(n)) return true;

  // Glue-style labels Boulevard sometimes returns ("HEADSPAADDONS", "HeadSpaAddOns").
  if (compact.includes("addon") || compact.includes("addons")) return true;

  return false;
}

/** Omit a single bookable when it lives under Head Spa but is an upsell/add-on variant. */
export function shouldOmitHeadSpaAddOnBookable(categoryLabel: string, bookableName: string): boolean {
  if (!looksLikeHeadSpaMenuName(categoryLabel)) return false;
  if (shouldOmitHeadSpaAddOnCategoryTab(categoryLabel)) return false;
  const s = bookableName.trim();
  const compact = s.toLowerCase().replace(/[^a-z0-9]/g, "");
  if (/\(.*?add[\s_-]*ons?.*?\)/i.test(s)) return true;
  if (/\badd[\s_-]*ons?\b|\baddons?\b/i.test(s)) return true;
  if (compact.includes("addon") || compact.includes("addons")) return true;
  return false;
}

export function filterBookingCatalogForWebsite<
  TCategory extends { id: string; label: string },
  TService extends { category: string; name: string },
>(catalog: { categories: TCategory[]; services: TService[] }): {
  categories: TCategory[];
  services: TService[];
} {
  const categories = catalog.categories.filter((c) => !shouldOmitHeadSpaAddOnCategoryTab(c.label));
  const labelById = new Map(catalog.categories.map((c) => [c.id, c.label] as const));
  const kept = new Set(categories.map((c) => c.id));
  const services = catalog.services.filter((s) => {
    if (!kept.has(s.category)) return false;
    const label = labelById.get(s.category) ?? "";
    return !shouldOmitHeadSpaAddOnBookable(label, s.name);
  });
  return { categories, services };
}
