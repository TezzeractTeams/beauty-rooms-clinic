export const GA_MEASUREMENT_ID = "G-PRYKX5EC9S";
export const META_PIXEL_ID = "1427234232487835";

let loadPromise: Promise<void> | null = null;
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
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag(...args: unknown[]) {
    window.dataLayer!.push(args);
  };
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

/**
 * Loads Google Analytics and Meta Pixel once. Safe to call multiple times.
 */
export function loadOptionalAnalytics(): Promise<void> {
  if (loadPromise) return loadPromise;
  loadPromise = (async () => {
    await ensureGoogleTag();
    ensureMetaPixel();
  })();
  return loadPromise;
}
