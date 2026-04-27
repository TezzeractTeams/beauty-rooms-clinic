import { describe, it, expect } from "vitest";
import {
  applyLeadAttributionSync,
  deriveLeadChannel,
  hasMarketingInParsed,
  parseMarketingFromHref,
  snapshotFromStored,
} from "./leadAttribution";

const THIRTY_DAYS_MS = 30 * 24 * 60 * 60 * 1000;

describe("parseMarketingFromHref", () => {
  it("reads UTMs and click ids", () => {
    const href =
      "https://site.com/offer?utm_source=google&utm_medium=cpc&utm_campaign=spring&gclid=abc&fbclid=xyz&msclkid=m1";
    expect(parseMarketingFromHref(href)).toEqual({
      utm_source: "google",
      utm_medium: "cpc",
      utm_campaign: "spring",
      gclid: "abc",
      fbclid: "xyz",
      msclkid: "m1",
    });
  });

  it("ignores empty params", () => {
    expect(parseMarketingFromHref("https://x.com/?utm_source=&utm_medium=email")).toEqual({
      utm_medium: "email",
    });
  });
});

describe("hasMarketingInParsed", () => {
  it("is false for empty object", () => {
    expect(hasMarketingInParsed({})).toBe(false);
  });
});

describe("applyLeadAttributionSync", () => {
  it("creates first-touch landing and referrer when no previous row", () => {
    const now = 1_700_000_000_000;
    const next = applyLeadAttributionSync({
      now,
      currentHref: "https://example.com/nano?utm_source=meta&utm_medium=paid",
      documentReferrer: "https://google.com/",
      previous: null,
    });
    expect(next.landing_page).toBe("https://example.com/nano?utm_source=meta&utm_medium=paid");
    expect(next.entry_referrer).toBe("https://google.com/");
    expect(next.utm_source).toBe("meta");
    expect(next.utm_medium).toBe("paid");
    expect(next.expiresAt).toBe(now + THIRTY_DAYS_MS);
  });

  it("merges new UTMs from URL without clearing untouched keys", () => {
    const now = 1_700_000_000_000;
    const previous = applyLeadAttributionSync({
      now,
      currentHref: "https://example.com/a?utm_source=oldsrc&utm_campaign=keep-me",
      documentReferrer: "",
      previous: null,
    });
    const later = now + 60_000;
    const next = applyLeadAttributionSync({
      now: later,
      currentHref: "https://example.com/b?utm_medium=cpc",
      documentReferrer: "",
      previous,
    });
    expect(next.landing_page).toBe(previous.landing_page);
    expect(next.utm_source).toBe("oldsrc");
    expect(next.utm_campaign).toBe("keep-me");
    expect(next.utm_medium).toBe("cpc");
    expect(next.expiresAt).toBe(later + THIRTY_DAYS_MS);
  });

  it("does not extend TTL when URL has no marketing params", () => {
    const now = 1_700_000_000_000;
    const previous = applyLeadAttributionSync({
      now,
      currentHref: "https://example.com/a?utm_source=newsletter",
      documentReferrer: "",
      previous: null,
    });
    const exp = previous.expiresAt;
    const next = applyLeadAttributionSync({
      now: now + 1000,
      currentHref: "https://example.com/b",
      documentReferrer: "",
      previous,
    });
    expect(next.utm_source).toBe("newsletter");
    expect(next.expiresAt).toBe(exp);
  });

  it("re-seeds when previous row expired", () => {
    const t0 = 1_700_000_000_000;
    const expired = applyLeadAttributionSync({
      now: t0,
      currentHref: "https://example.com/old?utm_source=old",
      documentReferrer: "https://x.com",
      previous: null,
    });
    const t1 = expired.expiresAt + 1;
    const next = applyLeadAttributionSync({
      now: t1,
      currentHref: "https://example.com/new-page",
      documentReferrer: "",
      previous: expired,
    });
    expect(next.landing_page).toBe("https://example.com/new-page");
    expect(next.entry_referrer).toBe("");
    expect(next.utm_source).toBeNull();
    expect(next.expiresAt).toBe(t1 + THIRTY_DAYS_MS);
  });
});

describe("deriveLeadChannel", () => {
  const origin = "https://beauty.example";

  it("classifies gclid as google_ads", () => {
    expect(
      deriveLeadChannel(
        {
          ...emptyM(),
          gclid: "x",
          entry_referrer: "",
        },
        origin,
      ),
    ).toBe("google_ads");
  });

  it("classifies fbclid as facebook_ads", () => {
    expect(
      deriveLeadChannel(
        {
          ...emptyM(),
          fbclid: "x",
          entry_referrer: "",
        },
        origin,
      ),
    ).toBe("facebook_ads");
  });

  it("classifies search referrer without paid as organic", () => {
    expect(
      deriveLeadChannel(
        {
          ...emptyM(),
          entry_referrer: "https://www.google.com/url?q=foo",
        },
        origin,
      ),
    ).toBe("organic");
  });

  it("classifies non-search external referrer as referral", () => {
    expect(
      deriveLeadChannel(
        {
          ...emptyM(),
          entry_referrer: "https://partner-blog.com/article",
        },
        origin,
      ),
    ).toBe("referral");
  });

  it("classifies empty referrer as direct", () => {
    expect(deriveLeadChannel({ ...emptyM(), entry_referrer: "" }, origin)).toBe("direct");
  });
});

function emptyM() {
  return {
    utm_source: null as string | null,
    utm_medium: null as string | null,
    utm_campaign: null as string | null,
    utm_term: null as string | null,
    utm_content: null as string | null,
    gclid: null as string | null,
    fbclid: null as string | null,
    msclkid: null as string | null,
  };
}

describe("snapshotFromStored", () => {
  it("includes lead_channel", () => {
    const now = 1_700_000_000_000;
    const stored = applyLeadAttributionSync({
      now,
      currentHref: "https://beauty.example/l?utm_source=google&utm_medium=cpc",
      documentReferrer: "",
      previous: null,
    });
    const snap = snapshotFromStored(stored, "https://beauty.example");
    expect(snap.lead_channel).toBe("google_ads");
    expect(snap.landing_page).toBe(stored.landing_page);
  });
});
