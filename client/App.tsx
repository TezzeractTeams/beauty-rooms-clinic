import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ScrollToTop } from "@/components/ScrollToTop";
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

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/services/esthetician" element={<Placeholder title="Esthetician Services" />} />
          <Route path="/services/:slug" element={<ServiceCategoryDetail />} />
          <Route path="/services" element={<Services />} />
          <Route path="/experts" element={<Specialists />} />
          <Route path="/bookings" element={<Placeholder title="Book an Appointment" />} />
          <Route path="/blog" element={<Placeholder title="Our Blog" />} />
          <Route path="/work-with-us" element={<WorkWithUs />} />
          <Route path="/careers" element={<Navigate to="/work-with-us" replace />} />
          <Route path="/privacy" element={<Placeholder title="Privacy Policy" />} />
          <Route path="/terms" element={<Placeholder title="Terms of Service" />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
