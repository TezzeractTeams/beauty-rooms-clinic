/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_HUBSPOT_PORTAL_ID?: string;
  readonly VITE_HUBSPOT_NANO_BROWS_FORM_GUID?: string;
}

interface Window {
  fbq?: (...args: unknown[]) => void;
}
