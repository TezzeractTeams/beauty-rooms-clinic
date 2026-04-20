import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

/**
 * Fires Meta Pixel PageView on client-side route changes. Initial PageView is sent when optional analytics load.
 */
export function MetaPixel() {
  const { pathname, search } = useLocation();
  const isFirstRoute = useRef(true);

  useEffect(() => {
    if (isFirstRoute.current) {
      isFirstRoute.current = false;
      return;
    }
    window.fbq?.("track", "PageView");
  }, [pathname, search]);

  return null;
}
