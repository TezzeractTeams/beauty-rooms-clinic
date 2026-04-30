import "./global.css";

import { useEffect, useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { LeadAttributionSync } from "@/components/LeadAttributionSync";
import { ScrollToTop } from "@/components/ScrollToTop";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import { MetaPixel } from "@/components/MetaPixel";
import { CookieConsentBanner } from "@/components/CookieConsentBanner";
import { getStoredConsent, setStoredConsent, type CookieConsentChoice } from "@/lib/cookieConsent";
import { loadOptionalAnalytics } from "@/lib/loadOptionalAnalytics";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Placeholder from "./pages/Placeholder";
import NotFound from "./pages/NotFound";
import ServiceCategoryDetail from "./pages/ServiceCategoryDetail";
import Services from "./pages/Services";
import WorkWithUs from "./pages/WorkWithUs";
import Specialists from "./pages/Specialists";
import ComingSoon from "./pages/ComingSoon";
import Faq from "./pages/Faq";
import Privacy from "./pages/Privacy";
import CancellationPolicy from "./pages/CancellationPolicy";
import LuxeLookLashOffer from "./pages/LuxeLookLashOffer";
import NanoBrowsSpecial from "./pages/NanoBrowsSpecial";
import LipBlushSpecialLaunchOffer from "./pages/LipBlushSpecialLaunchOffer";
import MicroneedlingSpecial from "./pages/MicroneedlingSpecial";
import Academy from "./pages/Academy";
import HeadSpaDetoxExperience from "./pages/HeadSpaDetoxExperience";
import MothersDayHeadSpa from "./pages/MothersDayHeadSpa";
import LashesLaunchOffer from "./pages/LashesLaunchOffer";
import Booking from "./pages/Booking";

const queryClient = new QueryClient();

// Coming soon: only the ComingSoon catch-all route is active below.
// To launch: delete the <Route path="*" element={<ComingSoon />} /> line, then
// remove the "{/*" line and the "*/" line that wrap the full route list.
function App() {
  const [consent, setConsent] = useState<CookieConsentChoice | null>(() => getStoredConsent());
  const [analyticsReady, setAnalyticsReady] = useState(false);

  useEffect(() => {
    if (consent !== "all") {
      setAnalyticsReady(false);
      return;
    }
    let cancelled = false;
    loadOptionalAnalytics()
      .then(() => {
        if (!cancelled) setAnalyticsReady(true);
      })
      .catch(() => {
        if (!cancelled) setAnalyticsReady(false);
      });
    return () => {
      cancelled = true;
    };
  }, [consent]);

  const handleCookieChoice = (choice: CookieConsentChoice) => {
    setStoredConsent(choice);
    setConsent(choice);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <LeadAttributionSync />
          {consent === null ? <CookieConsentBanner onChoose={handleCookieChoice} /> : null}
          {consent === "all" && analyticsReady ? (
            <>
              <GoogleAnalytics />
              <MetaPixel />
            </>
          ) : null}
          <Routes>
            {/*<Route path="*" element={<ComingSoon />} />*/}

            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/faq" element={<Faq />} />
            <Route path="/services/esthetician" element={<Placeholder title="Esthetician Services" />} />
            <Route path="/services/:slug" element={<ServiceCategoryDetail />} />
            <Route path="/services" element={<Services />} />
            <Route path="/experts" element={<Specialists />} />
            <Route
              path="/bookings"
              element={<Navigate to={{ pathname: "/", hash: "book-now" }} replace />}
            />
            <Route path="/booking" element={<Booking />} />
            <Route path="/blog" element={<Placeholder title="Our Blog" />} />
            <Route path="/gallery" element={<Placeholder title="Results Gallery" />} />
            <Route path="/work-with-us" element={<WorkWithUs />} />
            <Route path="/careers" element={<Navigate to="/work-with-us" replace />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/cancellation-policy" element={<CancellationPolicy />} />
            <Route path="/luxe-look-lash-offer" element={<LuxeLookLashOffer />} />
            <Route path="/lashes-launch-offer" element={<LashesLaunchOffer />} />
            <Route path="/nano-brows-launch-offer" element={<NanoBrowsSpecial />} />
            <Route path="/Head-Spa-Detox-Experience" element={<HeadSpaDetoxExperience />} />
            <Route path="/mothers-day-head-spa" element={<MothersDayHeadSpa />} />
            <Route path="/nano-brows-special" element={<Navigate to="/nano-brows-launch-offer" replace />} />
            <Route path="/lip-blush-special-launch-offer" element={<LipBlushSpecialLaunchOffer />} />
            <Route path="/microneedling-special" element={<MicroneedlingSpecial />} />
            <Route path="/terms" element={<Placeholder title="Terms of Service" />} />
            <Route path="/academy" element={<Academy />} />
            <Route path="/coming-soon" element={<ComingSoon />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

createRoot(document.getElementById("root")!).render(<App />);
