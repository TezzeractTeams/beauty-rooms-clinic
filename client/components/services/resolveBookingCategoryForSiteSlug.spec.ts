import {
  buildBookingDetailsHref,
  type BookingCatalog,
} from "@/components/booking/utils/bookingCatalogApi";
import { describe, expect, it } from "vitest";
import { resolveBookingCategoryForSiteSlug } from "./resolveBookingCategoryForSiteSlug";

function catalogFixture(overrides?: Partial<BookingCatalog>): BookingCatalog {
  return {
    categories: [],
    services: [],
    ...overrides,
  };
}

describe("resolveBookingCategoryForSiteSlug", () => {
  it("matches head spa category by label", () => {
    const catalog: BookingCatalog = {
      categories: [
        { id: "other--0", label: "Facial" },
        { id: "head-spa-services--1", label: "Head Spa" },
      ],
      services: [
        { id: "a", slug: "a", category: "head-spa-services--1", name: "A", durationMinutes: 60, discountedPriceUsd: 1, actualPriceUsd: 1, providers: [] },
      ],
    };
    expect(resolveBookingCategoryForSiteSlug(catalog, "head-spa")?.id).toBe("head-spa-services--1");
  });

  it("prefers the category with more services when multiple labels match", () => {
    const catalog: BookingCatalog = {
      categories: [
        { id: "lash-a--0", label: "Lash Classic" },
        { id: "lash-b--1", label: "Lash Volume" },
      ],
      services: [
        { id: "x", slug: "x", category: "lash-a--0", name: "X", durationMinutes: 0, discountedPriceUsd: 0, actualPriceUsd: 0, providers: [] },
        { id: "y", slug: "y", category: "lash-b--1", name: "Y", durationMinutes: 0, discountedPriceUsd: 0, actualPriceUsd: 0, providers: [] },
        { id: "z", slug: "z", category: "lash-b--1", name: "Z", durationMinutes: 0, discountedPriceUsd: 0, actualPriceUsd: 0, providers: [] },
      ],
    };
    expect(resolveBookingCategoryForSiteSlug(catalog, "lash")?.id).toBe("lash-b--1");
  });

  it("returns null for unknown site slug", () => {
    expect(resolveBookingCategoryForSiteSlug(catalogFixture({ categories: [{ id: "a", label: "Lash" }] }), "nope")).toBeNull();
  });

  it("maps pmu from label", () => {
    const catalog: BookingCatalog = {
      categories: [{ id: "pmu-services--0", label: "PMU Services" }],
      services: [
        { id: "s", slug: "lip-tint-abc", category: "pmu-services--0", name: "Lip Tint", durationMinutes: 0, discountedPriceUsd: 100, actualPriceUsd: 100, providers: [] },
      ],
    };
    expect(resolveBookingCategoryForSiteSlug(catalog, "pmu")?.id).toBe("pmu-services--0");
  });
});

describe("buildBookingDetailsHref", () => {
  it("includes category, service, first-available provider, and details stage", () => {
    const href = buildBookingDetailsHref({ categoryId: "pmu-services--4", serviceSlug: "lip-tint-98629712" });
    expect(href).toBe(
      "/booking?category=pmu-services--4&service=lip-tint-98629712&provider=first-available&stage=details",
    );
  });
});
