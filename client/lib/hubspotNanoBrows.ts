/**
 * HubSpot Forms API (v3) — create a form in HubSpot with firstname, lastname, email, phone.
 * Set in .env: VITE_HUBSPOT_PORTAL_ID, VITE_HUBSPOT_NANO_BROWS_FORM_GUID
 */
const portalId = import.meta.env.VITE_HUBSPOT_PORTAL_ID as string | undefined;
const formGuid = import.meta.env.VITE_HUBSPOT_NANO_BROWS_FORM_GUID as string | undefined;

export function isHubSpotNanoBrowsConfigured(): boolean {
  return Boolean(portalId?.trim() && formGuid?.trim());
}

export type NanoBrowsLeadPayload = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
};

export async function submitNanoBrowsLead(payload: NanoBrowsLeadPayload): Promise<{ ok: true } | { ok: false; message: string }> {
  if (!portalId?.trim() || !formGuid?.trim()) {
    return {
      ok: false,
      message:
        "This form is not connected yet. Add VITE_HUBSPOT_PORTAL_ID and VITE_HUBSPOT_NANO_BROWS_FORM_GUID to your environment.",
    };
  }

  const body = {
    fields: [
      { name: "firstname", value: payload.firstName.trim() },
      { name: "lastname", value: payload.lastName.trim() },
      { name: "email", value: payload.email.trim() },
      { name: "phone", value: payload.phone.trim() },
    ],
    context: {
      pageUri: window.location.href,
      pageName: "Nano Brows Launch — Beauty Rooms Clinic",
    },
  };

  const res = await fetch(
    `https://api.hsforms.com/submissions/v3/integration/submit/${portalId!.trim()}/${formGuid!.trim()}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    },
  );

  if (!res.ok) {
    let detail = "Something went wrong. Please try again or call us.";
    try {
      const data = (await res.json()) as { message?: string; errors?: { message: string }[] };
      if (data.message) detail = data.message;
      else if (data.errors?.[0]?.message) detail = data.errors[0].message;
    } catch {
      /* ignore */
    }
    return { ok: false, message: detail };
  }

  return { ok: true };
}
