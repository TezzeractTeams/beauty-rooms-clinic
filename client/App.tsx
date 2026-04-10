import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ScrollToTop } from "@/components/ScrollToTop";
import { MetaPixel } from "@/components/MetaPixel";
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
import BookNow from "./pages/BookNow";
import ComingSoon from "./pages/ComingSoon";
import Faq from "./pages/Faq";
import Privacy from "./pages/Privacy";
import LuxeLookLashOffer from "./pages/LuxeLookLashOffer";
import NanoBrowsSpecial from "./pages/NanoBrowsSpecial";
import LipBlushSpecialLaunchOffer from "./pages/LipBlushSpecialLaunchOffer";
import MicroneedlingSpecial from "./pages/MicroneedlingSpecial";

const queryClient = new QueryClient();

// Coming soon: only the ComingSoon catch-all route is active below.
// To launch: delete the <Route path="*" element={<ComingSoon />} /> line, then
// remove the "{/*" line and the "*/" line that wrap the full route list.
const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <MetaPixel />
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
          <Route path="/bookings" element={<BookNow />} />
          <Route path="/blog" element={<Placeholder title="Our Blog" />} />
          <Route path="/gallery" element={<Placeholder title="Results Gallery" />} />
          <Route path="/work-with-us" element={<WorkWithUs />} />
          <Route path="/careers" element={<Navigate to="/work-with-us" replace />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/luxe-look-lash-offer" element={<LuxeLookLashOffer />} />
          <Route path="/nano-brows-launch-offer" element={<NanoBrowsSpecial />} />
          <Route path="/nano-brows-special" element={<Navigate to="/nano-brows-launch-offer" replace />} />
          <Route path="/lip-blush-special-launch-offer" element={<LipBlushSpecialLaunchOffer />} />
          <Route path="/microneedling-special" element={<MicroneedlingSpecial />} />
          <Route path="/terms" element={<Placeholder title="Terms of Service" />} />
          <Route path="/coming-soon" element={<ComingSoon />} />
          <Route path="*" element={<NotFound />} />
     
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
