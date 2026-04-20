/** Contact step POSTs to n8n via server proxy; eligibility steps stay client-only. */
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
};

export type HeadSpaFormLeadPayload = {
  source: string;
  form: "head_spa_detox";
  step: "contact";
  pageUri: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  consent: boolean;
  providerSlug: string;
  serviceName: string;
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
