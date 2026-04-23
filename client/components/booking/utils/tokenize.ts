const TOKENIZE_URL = "https://pci.boulevard.app/cards/tokenize";

export interface CardData {
  name: string;
  number: string;
  cvv: string;
  exp_month: string;
  exp_year: string;
  postal_code: string;
}

/** Vault expects 2-digit year (e.g. 28) and numeric month/year per working Postman payload. */
function normalizeExpYear(expYear: string): number {
  const digits = expYear.replace(/\D/g, "");
  const n = parseInt(digits, 10);
  if (Number.isNaN(n)) return 0;
  return n > 100 ? n % 100 : n;
}

export async function tokenizeCard(card: CardData): Promise<string> {
  const expMonth = parseInt(card.exp_month, 10);
  const expYear = normalizeExpYear(card.exp_year);

  const res = await fetch(TOKENIZE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      card: {
        name: card.name.trim(),
        number: card.number.replace(/\s/g, ""),
        cvv: card.cvv,
        exp_month: expMonth,
        exp_year: expYear,
        address_postal_code: card.postal_code.trim(),
      },
    }),
  });

  if (!res.ok) {
    let detail = "";
    try {
      const errBody = (await res.json()) as { error?: string; message?: string };
      detail = errBody.error ?? errBody.message ?? "";
    } catch {
      /* ignore */
    }
    throw new Error(
      detail || `Card tokenization failed: ${res.status} ${res.statusText}`,
    );
  }

  const json = (await res.json()) as { token?: string; error?: string };

  if (json.error) {
    throw new Error(json.error);
  }

  if (!json.token) {
    throw new Error("Tokenization response missing token");
  }

  return json.token;
}
