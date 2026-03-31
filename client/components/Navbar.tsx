import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Logo = () => (
  <div className="flex flex-col items-center gap-0.5 select-none">
    <span className="font-script text-[26px] leading-none text-charcoal tracking-wide">
      Beauty Rooms
    </span>
    <div className="flex items-center gap-2 w-full">
      <span className="flex-1 h-px bg-charcoal/80" />
      <span className="font-barlow font-light text-[9px] tracking-[0.2em] uppercase text-charcoal">
        Clinic
      </span>
      <span className="flex-1 h-px bg-charcoal/80" />
    </div>
  </div>
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

export default function Navbar() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  const isServicesActive = location.pathname === "/services" || location.pathname.startsWith("/services/");

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
          <NavLink to="/about" label="About" active={isActive("/about")} />
          <NavLink to="/services" label="Services" hasDropdown active={isServicesActive} />
          <NavLink to="/bookings" label="Bookings" active={isActive("/bookings")} />
          <NavLink to="/blog" label="Blog" active={isActive("/blog")} />
          <NavLink to="/careers" label="Careers" active={isActive("/careers")} />
        </nav>

        {/* Book Now Button */}
        <Link
          to="/bookings"
          className="hidden md:flex items-center px-8 py-5 bg-charcoal text-cream font-barlow font-light text-xs tracking-[0.1em] uppercase hover:bg-charcoal/90 transition-colors"
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
          <NavLink to="/about" label="About" active={isActive("/about")} onClick={() => setMobileOpen(false)} />
          <NavLink to="/services" label="Services" hasDropdown active={isServicesActive} onClick={() => setMobileOpen(false)} />
          <NavLink to="/bookings" label="Bookings" active={isActive("/bookings")} onClick={() => setMobileOpen(false)} />
          <NavLink to="/blog" label="Blog" active={isActive("/blog")} onClick={() => setMobileOpen(false)} />
          <NavLink to="/careers" label="Careers" active={isActive("/careers")} onClick={() => setMobileOpen(false)} />
          <Link
            to="/bookings"
            onClick={() => setMobileOpen(false)}
            className="flex items-center justify-center px-8 py-4 bg-charcoal text-cream font-barlow font-light text-xs tracking-[0.1em] uppercase"
          >
            Book Now
          </Link>
        </div>
      )}
    </header>
  );
}
