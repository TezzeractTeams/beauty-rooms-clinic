import type { CookieConsentChoice } from "@/lib/cookieConsent";

/**
 * Aligns with Consent Mode v2 (analytics + ads signals GTM / GA4 tags can enforce).
 * @see https://developers.google.com/tag-platform/security/guides/consent
 */
export function syncGtmConsent(choice: CookieConsentChoice | null): void {
  if (choice === null) return;

  window.dataLayer = window.dataLayer || [];
  const dl = window.dataLayer;

  const params =
    choice === "all"
      ? {
          analytics_storage: "granted",
          ad_storage: "granted",
          ad_user_data: "granted",
          ad_personalization: "granted",
        }
      : {
          analytics_storage: "denied",
          ad_storage: "denied",
          ad_user_data: "denied",
          ad_personalization: "denied",
        };

  (function (command: string, action: string, update: typeof params) {
    dl.push(arguments);
  })("consent", "update", params);
}

/** Matches the inline `gtag` stub in index.html so queued commands stay compatible with gtag.js. */
export function installGtagDataLayerShim(): void {
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    window.dataLayer!.push(arguments);
  };
}
