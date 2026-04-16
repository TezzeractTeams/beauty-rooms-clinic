import { openMainMenuBoulevardBooking } from "@/lib/boulevardBooking";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

/** Matches main service categories + Esthetician (placeholder route) */
export const NAV_SERVICE_LINKS = [
  { label: "Lash", to: "/services/lash" },
  { label: "Head Spa", to: "/services/head-spa" },
  { label: "PMU", to: "/services/pmu" },
  { label: "Esthetician", to: "/services/esthetician" },
] as const;

const BEAUTY_ROOMS_NJ_URL = "https://www.beautyroomsbynj.com/";

const submenuItemClass =
  "block px-4 py-2.5 font-barlow font-normal text-[calc(0.875rem-1pt)] tracking-[0.05em] text-warm-brown/80 transition-colors hover:bg-[#F4F4EF] hover:text-warm-brown";

const Logo = () => (
  <img
    src="/images/Logo.svg"
    alt="Beauty Rooms Clinic"
    className="h-[calc(3rem*0.95)] w-auto md:h-[calc(4.25rem*0.95)] lg:h-[calc(4.1rem*0.95)] select-none origin-center scale-[1.18] md:scale-[1.3] md:mb-2"
  />
);

const ChevronDownIcon = () => (
  <svg width="7" height="4" viewBox="0 0 7 4" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3.29806 3.91279L0 0.614729L0.614729 0L3.29806 2.68333L5.9814 0L6.59612 0.614729L3.29806 3.91279V3.91279" fill="#675C53"/>
  </svg>
);

const MenuIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <line x1="3" y1="6" x2="21" y2="6" stroke="#675C53" strokeWidth="1.5"/>
    <line x1="3" y1="12" x2="21" y2="12" stroke="#675C53" strokeWidth="1.5"/>
    <line x1="3" y1="18" x2="21" y2="18" stroke="#675C53" strokeWidth="1.5"/>
  </svg>
);

const CloseIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <line x1="4" y1="4" x2="20" y2="20" stroke="#675C53" strokeWidth="1.5"/>
    <line x1="20" y1="4" x2="4" y2="20" stroke="#675C53" strokeWidth="1.5"/>
  </svg>
);

interface NavLinkProps {
  to: string;
  label: string;
  hasDropdown?: boolean;
  active?: boolean;
  onClick?: () => void;
}

const NavLink = ({ to, label, hasDropdown, active, onClick }: NavLinkProps) => (
  <Link
    to={to}
    onClick={onClick}
    className={`flex items-center gap-1 pb-1 font-barlow font-normal text-[calc(1.125rem-1pt)] tracking-[0.05em] transition-colors ${
      active
        ? "text-warm-brown border-b-2 border-warm-brown"
        : "text-warm-brown/70 hover:text-warm-brown"
    }`}
  >
    {label}
    {hasDropdown && <ChevronDownIcon />}
  </Link>
);

const navLinkClass =
  "block py-2 font-barlow font-medium text-[calc(0.875rem-1pt)] tracking-[0.05em] text-warm-brown/80 hover:text-warm-brown transition-colors";

export default function Navbar() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  const isServicesActive = location.pathname === "/services" || location.pathname.startsWith("/services/");

  const isProfessionalsActive = location.pathname === "/work-with-us";

  const isAcademyActive = location.pathname === "/academy";

  const isSpecialistsActive = location.pathname === "/experts";

  /** Nano brows launch funnel uses its own booking CTAs; hide global header Book Now here only. */
  const hideHeaderBookNow = location.pathname === "/nano-brows-launch-offer";

  return (
    <header className="w-full overflow-visible bg-[#FAFAF5] border-b border-[rgba(232,232,227,0.50)] sticky top-0 z-50">
      <div className="mx-auto flex w-full max-w-[min(92rem,100%)] items-center justify-between py-6 pl-[max(0.75rem,calc(1.5rem-0.75vw))] pr-6 md:pl-[max(1rem,calc(2.5rem-1vw))] md:pr-10">
        {/* Desktop: nav groups hug the logo; Book Now stays on the far right */}
        <div className="hidden md:flex w-full min-w-0 items-center">
          <nav className="flex min-w-0 flex-1 items-center justify-end md:gap-[5%] pr-3 md:pr-5 lg:pr-6">
            <NavLink to="/" label="Home" active={isActive("/")} />
            <NavLink to="/about" label="About" active={isActive("/about")} />
            <div className="relative group">
              <Link
                to="/services"
                className={`flex items-center gap-1 pb-1 font-barlow font-normal text-[calc(1.125rem-1pt)] tracking-[0.05em] transition-colors ${
                  isServicesActive
                    ? "text-warm-brown border-b-2 border-warm-brown"
                    : "text-warm-brown/70 hover:text-warm-brown"
                }`}
              >
                Services
                <ChevronDownIcon />
              </Link>
              <div
                role="menu"
                className="absolute left-0 top-full z-50 min-w-[220px] hidden group-hover:block pt-1"
              >
                <div className="border border-[rgba(103,92,83,0.12)] bg-[#FAFAF5] py-2 shadow-sm">
                  {NAV_SERVICE_LINKS.map(({ label, to }) => (
                    <Link key={to} to={to} role="menuitem" className={submenuItemClass}>
                      {label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            <NavLink
              to="/experts"
              label="Professionals"
              active={isSpecialistsActive}
            />
          </nav>

          <Link
            to="/"
            className="relative z-10 mx-2 inline-flex shrink-0 items-center justify-center md:mx-3 lg:mx-6"
          >
            <Logo />
          </Link>

          <div className="flex min-w-0 flex-1 items-center justify-between gap-[calc(1.5rem*0.98)] md:gap-[calc(2rem*0.98)] lg:gap-[calc(2.5rem*0.98)] pl-4 md:pl-5 lg:pl-6">
            <nav className="flex shrink-0 items-center gap-[calc(1.25rem*0.98)] md:gap-[calc(1.75rem*0.98)] lg:gap-[calc(2rem*0.98)]">
              <NavLink to="/academy" label="Academy" active={isAcademyActive} />
              <div className="relative group">
                <Link
                  to="/work-with-us"
                  className={`flex items-center gap-1 pb-1 font-barlow font-normal text-[calc(1.125rem-1pt)] tracking-[0.05em] transition-colors ${
                    isProfessionalsActive
                      ? "text-warm-brown border-b-2 border-warm-brown"
                      : "text-warm-brown/70 hover:text-warm-brown"
                  }`}
                >
                  Join our team
                  <ChevronDownIcon />
                </Link>
                <div
                  role="menu"
                  className="absolute right-0 top-full z-50 min-w-[220px] hidden group-hover:block pt-1"
                >
                  <div className="border border-[rgba(103,92,83,0.12)] bg-[#FAFAF5] py-2 shadow-sm">
                    <Link to="/work-with-us" role="menuitem" className={submenuItemClass}>
                      Work with us
                    </Link>
                    <a
                      href={BEAUTY_ROOMS_NJ_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      role="menuitem"
                      className={submenuItemClass}
                    >
                      Beauty Rooms by NJ
                    </a>
                  </div>
                </div>
              </div>
              <NavLink to="/faq" label="FAQ" active={isActive("/faq")} />
              <NavLink to="/contact" label="Contact" active={isActive("/contact")} />
            </nav>
            {!hideHeaderBookNow ? (
              <button
                type="button"
                onClick={() => openMainMenuBoulevardBooking()}
                className="flex items-center px-8 py-5 bg-primary text-primary-foreground font-barlow font-light text-[calc(0.875rem-1pt)] tracking-[0.1em] uppercase hover:bg-primary/90 transition-colors shrink-0"
              >
                Book Now
              </button>
            ) : null}
          </div>
        </div>

        <Link
          to="/"
          className="relative z-10 flex-shrink-0 md:hidden inline-flex items-center justify-center"
        >
          <Logo />
        </Link>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div className="mx-auto flex w-full max-w-[min(92rem,100%)] flex-col gap-[calc(1.5rem*0.98)] border-t border-[rgba(232,232,227,0.50)] bg-[#FAFAF5] py-6 pl-[max(0.75rem,calc(1.5rem-0.75vw))] pr-6 md:pl-[max(1rem,calc(2.5rem-1vw))] md:pr-10">
          <NavLink to="/" label="Home" active={isActive("/")} onClick={() => setMobileOpen(false)} />
          <NavLink to="/about" label="About" active={isActive("/about")} onClick={() => setMobileOpen(false)} />
          <div className="flex flex-col gap-2">
            <NavLink
              to="/services"
              label="Services"
              hasDropdown
              active={isServicesActive}
              onClick={() => setMobileOpen(false)}
            />
            <div className="flex flex-col gap-1 border-l border-[rgba(103,92,83,0.2)] pl-4 ml-1">
              {NAV_SERVICE_LINKS.map(({ label, to }) => (
                <Link key={to} to={to} onClick={() => setMobileOpen(false)} className={navLinkClass}>
                  {label}
                </Link>
              ))}
            </div>
          </div>
          <NavLink
            to="/experts"
            label="Specialists"
            active={isSpecialistsActive}
            onClick={() => setMobileOpen(false)}
          />
          <NavLink
            to="/academy"
            label="Academy"
            active={isAcademyActive}
            onClick={() => setMobileOpen(false)}
          />
          <div className="flex flex-col gap-2">
            <NavLink
              to="/work-with-us"
              label="Join our team"
              hasDropdown
              active={isProfessionalsActive}
              onClick={() => setMobileOpen(false)}
            />
            <div className="flex flex-col gap-1 border-l border-[rgba(103,92,83,0.2)] pl-4 ml-1">
              <Link to="/work-with-us" onClick={() => setMobileOpen(false)} className={navLinkClass}>
                Work with us
              </Link>
              <a
                href={BEAUTY_ROOMS_NJ_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileOpen(false)}
                className={navLinkClass}
              >
                Beauty Rooms by NJ
              </a>
            </div>
          </div>
          <NavLink to="/faq" label="Faq" active={isActive("/faq")} onClick={() => setMobileOpen(false)} />
          <NavLink to="/contact" label="Contact" active={isActive("/contact")} onClick={() => setMobileOpen(false)} />
          {!hideHeaderBookNow ? (
            <button
              type="button"
              onClick={() => {
                setMobileOpen(false);
                openMainMenuBoulevardBooking();
              }}
              className="flex w-full items-center justify-center px-8 py-4 bg-primary text-primary-foreground font-barlow font-light text-[calc(0.875rem-1pt)] tracking-[0.1em] uppercase hover:bg-primary/90 transition-colors"
            >
              Book Now
            </button>
          ) : null}
        </div>
      )}
    </header>
  );
}
