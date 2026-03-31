import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Restores scroll to top on client-side navigation (BrowserRouter does not do this by default).
 */
export function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
