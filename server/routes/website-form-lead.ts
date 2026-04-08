import { RequestHandler } from "express";

/**
 * Proxies JSON to n8n so the browser avoids CORS. Set N8N_WEBSITE_FORM_LEAD_URL in .env
 * (e.g. https://n8n.beautyroomsclinic.com/webhook/website-form-lead).
 */
export const handleWebsiteFormLead: RequestHandler = async (req, res) => {
  const url = process.env.N8N_WEBSITE_FORM_LEAD_URL?.trim();
  if (!url) {
    res.status(503).json({
      ok: false,
      message:
        "Lead webhook is not configured. Set N8N_WEBSITE_FORM_LEAD_URL on the server (e.g. your n8n webhook URL).",
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
