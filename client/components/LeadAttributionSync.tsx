import { syncLeadAttributionFromLocation } from "@/lib/leadAttribution";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/** Keeps first-touch landing/referrer and UTM / click ids in localStorage (30d) across SPA navigations. */
export function LeadAttributionSync() {
  const { pathname, search } = useLocation();

  useEffect(() => {
    syncLeadAttributionFromLocation(window.location.href, document.referrer);
  }, [pathname, search]);

  return null;
}
