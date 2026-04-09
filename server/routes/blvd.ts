import type { RequestHandler } from "express";

const BLVD_CLIENT_BASE = "https://sandbox.joinblvd.com/api/2020-01";

/** Public booking config (location URN) — safe to expose; keys stay server-side. */
export const handleBlvdBookingConfig: RequestHandler = (_req, res) => {
  const locationId = process.env.BLVD_SANDBOX_LOCATION_ID;
  if (!locationId?.trim()) {
    res.status(503).json({ error: "BLVD_SANDBOX_LOCATION_ID is not configured" });
    return;
  }
  res.json({ locationId: locationId.trim() });
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
