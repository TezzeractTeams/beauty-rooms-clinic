import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, AtSign, Globe, Phone } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const SOCIAL = {
  instagram: "https://www.instagram.com/",
  facebook: "https://www.facebook.com/",
  linkedin: "https://www.linkedin.com/",
} as const;

const iconLinkClass =
  "inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#888888]/50 text-[#FAFAF5CC] transition-colors hover:border-[#FAFAF5]/40 hover:bg-white/5 hover:text-[#FAFAF5] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FAFAF5]";

const footerLinkClass =
  "font-barlow font-light text-sm text-[#FAFAF5CC] transition-colors hover:text-[#FAFAF5] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FAFAF5]";

const sectionHeadingClass =
  "font-barlow text-[11px] tracking-[0.12em] uppercase text-[#888888] mb-4";

export default function Footer() {
  const year = new Date().getFullYear();
  const [email, setEmail] = useState("");

  const handleNewsletter = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email.trim()) {
      toast.error("Please enter your email address.");
      return;
    }
    toast.success("Thank you for subscribing.");
    setEmail("");
  };

  return (
    <footer className="w-full bg-primary text-[#D1D1D1] font-barlow">
      <div className="px-6 md:px-10 pt-16 pb-16 md:pt-40 md:pb-20 max-w-[90%] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-10">
          <div className="lg:col-span-4">
            <Link to="/" className="inline-block mb-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FAFAF5] rounded-sm">
              <img
                src="/images/image.webp"
                alt="Beauty Rooms by NJ"
                className="h-12 w-auto md:h-14 max-w-[220px] object-contain object-left"
              />
            </Link>
            <p className="font-barlow font-light text-sm leading-relaxed text-[#FAFAF5CC]/90 max-w-md mb-6">
              A boutique sanctuary dedicated to modern aesthetics and timeless beauty. We combine expert
              clinical skill with a luxury spa experience.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/" className={iconLinkClass} aria-label="Website home">
                <Globe className="h-4 w-4" strokeWidth={1.5} />
              </Link>
              <a href="mailto:hello@beautyroomsclinic.com" className={iconLinkClass} aria-label="Email us">
                <AtSign className="h-4 w-4" strokeWidth={1.5} />
              </a>
              <a href="tel:+19415551234" className={iconLinkClass} aria-label="Call us">
                <Phone className="h-4 w-4" strokeWidth={1.5} />
              </a>
            </div>
          </div>

          <nav className="lg:col-span-2" aria-labelledby="footer-treatments">
            <h3 id="footer-treatments" className={sectionHeadingClass}>
              Treatments
            </h3>
            <ul className="flex flex-col gap-3">
              <li>
                <Link to="/services" className={footerLinkClass}>
                  Permanent Makeup
                </Link>
              </li>
              <li>
                <Link to="/services" className={footerLinkClass}>
                  Lash Services
                </Link>
              </li>
              <li>
                <Link to="/services" className={footerLinkClass}>
                  Skin Treatments
                </Link>
              </li>
            </ul>
          </nav>

          <nav className="lg:col-span-2" aria-labelledby="footer-company">
            <h3 id="footer-company" className={sectionHeadingClass}>
              Company
            </h3>
            <ul className="flex flex-col gap-3">
              <li>
                <Link to="/about" className={footerLinkClass}>
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/bookings" className={footerLinkClass}>
                  Bookings
                </Link>
              </li>
              <li>
                <Link to="/faq" className={footerLinkClass}>
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/privacy" className={footerLinkClass}>
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className={footerLinkClass}>
                  Terms of Service
                </Link>
              </li>
            </ul>
          </nav>

          <div className="lg:col-span-4 ">
            <h3 className={sectionHeadingClass}>Newsletter</h3>
            <form onSubmit={handleNewsletter} className="mb-6">
              <div className="flex items-end gap-2 border-b border-[#888888]/80 pb-2 focus-within:border-[#D1D1D1]/60 transition-colors">
                <label htmlFor="footer-newsletter-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="footer-newsletter-email"
                  type="email"
                  name="email"
                  autoComplete="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={cn(
                    "flex-1 min-w-0 bg-transparent border-0 p-0 font-barlow font-light text-sm text-[#D1D1D1]",
                    "placeholder:text-[#888888] focus:outline-none focus:ring-0",
                  )}
                />
                <button
                  type="submit"
                  className="shrink-0 p-1 text-[#FAFAF5CC] hover:text-[#FAFAF5] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FAFAF5]"
                  aria-label="Subscribe to newsletter"
                >
                  <ArrowRight className="h-5 w-5" strokeWidth={1.5} />
                </button>
              </div>
            </form>
            <p className="font-barlow text-[10px] md:text-[11px] tracking-[0.08em] uppercase text-[#888888]/90">
              © {year} Beauty Rooms by NJ. All rights reserved.
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10" />

      <div className="px-6 md:px-10 py-6 md:py-8 max-w-[90%] mx-auto">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-barlow text-[10px] md:text-[11px] tracking-[0.08em] uppercase text-[#888888]">
            © {year} Beauty Rooms Clinic. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-6 sm:gap-8">
            <a
              href={SOCIAL.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="font-barlow text-[10px] md:text-[11px] tracking-[0.1em] uppercase text-[#FAFAF5CC] hover:text-[#FAFAF5] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FAFAF5]"
            >
              Instagram
            </a>
            <a
              href={SOCIAL.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="font-barlow text-[10px] md:text-[11px] tracking-[0.1em] uppercase text-[#FAFAF5CC] hover:text-[#FAFAF5] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FAFAF5]"
            >
              Facebook
            </a>
            <a
              href={SOCIAL.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="font-barlow text-[10px] md:text-[11px] tracking-[0.1em] uppercase text-[#FAFAF5CC] hover:text-[#FAFAF5] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FAFAF5]"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
