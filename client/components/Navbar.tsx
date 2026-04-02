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
  "block px-4 py-2.5 font-barlow font-light text-xs tracking-[0.08em] uppercase text-warm-brown/80 transition-colors hover:bg-[#F4F4EF] hover:text-warm-brown";

const Logo = () => (
  <img
    src="/images/Logo.svg"
    alt="Beauty Rooms Clinic"
    className="h-12 w-auto md:h-[4.25rem] lg:h-[4.1rem] select-none"
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
    className={`flex items-center gap-1 pb-1 font-barlow font-light text-xs tracking-[0.1em] uppercase transition-colors ${
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
  "block py-2 font-barlow font-light text-xs tracking-[0.08em] uppercase text-warm-brown/80 hover:text-warm-brown transition-colors";

export default function Navbar() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  const isServicesActive = location.pathname === "/services" || location.pathname.startsWith("/services/");

  const isSpecialistsActive = location.pathname === "/experts";

  const isProfessionalsActive = location.pathname === "/work-with-us";

  return (
    <header className="w-full bg-[#FAFAF5] border-b border-[rgba(232,232,227,0.50)] sticky top-0 z-50">
      <div className="flex items-center justify-between px-6 md:px-10 py-6">
        {/* Logo */}
        <Link to="/" className="flex-shrink-0">
          <Logo />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 lg:gap-10">
          <NavLink to="/" label="Home" active={isActive("/")} />
          <NavLink to="/about" label="About us" active={isActive("/about")} />
          <div className="relative group">
            <Link
              to="/services"
              className={`flex items-center gap-1 pb-1 font-barlow font-light text-xs tracking-[0.1em] uppercase transition-colors ${
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
          <NavLink to="/experts" label="Specialists" active={isSpecialistsActive} />
          <div className="relative group">
            <Link
              to="/work-with-us"
              className={`flex items-center gap-1 pb-1 font-barlow font-light text-xs tracking-[0.1em] uppercase transition-colors ${
                isProfessionalsActive
                  ? "text-warm-brown border-b-2 border-warm-brown"
                  : "text-warm-brown/70 hover:text-warm-brown"
              }`}
            >
              JOIN OUR TEAM
              <ChevronDownIcon />
            </Link>
            <div
              role="menu"
              className="absolute left-0 top-full z-50 min-w-[220px] hidden group-hover:block pt-1"
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
          <NavLink to="/contact" label="Contact us" active={isActive("/contact")} />
        </nav>

        {/* Book Now Button */}
        <Link
          to="/bookings"
          className="hidden md:flex items-center px-8 py-5 bg-primary text-primary-foreground font-barlow font-light text-xs tracking-[0.1em] uppercase hover:bg-primary/90 transition-colors"
        >
          Book Now
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
        <div className="md:hidden bg-[#FAFAF5] border-t border-[rgba(232,232,227,0.50)] px-6 py-6 flex flex-col gap-6">
          <NavLink to="/" label="Home" active={isActive("/")} onClick={() => setMobileOpen(false)} />
          <NavLink to="/about" label="About us" active={isActive("/about")} onClick={() => setMobileOpen(false)} />
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
          <NavLink to="/experts" label="Specialists" active={isSpecialistsActive} onClick={() => setMobileOpen(false)} />
          <div className="flex flex-col gap-2">
            <NavLink
              to="/work-with-us"
              label="JOIN OUR TEAM"
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
          <NavLink to="/faq" label="FAQ" active={isActive("/faq")} onClick={() => setMobileOpen(false)} />
          <NavLink to="/contact" label="Contact us" active={isActive("/contact")} onClick={() => setMobileOpen(false)} />
          <Link
            to="/bookings"
            onClick={() => setMobileOpen(false)}
            className="flex items-center justify-center px-8 py-4 bg-primary text-primary-foreground font-barlow font-light text-xs tracking-[0.1em] uppercase hover:bg-primary/90 transition-colors"
          >
            Book Now
          </Link>
        </div>
      )}
    </header>
  );
}
