import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Phone, ArrowUpRight } from 'lucide-react';
import { BUSINESS_INFO, ROOMS } from '../data/business';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [roomDropdown, setRoomDropdown] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsOpen(false);
    setRoomDropdown(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Furniture', path: '/furniture' },
    { name: 'About', path: '/about' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 bg-canvas/95 backdrop-blur-md ${
        scrolled ? 'border-b border-stone-200 py-3 shadow-subtle' : 'border-b border-stone-100 py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="group flex flex-col">
            <span className="font-serif text-2xl sm:text-3xl font-normal tracking-tight text-charcoal">
              {BUSINESS_INFO.name}
            </span>
            <span className="text-[10px] tracking-widest uppercase text-stone-500 font-mono">
              Lahore, Pakistan
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8 text-sm font-medium text-stone-700">
            <Link
              to="/"
              className={`transition-colors hover:text-charcoal ${
                location.pathname === '/' ? 'text-charcoal font-semibold border-b border-charcoal pb-0.5' : ''
              }`}
            >
              Home
            </Link>

            <Link
              to="/furniture"
              className={`transition-colors hover:text-charcoal ${
                location.pathname === '/furniture' ? 'text-charcoal font-semibold border-b border-charcoal pb-0.5' : ''
              }`}
            >
              Furniture
            </Link>

            {/* Rooms Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setRoomDropdown(true)}
              onMouseLeave={() => setRoomDropdown(false)}
            >
              <button
                className={`flex items-center gap-1 transition-colors hover:text-charcoal py-1 ${
                  location.pathname.startsWith('/rooms') ? 'text-charcoal font-semibold' : ''
                }`}
                aria-expanded={roomDropdown}
              >
                <span>Rooms</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${roomDropdown ? 'rotate-180' : ''}`} />
              </button>

              {roomDropdown && (
                <div className="absolute top-full -left-4 w-60 bg-canvas border border-stone-200 shadow-lift py-2 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                  <div className="px-3 py-1 text-[10px] uppercase font-mono tracking-widest text-stone-400">
                    Explore By Space
                  </div>
                  {ROOMS.slice(0, 4).map((room) => (
                    <Link
                      key={room.id}
                      to={room.path}
                      className="flex items-center justify-between px-3 py-2 text-sm text-stone-800 hover:bg-stone-50 transition-colors"
                    >
                      <span className="flex items-center gap-2">
                        <span className="text-xs font-mono text-stone-400">{room.number}</span>
                        <span>{room.name}</span>
                      </span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-stone-400" />
                    </Link>
                  ))}
                  <div className="border-t border-stone-100 my-1 pt-1">
                    <Link
                      to="/inquiry"
                      className="flex items-center justify-between px-3 py-1.5 text-xs text-stone-600 hover:bg-stone-50 transition-colors"
                    >
                      <span>Custom Room Inquiry</span>
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <Link
              to="/about"
              className={`transition-colors hover:text-charcoal ${
                location.pathname === '/about' ? 'text-charcoal font-semibold border-b border-charcoal pb-0.5' : ''
              }`}
            >
              About
            </Link>

            <Link
              to="/gallery"
              className={`transition-colors hover:text-charcoal ${
                location.pathname === '/gallery' ? 'text-charcoal font-semibold border-b border-charcoal pb-0.5' : ''
              }`}
            >
              Gallery
            </Link>

            <Link
              to="/contact"
              className={`transition-colors hover:text-charcoal ${
                location.pathname === '/contact' ? 'text-charcoal font-semibold border-b border-charcoal pb-0.5' : ''
              }`}
            >
              Contact
            </Link>
          </nav>

          {/* Right Action */}
          <div className="hidden lg:flex items-center space-x-5">
            <a
              href={BUSINESS_INFO.phoneRaw}
              className="flex items-center gap-1.5 text-xs tracking-wide text-stone-600 hover:text-charcoal transition-colors font-mono"
              title="Call Stylish Furniture"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>{BUSINESS_INFO.phone}</span>
            </a>

            <Link
              to="/furniture"
              className="inline-flex items-center px-4 py-2 border border-charcoal text-xs uppercase tracking-widest text-charcoal bg-transparent hover:bg-charcoal hover:text-canvas transition-colors duration-200"
            >
              Explore Furniture
            </Link>
          </div>

          {/* Mobile menu toggle */}
          <div className="flex items-center gap-3 lg:hidden">
            <a
              href={BUSINESS_INFO.phoneRaw}
              className="p-2 text-stone-700 hover:text-charcoal border border-stone-200"
              aria-label="Call store"
            >
              <Phone className="w-4 h-4" />
            </a>
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-charcoal border border-stone-200 hover:bg-stone-50 focus:outline-none"
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="lg:hidden border-b border-stone-200 bg-canvas px-4 pt-4 pb-6 space-y-4 animate-in slide-in-from-top duration-200">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`py-2 text-base font-medium border-b border-stone-100 ${
                  location.pathname === link.path ? 'text-charcoal font-bold' : 'text-stone-700'
                }`}
              >
                {link.name}
              </Link>
            ))}

            <div className="pt-2">
              <div className="text-[11px] font-mono uppercase tracking-widest text-stone-400 mb-2">
                Room Collections
              </div>
              <div className="grid grid-cols-2 gap-2 pl-2">
                {ROOMS.slice(0, 4).map((room) => (
                  <Link
                    key={room.id}
                    to={room.path}
                    className="py-1.5 text-sm text-stone-700 hover:text-charcoal"
                  >
                    {room.name}
                  </Link>
                ))}
              </div>
            </div>

            <div className="pt-4 flex flex-col gap-2">
              <Link
                to="/furniture"
                className="w-full text-center py-2.5 bg-charcoal text-canvas text-xs uppercase tracking-widest font-medium"
              >
                Explore Furniture
              </Link>
              <Link
                to="/inquiry"
                className="w-full text-center py-2.5 border border-stone-300 text-charcoal text-xs uppercase tracking-widest font-medium"
              >
                Request Furniture / Inquiry
              </Link>
            </div>

            <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500 font-mono">
              <span>{BUSINESS_INFO.phone}</span>
              <span>Lahore, PK</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
