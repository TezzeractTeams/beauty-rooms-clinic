import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { GA_MEASUREMENT_ID } from "@/lib/loadOptionalAnalytics";

/**
 * Sends a page_view on client-side route changes. The first view is handled when optional analytics load.
 */
export function GoogleAnalytics() {
  const { pathname, search } = useLocation();
  const isFirstRoute = useRef(true);

  useEffect(() => {
    if (isFirstRoute.current) {
      isFirstRoute.current = false;
      return;
    }
    if (typeof window.gtag !== "function") return;
    window.gtag("config", GA_MEASUREMENT_ID, {
      page_path: pathname + search,
    });
  }, [pathname, search]);

  return null;
}
