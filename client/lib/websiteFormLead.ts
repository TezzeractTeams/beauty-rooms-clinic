import type { LeadFormAttribution } from "@/lib/leadAttribution";

/**
 * Contact step POSTs to n8n via server proxy; eligibility steps stay client-only.
 *
 * n8n webhook JSON includes nested `attribution` for HubSpot (contact + deal):
 * - `utm_*`, `gclid`, `fbclid`, `msclkid` — from URL, merged into 30-day localStorage
 * - `landing_page`, `entry_referrer` — first-touch when the stored row was created
 * - `lead_channel` — coarse enum: `google_ads` | `facebook_ads` | `organic` | `referral` | `direct`
 * Top-level `pageUri` is the submit-time URL (may differ from `attribution.landing_page`).
 */
export type WebsiteFormLeadPayload = {
  source: string;
  form: "nano_brows_wizard";
  step: "contact";
  pageUri: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  consent: boolean;
  attribution: LeadFormAttribution;
};

/** Same `attribution` shape as {@link WebsiteFormLeadPayload} for the Head Spa n8n webhook. */
export type HeadSpaFormLeadPayload = {
  source: string;
  form: "head_spa_detox" | "mothers_day_reset";
  step: "contact";
  pageUri: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  consent: boolean;
  providerSlug: string;
  serviceName: string;
  attribution: LeadFormAttribution;
};

async function postFormLead(
  path: "/api/website-form-lead" | "/api/website-headspa-form-lead",
  payload: Record<string, unknown>,
): Promise<{ ok: true } | { ok: false; message: string }> {
  try {
    const res = await fetch(path, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = (await res.json().catch(() => ({}))) as { ok?: boolean; message?: string };

    if (!res.ok || data.ok === false) {
      return {
        ok: false,
        message: typeof data.message === "string" ? data.message : "Something went wrong. Please try again.",
      };
    }

    return { ok: true };
  } catch {
    return { ok: false, message: "Network error. Please check your connection and try again." };
  }
}

export async function submitWebsiteFormLead(
  payload: WebsiteFormLeadPayload,
): Promise<{ ok: true } | { ok: false; message: string }> {
  return postFormLead("/api/website-form-lead", payload);
}

export async function submitHeadSpaFormLead(
  payload: HeadSpaFormLeadPayload,
): Promise<{ ok: true } | { ok: false; message: string }> {
  return postFormLead("/api/website-headspa-form-lead", payload);
}
