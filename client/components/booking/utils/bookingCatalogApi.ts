/** Tab / URL param id for a menu category (from Boulevard `availableCategories`). */
export type BookingCategoryId = string;

export interface BookingProviderOption {
  id: string;
  slug: string;
  name: string;
}

export interface BookingCategory {
  id: BookingCategoryId;
  label: string;
}

export interface BookingService {
  id: string;
  slug: string;
  category: BookingCategoryId;
  name: string;
  durationMinutes: number;
  discountedPriceUsd: number;
  actualPriceUsd: number;
  providers: BookingProviderOption[];
}

export interface BookingCatalog {
  categories: BookingCategory[];
  services: BookingService[];
}

export async function fetchBookingCatalog(): Promise<BookingCatalog> {
  const response = await fetch("/api/blvd/booking-catalog");
  if (!response.ok) {
    const err = await response.text();
    throw new Error(err || "Could not load booking services.");
  }
  return (await response.json()) as BookingCatalog;
}

export function findCategoryById(catalog: BookingCatalog, categoryId: string | null): BookingCategory | null {
  if (!categoryId) return null;
  return catalog.categories.find((category) => category.id === categoryId) ?? null;
}

export function findServiceBySlug(catalog: BookingCatalog, serviceSlug: string | null): BookingService | null {
  if (!serviceSlug) return null;
  return catalog.services.find((service) => service.slug === serviceSlug) ?? null;
}

export function findProviderBySlug(service: BookingService | null, providerSlug: string | null): BookingProviderOption | null {
  if (!service || !providerSlug) return null;
  return service.providers.find((provider) => provider.slug === providerSlug) ?? null;
}
