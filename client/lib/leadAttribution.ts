const STORAGE_KEY = "brc_lead_attribution_v1";
const THIRTY_DAYS_MS = 30 * 24 * 60 * 60 * 1000;

export type LeadChannel = "google_ads" | "facebook_ads" | "organic" | "referral" | "direct";

/** Fields under `attribution` on website form JSON sent to n8n (HubSpot mapping). */
export type LeadFormAttribution = {
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  utm_term: string | null;
  utm_content: string | null;
  gclid: string | null;
  fbclid: string | null;
  msclkid: string | null;
  landing_page: string | null;
  entry_referrer: string | null;
  lead_channel: LeadChannel;
};

type MarketingFields = {
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  utm_term: string | null;
  utm_content: string | null;
  gclid: string | null;
  fbclid: string | null;
  msclkid: string | null;
};

export type LeadAttributionStoredV1 = {
  v: 1;
  expiresAt: number;
  landing_page: string;
  entry_referrer: string;
} & MarketingFields;

const MARKETING_PARAM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "gclid",
  "fbclid",
  "msclkid",
] as const satisfies readonly (keyof MarketingFields)[];

export type ParsedMarketingParams = Partial<Record<(typeof MARKETING_PARAM_KEYS)[number], string>>;

function emptyMarketing(): MarketingFields {
  return {
    utm_source: null,
    utm_medium: null,
    utm_campaign: null,
    utm_term: null,
    utm_content: null,
    gclid: null,
    fbclid: null,
    msclkid: null,
  };
}

/** Parse UTM and ad click ids from a full URL or path+search. */
export function parseMarketingFromHref(href: string): ParsedMarketingParams {
  let url: URL;
  try {
    url = href.startsWith("http") ? new URL(href) : new URL(href, "https://example.com");
  } catch {
    return {};
  }
  const out: ParsedMarketingParams = {};
  for (const key of MARKETING_PARAM_KEYS) {
    const v = url.searchParams.get(key);
    if (v && v.trim()) out[key] = v.trim();
  }
  return out;
}

export function hasMarketingInParsed(parsed: ParsedMarketingParams): boolean {
  return Object.keys(parsed).length > 0;
}

function marketingFromParsed(parsed: ParsedMarketingParams): MarketingFields {
  const base = emptyMarketing();
  for (const key of MARKETING_PARAM_KEYS) {
    const v = parsed[key];
    if (v) base[key] = v;
  }
  return base;
}

function mergeMarketing(prev: MarketingFields, parsed: ParsedMarketingParams): MarketingFields {
  const next: MarketingFields = { ...prev };
  for (const key of MARKETING_PARAM_KEYS) {
    if (parsed[key] !== undefined) next[key] = parsed[key] ?? null;
  }
  return next;
}

function isSearchHostname(hostname: string): boolean {
  const h = hostname.replace(/^www\./i, "").toLowerCase();
  return (
    h.includes("google.") ||
    h === "google.com" ||
    h.endsWith(".google.com") ||
    h.includes("bing.com") ||
    h.includes("duckduckgo.com") ||
    h.includes("yahoo.com") ||
    h.includes("yahoo.co") ||
    h.includes("yandex.") ||
    h.includes("baidu.com")
  );
}

function isSearchReferrer(ref: string): boolean {
  try {
    return isSearchHostname(new URL(ref).hostname);
  } catch {
    return false;
  }
}

function referrerHost(ref: string): string | null {
  try {
    return new URL(ref).hostname.replace(/^www\./i, "").toLowerCase();
  } catch {
    return null;
  }
}

function siteHostFromOrigin(origin: string): string | null {
  try {
    return new URL(origin).hostname.replace(/^www\./i, "").toLowerCase();
  } catch {
    return null;
  }
}

/** Derive a coarse channel for n8n / HubSpot (raw UTMs still on the payload). */
export function deriveLeadChannel(record: MarketingFields & { entry_referrer: string }, siteOrigin: string): LeadChannel {
  const s = (record.utm_source ?? "").toLowerCase();
  const m = (record.utm_medium ?? "").toLowerCase();
  const paidMedium = /cpc|ppc|paid|paidsearch|paidsocial|display|cpm/.test(m);

  if (record.gclid) return "google_ads";
  if (record.fbclid) return "facebook_ads";
  if (paidMedium && (s.includes("google") || s === "adwords" || s === "google ads")) return "google_ads";
  if (paidMedium && /facebook|fb|meta|instagram|ig/i.test(s)) return "facebook_ads";

  const ref = record.entry_referrer?.trim() ?? "";
  if (!ref) return "direct";

  if (isSearchReferrer(ref)) return "organic";

  const refHost = referrerHost(ref);
  const siteHost = siteHostFromOrigin(siteOrigin);
  if (refHost && siteHost && refHost === siteHost) return "direct";

  return "referral";
}

function emptySnapshot(): LeadFormAttribution {
  return {
    ...emptyMarketing(),
    landing_page: null,
    entry_referrer: null,
    lead_channel: "direct",
  };
}

function storedToMarketing(s: LeadAttributionStoredV1): MarketingFields & { entry_referrer: string } {
  return {
    utm_source: s.utm_source,
    utm_medium: s.utm_medium,
    utm_campaign: s.utm_campaign,
    utm_term: s.utm_term,
    utm_content: s.utm_content,
    gclid: s.gclid,
    fbclid: s.fbclid,
    msclkid: s.msclkid,
    entry_referrer: s.entry_referrer,
  };
}

export function snapshotFromStored(stored: LeadAttributionStoredV1, siteOrigin: string): LeadFormAttribution {
  const marketing = storedToMarketing(stored);
  return {
    utm_source: marketing.utm_source,
    utm_medium: marketing.utm_medium,
    utm_campaign: marketing.utm_campaign,
    utm_term: marketing.utm_term,
    utm_content: marketing.utm_content,
    gclid: marketing.gclid,
    fbclid: marketing.fbclid,
    msclkid: marketing.msclkid,
    landing_page: stored.landing_page,
    entry_referrer: stored.entry_referrer,
    lead_channel: deriveLeadChannel(marketing, siteOrigin),
  };
}

function readStoredRaw(storage: Storage): unknown {
  try {
    const raw = storage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as unknown;
  } catch {
    return null;
  }
}

function isStoredV1(x: unknown): x is LeadAttributionStoredV1 {
  if (!x || typeof x !== "object") return false;
  const o = x as Record<string, unknown>;
  if (o.v !== 1) return false;
  if (typeof o.expiresAt !== "number") return false;
  if (typeof o.landing_page !== "string") return false;
  if (typeof o.entry_referrer !== "string") return false;
  for (const key of MARKETING_PARAM_KEYS) {
    const v = o[key];
    if (v != null && typeof v !== "string") return false;
  }
  return true;
}

function writeStored(storage: Storage, value: LeadAttributionStoredV1): void {
  try {
    storage.setItem(STORAGE_KEY, JSON.stringify(value));
  } catch {
    /* quota / private mode */
  }
}

/**
 * Compute next persisted state from the current URL and optional previous row.
 * Used by `syncLeadAttributionFromLocation` and Vitest.
 */
export function applyLeadAttributionSync(input: {
  now: number;
  currentHref: string;
  documentReferrer: string;
  previous: LeadAttributionStoredV1 | null;
}): LeadAttributionStoredV1 {
  const { now, currentHref, documentReferrer, previous } = input;
  const parsed = parseMarketingFromHref(currentHref);
  const urlHasMarketing = hasMarketingInParsed(parsed);

  const invalid = !previous || previous.expiresAt <= now || previous.v !== 1;

  if (invalid) {
    const marketing = marketingFromParsed(parsed);
    return {
      v: 1,
      landing_page: currentHref,
      entry_referrer: documentReferrer,
      expiresAt: now + THIRTY_DAYS_MS,
      ...marketing,
    };
  }

  const mergedMarketing = mergeMarketing(
    {
      utm_source: previous.utm_source,
      utm_medium: previous.utm_medium,
      utm_campaign: previous.utm_campaign,
      utm_term: previous.utm_term,
      utm_content: previous.utm_content,
      gclid: previous.gclid,
      fbclid: previous.fbclid,
      msclkid: previous.msclkid,
    },
    parsed,
  );

  const nextExpires = urlHasMarketing ? now + THIRTY_DAYS_MS : previous.expiresAt;

  return {
    v: 1,
    landing_page: previous.landing_page,
    entry_referrer: previous.entry_referrer,
    expiresAt: nextExpires,
    ...mergedMarketing,
  };
}

/** Call on route changes (pathname/search) to refresh stored UTMs and TTL. */
export function syncLeadAttributionFromLocation(fullHref: string, documentReferrer: string): void {
  if (typeof window === "undefined") return;
  const raw = readStoredRaw(window.localStorage);
  const previous = isStoredV1(raw) ? raw : null;
  const next = applyLeadAttributionSync({
    now: Date.now(),
    currentHref: fullHref,
    documentReferrer: documentReferrer,
    previous,
  });
  writeStored(window.localStorage, next);
}

/** Snapshot for form POST body (n8n → HubSpot). Re-syncs first so TTL expiry still re-seeds on submit. */
export function getLeadAttributionSnapshot(): LeadFormAttribution {
  if (typeof window === "undefined") return emptySnapshot();
  syncLeadAttributionFromLocation(window.location.href, document.referrer);
  const raw = readStoredRaw(window.localStorage);
  if (!isStoredV1(raw)) return emptySnapshot();
  if (raw.expiresAt <= Date.now()) return emptySnapshot();
  return snapshotFromStored(raw, window.location.origin);
}
