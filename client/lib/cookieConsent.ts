export type CookieConsentChoice = "essential" | "all";

const STORAGE_KEY = "brc_cookie_consent";

export function getStoredConsent(): CookieConsentChoice | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw === "essential" || raw === "all") return raw;
    return null;
  } catch {
    return null;
  }
}

export function setStoredConsent(value: CookieConsentChoice): void {
  try {
    localStorage.setItem(STORAGE_KEY, value);
  } catch {
    // ignore quota / private mode
  }
}
