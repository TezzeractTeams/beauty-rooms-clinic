/** Fire a Meta Pixel custom event (visible under Test events / Custom conversions). */
export function trackMetaPixelCustom(eventName: string, params?: Record<string, unknown>): void {
  window.fbq?.("trackCustom", eventName, params);
}
