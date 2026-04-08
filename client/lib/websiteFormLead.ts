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

export async function submitWebsiteFormLead(
  payload: WebsiteFormLeadPayload,
): Promise<{ ok: true } | { ok: false; message: string }> {
  try {
    const res = await fetch("/api/website-form-lead", {
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
