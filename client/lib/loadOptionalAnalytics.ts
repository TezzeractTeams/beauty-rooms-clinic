import { installGtagDataLayerShim } from "@/lib/gtmConsent";

export const GA_MEASUREMENT_ID = "G-PRYKX5EC9S";
export const META_PIXEL_ID = "1427234232487835";
export const CLARITY_PROJECT_ID = "wnuhyca72l";

let gaLoadPromise: Promise<void> | null = null;
let marketingLoadPromise: Promise<void> | null = null;
let googleInited = false;
let metaInited = false;

function loadScript(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const el = document.createElement("script");
    el.async = true;
    el.src = src;
    el.onload = () => resolve();
    el.onerror = () => reject(new Error(`Failed to load script: ${src}`));
    document.head.appendChild(el);
  });
}

async function ensureGoogleTag(): Promise<void> {
  if (googleInited) return;
  installGtagDataLayerShim();
  await loadScript(
    `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA_MEASUREMENT_ID)}`,
  );
  window.gtag!("js", new Date());
  window.gtag!("config", GA_MEASUREMENT_ID, {
    page_path: window.location.pathname + window.location.search,
  });
  googleInited = true;
}

/** Matches the Meta Pixel bootstrap previously in index.html. */
function ensureMetaPixelBase(): void {
  const root = window as Window & {
    fbq?: (...args: unknown[]) => void;
    _fbq?: unknown;
  };
  if (root.fbq) return;

  (function (
    f: typeof root,
    b: Document,
    e: string,
    v: string,
    n?: unknown,
    t?: HTMLScriptElement,
    s?: Element | null,
  ) {
    if (f.fbq) return;
    const fbqImpl = function (this: unknown) {
      const self = fbqImpl as unknown as {
        callMethod?: (...args: unknown[]) => void;
        queue: IArguments[];
      };
      if (self.callMethod) {
        return self.callMethod.apply(fbqImpl, arguments as unknown as unknown[]);
      }
      return self.queue.push(arguments);
    } as typeof f.fbq & {
      callMethod?: (...args: unknown[]) => void;
      queue: IArguments[];
      push: typeof fbqImpl;
      loaded: boolean;
      version: string;
    };
    n = f.fbq = fbqImpl as typeof f.fbq;
    if (!f._fbq) f._fbq = n;
    fbqImpl.push = fbqImpl;
    fbqImpl.loaded = true;
    fbqImpl.version = "2.0";
    fbqImpl.queue = [];
    t = b.createElement(e) as HTMLScriptElement;
    t.async = true;
    t.src = v;
    s = b.getElementsByTagName(e)[0];
    s!.parentNode!.insertBefore(t, s);
  })(root, document, "script", "https://connect.facebook.net/en_US/fbevents.js");
}

function ensureMetaPixel(): void {
  if (metaInited) return;
  ensureMetaPixelBase();
  window.fbq!("init", META_PIXEL_ID);
  window.fbq!("track", "PageView");
  metaInited = true;
}

let clarityInited = false;

/** Same bootstrap as the former index.html snippet; runs only after marketing consent. */
function ensureClarity(): void {
  if (clarityInited) return;
  clarityInited = true;

  (function (
    c: Window,
    l: Document,
    a: string,
    r: string,
    i: string,
    t?: HTMLScriptElement,
    y?: Element | null,
  ) {
    // Clarity stub mirrors https://learn.microsoft.com/en-us/clarity/setup-and-installation/clarity-api
    const w = c as Window & Record<string, { q?: IArguments[] } & ((...args: unknown[]) => void)>;
    w[a] =
      w[a] ||
      function (this: unknown) {
        (w[a].q = w[a].q || []).push(arguments);
      };
    t = l.createElement(r) as HTMLScriptElement;
    t.async = true;
    t.src = "https://www.clarity.ms/tag/" + i;
    y = l.getElementsByTagName(r)[0];
    y!.parentNode!.insertBefore(t, y);
  })(window, document, "clarity", "script", CLARITY_PROJECT_ID);
}

/**
 * Loads Google Analytics for everyone (respects Consent Mode signals for cookieless vs full tracking).
 * Safe to call multiple times.
 */
export function loadGoogleAnalytics(): Promise<void> {
  if (gaLoadPromise) return gaLoadPromise;
  gaLoadPromise = (async () => {
    try {
      await ensureGoogleTag();
    } catch (err) {
      gaLoadPromise = null;
      throw err;
    }
  })();
  return gaLoadPromise;
}

/**
 * Loads Meta Pixel and Microsoft Clarity after the user accepts marketing cookies.
 * Safe to call multiple times.
 */
export function loadMarketingAnalytics(): Promise<void> {
  if (marketingLoadPromise) return marketingLoadPromise;
  marketingLoadPromise = (async () => {
    try {
      ensureMetaPixel();
      ensureClarity();
    } catch (err) {
      marketingLoadPromise = null;
      throw err;
    }
  })();
  return marketingLoadPromise;
}
