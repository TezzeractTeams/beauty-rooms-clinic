import type { RequestHandler } from "express";

const BLVD_CLIENT_BASE = "https://sandbox.joinblvd.com/api/2020-01";

type BookingCatalogCategory = "pmu" | "head-spa" | "lashes";

interface BookingCatalogProvider {
  id: string;
  slug: string;
  name: string;
}

interface BookingCatalogService {
  id: string;
  slug: string;
  category: BookingCatalogCategory;
  name: string;
  durationMinutes: number;
  discountedPriceUsd: number;
  actualPriceUsd: number;
  providers: BookingCatalogProvider[];
}

interface BookingCatalogResponse {
  categories: Array<{ id: BookingCatalogCategory; label: string }>;
  services: BookingCatalogService[];
}

const DEFAULT_PROVIDERS: BookingCatalogProvider[] = [
  { id: "first-available", slug: "first-available", name: "First available" },
  { id: "kelsey", slug: "kelsey", name: "Kelsey" },
  { id: "erica-shea", slug: "erica-shea", name: "Erica Shea" },
];

const BOOKING_CATALOG: BookingCatalogResponse = {
  categories: [
    { id: "pmu", label: "PMU" },
    { id: "head-spa", label: "Head Spa" },
    { id: "lashes", label: "Lashes" },
  ],
  services: [
    {
      id: "urn:blvd:Service:a18df652-4f9f-4ce8-9448-a2b79dc95af0",
      slug: "nano-brows",
      category: "pmu",
      name: "Nano Brows",
      durationMinutes: 180,
      discountedPriceUsd: 399,
      actualPriceUsd: 499,
      providers: DEFAULT_PROVIDERS,
    },
    {
      id: "urn:blvd:Service:48eb2d88-48ea-4b3a-b6ec-08fdaf35e44a",
      slug: "lip-blush",
      category: "pmu",
      name: "Lip Blush",
      durationMinutes: 150,
      discountedPriceUsd: 499,
      actualPriceUsd: 649,
      providers: DEFAULT_PROVIDERS,
    },
    {
      id: "urn:blvd:Service:786e1942-2960-4a0e-bb5d-f03ad53fe1e7",
      slug: "head-spa-detox-experience",
      category: "head-spa",
      name: "Head Spa Detox Experience",
      durationMinutes: 90,
      discountedPriceUsd: 140,
      actualPriceUsd: 175,
      providers: DEFAULT_PROVIDERS,
    },
    {
      id: "urn:blvd:Service:c85e3b65-8d99-4893-a4bb-2fbd16635e2b",
      slug: "scalp-reset-series-session",
      category: "head-spa",
      name: "Scalp Reset Series Session",
      durationMinutes: 90,
      discountedPriceUsd: 133,
      actualPriceUsd: 175,
      providers: DEFAULT_PROVIDERS,
    },
    {
      id: "urn:blvd:Service:6c8eeb04-3de1-4efe-8d57-87564465a9cf",
      slug: "lashes-launch-offer",
      category: "lashes",
      name: "Lashes Launch Offer",
      durationMinutes: 120,
      discountedPriceUsd: 125,
      actualPriceUsd: 150,
      providers: DEFAULT_PROVIDERS,
    },
    {
      id: "urn:blvd:Service:84ea4630-5846-40f4-8ce0-0ebf76db7b4f",
      slug: "lash-fill",
      category: "lashes",
      name: "Lash Fill",
      durationMinutes: 75,
      discountedPriceUsd: 95,
      actualPriceUsd: 120,
      providers: DEFAULT_PROVIDERS,
    },
  ],
};

function toBlvdGlobalLocationId(rawId: string): string {
  const id = rawId.trim();
  if (!id) return id;
  // Boulevard GraphQL IDs are global IDs (URN), e.g. urn:blvd:Location:<uuid>
  if (id.startsWith("urn:blvd:Location:")) return id;
  return `urn:blvd:Location:${id}`;
}

/** Public booking config (location URN) — safe to expose; keys stay server-side. */
export const handleBlvdBookingConfig: RequestHandler = (_req, res) => {
  const locationId = process.env.BLVD_SANDBOX_LOCATION_ID;
  if (!locationId?.trim()) {
    res.status(503).json({ error: "BLVD_SANDBOX_LOCATION_ID is not configured" });
    return;
  }
  res.json({ locationId: toBlvdGlobalLocationId(locationId) });
};

/** Booking page service/provider catalog. */
export const handleBlvdBookingCatalog: RequestHandler = (_req, res) => {
  res.json(BOOKING_CATALOG);
};

/** Proxies GraphQL to Boulevard using server-side credentials (never sent to the browser). */
export const handleBlvdGraphql: RequestHandler = async (req, res) => {
  const apiKey = process.env.BLVD_SANDBOX_API_KEY?.trim();
  const businessId = process.env.BLVD_SANDBOX_BUSINESS_ID?.trim();
  if (!apiKey || !businessId) {
    res.status(503).json({ error: "Boulevard sandbox API is not configured" });
    return;
  }

  const body = req.body as { query?: unknown; variables?: unknown } | undefined;
  const query = typeof body?.query === "string" ? body.query : "";
  if (!query.trim()) {
    res.status(400).json({ error: "Missing GraphQL query" });
    return;
  }

  const variables =
    body?.variables !== undefined && body?.variables !== null && typeof body.variables === "object"
      ? (body.variables as Record<string, unknown>)
      : {};

  const url = `${BLVD_CLIENT_BASE}/${businessId}/client`;
  const upstream = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${Buffer.from(`${apiKey}:`).toString("base64")}`,
    },
    body: JSON.stringify({ query, variables }),
  });

  const text = await upstream.text();
  res.status(upstream.status).type("application/json").send(text);
};
