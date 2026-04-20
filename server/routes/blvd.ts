import type { RequestHandler } from "express";

/** Live Client GraphQL (matches @boulevard/blvd-book-sdk `PlatformTarget.Live`). */
const BLVD_LIVE_CLIENT_BASE = "https://dashboard.boulevard.io/api/2020-01";

interface BookingCatalogProvider {
  id: string;
  slug: string;
  name: string;
}

interface BookingCatalogService {
  id: string;
  slug: string;
  category: string;
  name: string;
  durationMinutes: number;
  discountedPriceUsd: number;
  actualPriceUsd: number;
  providers: BookingCatalogProvider[];
}

export interface BookingCatalogResponse {
  categories: Array<{ id: string; label: string }>;
  services: BookingCatalogService[];
}

interface ProdBlvdEnv {
  apiKey: string;
  secretKey: string;
  businessId: string;
  locationRaw: string;
}

function getProdBlvdEnv(): ProdBlvdEnv | null {
  const apiKey = process.env.BLVD_PROD_API_KEY?.trim();
  const secretKey = process.env.BLVD_PROD_SECRET_KEY?.trim();
  const businessId = process.env.BLVD_PROD_BUSINESS_ID?.trim();
  const locationRaw = process.env.BLVD_PROD_LOCATION_ID?.trim();
  if (!apiKey || !secretKey || !businessId || !locationRaw) return null;
  return { apiKey, secretKey, businessId, locationRaw };
}

function blvdLiveClientUrl(businessId: string): string {
  return `${BLVD_LIVE_CLIENT_BASE}/${businessId}/client`;
}

/**
 * Boulevard Client API uses HTTP Basic with the **public API key** as the username and an empty password
 * (see @boulevard/blvd-book-sdk `PlatformClient.prototype.token`). `BLVD_PROD_SECRET_KEY` is still required
 * in env so server-side secrets stay present for other integrations (e.g. vault); it is not sent here.
 */
function blvdLiveBasicAuthHeader(apiKey: string): string {
  return `Basic ${Buffer.from(`${apiKey}:`).toString("base64")}`;
}

function toBlvdGlobalLocationId(rawId: string): string {
  const id = rawId.trim();
  if (!id) return id;
  if (id.startsWith("urn:blvd:Location:")) return id;
  return `urn:blvd:Location:${id}`;
}

function slugifySegment(s: string): string {
  const x = s
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return x || "category";
}

function shortIdFromGlobalId(id: string): string {
  const last = id.includes(":") ? (id.split(":").pop() ?? id) : id;
  return last.replace(/-/g, "").slice(-8) || "0";
}

const BOOKING_CATALOG_CART_MUTATION = `
mutation BookingCatalogCart($locationId: ID!) {
  createCart(input: { locationId: $locationId }) {
    cart {
      availableCategories {
        name
        availableItems {
          id
          name
          __typename
          ... on CartAvailableBookableItem {
            listPrice
            listDuration
          }
        }
      }
    }
  }
}
`;

type CatalogCartResponse = {
  data?: {
    createCart?: {
      cart?: {
        availableCategories?: Array<{
          name: string;
          availableItems?: Array<{
            id: string;
            name: string;
            __typename?: string;
            listPrice?: number | null;
            listDuration?: number | null;
          } | null> | null;
        } | null> | null;
      } | null;
    } | null;
  };
  errors?: Array<{ message?: string }>;
};

const FIRST_AVAILABLE_PROVIDERS: BookingCatalogProvider[] = [
  { id: "first-available", slug: "first-available", name: "First available" },
];

interface AvailableCategoryRow {
  name: string;
  availableItems?: Array<{
    id: string;
    name: string;
    __typename?: string;
    listPrice?: number | null;
    listDuration?: number | null;
  } | null> | null;
}

function mapAvailableCategoriesToCatalog(rows: AvailableCategoryRow[]): BookingCatalogResponse {
  const categories: BookingCatalogResponse["categories"] = [];
  const services: BookingCatalogService[] = [];

  const list = Array.isArray(rows) ? rows : [];
  let catIndex = 0;
  for (const row of list) {
    if (!row?.name) continue;
    const bookableForRow: BookingCatalogService[] = [];
    for (const item of row.availableItems ?? []) {
      if (!item?.id || !item.name) continue;
      if (item.__typename && item.__typename !== "CartAvailableBookableItem") continue;

      const listPriceCents = typeof item.listPrice === "number" ? item.listPrice : 0;
      const priceUsd = listPriceCents / 100;
      const durationMinutes = typeof item.listDuration === "number" ? item.listDuration : 0;
      const slug = `${slugifySegment(item.name)}-${shortIdFromGlobalId(item.id)}`;

      bookableForRow.push({
        id: item.id,
        slug,
        category: "",
        name: item.name.trim(),
        durationMinutes,
        discountedPriceUsd: priceUsd,
        actualPriceUsd: priceUsd,
        providers: FIRST_AVAILABLE_PROVIDERS,
      });
    }
    if (bookableForRow.length === 0) continue;

    const categoryId = `${slugifySegment(row.name)}--${catIndex}`;
    catIndex += 1;
    categories.push({ id: categoryId, label: row.name.trim() });
    for (const s of bookableForRow) {
      services.push({ ...s, category: categoryId });
    }
  }

  return { categories, services };
}

async function blvdLiveGraphqlJson(
  env: ProdBlvdEnv,
  query: string,
  variables: Record<string, unknown>,
): Promise<{ ok: true; json: unknown } | { ok: false; status: number; body: string }> {
  const url = blvdLiveClientUrl(env.businessId);
  const upstream = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: blvdLiveBasicAuthHeader(env.apiKey),
    },
    body: JSON.stringify({ query, variables }),
  });

  const text = await upstream.text();
  const looksJson = text.trimStart().startsWith("{");
  if (!upstream.ok || !looksJson) {
    return { ok: false, status: upstream.ok ? 502 : upstream.status, body: text.slice(0, 500) };
  }

  try {
    return { ok: true, json: JSON.parse(text) as unknown };
  } catch {
    return { ok: false, status: 502, body: "Invalid JSON from Boulevard" };
  }
}

/** Public booking config (location URN) — safe to expose; keys stay server-side. */
export const handleBlvdBookingConfig: RequestHandler = (_req, res) => {
  const env = getProdBlvdEnv();
  if (!env) {
    res.status(503).json({
      error: "Boulevard production is not configured (need BLVD_PROD_API_KEY, BLVD_PROD_SECRET_KEY, BLVD_PROD_BUSINESS_ID, BLVD_PROD_LOCATION_ID)",
    });
    return;
  }
  res.json({ locationId: toBlvdGlobalLocationId(env.locationRaw) });
};

/** Booking page catalog from Boulevard `createCart` → `availableCategories` / `availableItems`. */
export const handleBlvdBookingCatalog: RequestHandler = async (_req, res) => {
  const env = getProdBlvdEnv();
  if (!env) {
    res.status(503).json({
      error: "Boulevard production is not configured (need BLVD_PROD_API_KEY, BLVD_PROD_SECRET_KEY, BLVD_PROD_BUSINESS_ID, BLVD_PROD_LOCATION_ID)",
    });
    return;
  }

  const locationId = toBlvdGlobalLocationId(env.locationRaw);
  const result = await blvdLiveGraphqlJson(env, BOOKING_CATALOG_CART_MUTATION, { locationId });

  if (result.ok === false) {
    res.status(502).json({ error: "Boulevard catalog request failed", detail: result.body });
    return;
  }

  const parsed = result.json as CatalogCartResponse;
  if (parsed.errors?.length) {
    res.status(502).json({
      error: parsed.errors.map((e) => e.message ?? "Unknown error").join("; "),
    });
    return;
  }

  const rows = parsed.data?.createCart?.cart?.availableCategories;
  if (!rows?.length) {
    res.status(502).json({ error: "Boulevard returned no categories for this location" });
    return;
  }

  const catalog = mapAvailableCategoriesToCatalog(rows as AvailableCategoryRow[]);
  if (catalog.services.length === 0) {
    res.status(502).json({ error: "No bookable services found in Boulevard menu for this location" });
    return;
  }

  res.json(catalog);
};

/** Proxies GraphQL to Boulevard Live using server-side credentials (never sent to the browser). */
export const handleBlvdGraphql: RequestHandler = async (req, res) => {
  const env = getProdBlvdEnv();
  if (!env) {
    res.status(503).json({
      error: "Boulevard production is not configured (need BLVD_PROD_API_KEY, BLVD_PROD_SECRET_KEY, BLVD_PROD_BUSINESS_ID, BLVD_PROD_LOCATION_ID)",
    });
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

  const result = await blvdLiveGraphqlJson(env, query, variables);
  if (result.ok === false) {
    res.status(502).type("application/json").json({ errors: [{ message: result.body }] });
    return;
  }

  res.status(200).type("application/json").send(JSON.stringify(result.json));
};
