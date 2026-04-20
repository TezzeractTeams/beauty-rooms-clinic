import { RequestHandler } from "express";

/**
 * Proxies JSON to n8n so the browser avoids CORS.
 * - N8N_WEBSITE_FORM_LEAD_URL — general / nano brows wizard
 * - N8N_WEBSITE_HEADSPA_FORM_LEAD_URL — Head Spa Detox landing form
 */
export function createN8nFormLeadHandler(envKey: string, missingMessage: string): RequestHandler {
  return async (req, res) => {
    const url = process.env[envKey]?.trim();
    if (!url) {
      res.status(503).json({
        ok: false,
        message: missingMessage,
      });
      return;
    }

    if (!req.body || typeof req.body !== "object" || Array.isArray(req.body)) {
      res.status(400).json({ ok: false, message: "Expected a JSON object body." });
      return;
    }

    try {
      const upstream = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(req.body),
      });

      if (!upstream.ok) {
        const text = await upstream.text();
        let message = "The lead service returned an error. Please try again later.";
        if (text && text.length < 500) {
          try {
            const j = JSON.parse(text) as { message?: string };
            if (j.message) message = j.message;
          } catch {
            const trimmed = text.trim();
            if (trimmed) message = trimmed;
          }
        }
        res.status(upstream.status >= 400 && upstream.status < 600 ? upstream.status : 502).json({
          ok: false,
          message,
        });
        return;
      }

      res.status(200).json({ ok: true });
    } catch {
      res.status(502).json({
        ok: false,
        message: "Could not reach the lead service. Please try again later.",
      });
    }
  };
}

export const handleWebsiteFormLead = createN8nFormLeadHandler(
  "N8N_WEBSITE_FORM_LEAD_URL",
  "Lead webhook is not configured. Set N8N_WEBSITE_FORM_LEAD_URL on the server (e.g. your n8n webhook URL).",
);

export const handleHeadSpaWebsiteFormLead = createN8nFormLeadHandler(
  "N8N_WEBSITE_HEADSPA_FORM_LEAD_URL",
  "Head Spa lead webhook is not configured. Set N8N_WEBSITE_HEADSPA_FORM_LEAD_URL on the server.",
);
