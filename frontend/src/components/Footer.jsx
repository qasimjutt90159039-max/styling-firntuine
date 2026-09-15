import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, MapPin, ArrowUpRight, Lock } from 'lucide-react';
import { BUSINESS_INFO, ROOMS } from '../data/business';

export default function Footer() {
  return (
    <footer className="bg-[#FAFAF8] border-t border-stone-200 text-stone-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          
          {/* Col 1: Business Identity */}
          <div className="lg:col-span-5 space-y-4">
            <span className="font-serif text-2xl sm:text-3xl text-charcoal block">
              {BUSINESS_INFO.name}
            </span>
            <p className="text-xs uppercase font-mono tracking-widest text-stone-500">
              {BUSINESS_INFO.category}
            </p>
            <p className="text-sm text-stone-600 max-w-md leading-relaxed">
              A modern digital furniture showroom and room-based discovery platform. Explore furniture compositions tailored for living rooms, bedrooms, dining spaces, and offices.
            </p>

            <div className="pt-2 space-y-2 text-sm">
              <a
                href={BUSINESS_INFO.phoneRaw}
                className="flex items-center gap-2 text-charcoal font-medium hover:underline font-mono"
              >
                <Phone className="w-4 h-4 text-stone-600" />
                <span>{BUSINESS_INFO.phone}</span>
              </a>
              <div className="flex items-start gap-2 text-stone-600 leading-snug">
                <MapPin className="w-4 h-4 text-stone-500 shrink-0 mt-0.5" />
                <span>{BUSINESS_INFO.address}</span>
              </div>
            </div>
          </div>

          {/* Col 2: Room Collections */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs uppercase font-mono tracking-widest text-charcoal font-semibold">
              Room Collections
            </h4>
            <ul className="space-y-2 text-sm">
              {ROOMS.map((room) => (
                <li key={room.id}>
                  <Link
                    to={room.path}
                    className="hover:text-charcoal transition-colors flex items-center justify-between group"
                  >
                    <span>{room.name}</span>
                    <span className="text-stone-400 group-hover:text-charcoal text-xs font-mono">
                      {room.number}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Navigation */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs uppercase font-mono tracking-widest text-charcoal font-semibold">
              Explore
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-charcoal transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/furniture" className="hover:text-charcoal transition-colors">All Furniture</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-charcoal transition-colors">About Store</Link>
              </li>
              <li>
                <Link to="/gallery" className="hover:text-charcoal transition-colors">Gallery</Link>
              </li>
              <li>
                <Link to="/inquiry" className="hover:text-charcoal transition-colors">Request Furniture</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-charcoal transition-colors">Store Location</Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Store Visit Card */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs uppercase font-mono tracking-widest text-charcoal font-semibold">
              Direct Contact
            </h4>
            <div className="bg-canvas p-4 border border-stone-200 space-y-3">
              <span className="text-xs text-stone-500 block">
                Have specific room measurements or custom requirements?
              </span>
              <Link
                to="/inquiry"
                className="inline-flex items-center gap-1 text-xs font-semibold text-charcoal uppercase tracking-wider hover:underline"
              >
                Submit Inquiry <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
              <div className="pt-2 border-t border-stone-100">
                <a
                  href={BUSINESS_INFO.phoneRaw}
                  className="inline-block w-full text-center py-2 bg-charcoal text-canvas text-xs uppercase tracking-widest font-medium hover:bg-stone-800 transition-colors"
                >
                  Call Now
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
          <div>
            &copy; {new Date().getFullYear()} {BUSINESS_INFO.name}. Nagra Town Lahore, Pakistan. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <Link to="/contact" className="hover:text-charcoal transition-colors">
              Find on Map
            </Link>
            <Link to="/admin" className="flex items-center gap-1 hover:text-charcoal transition-colors font-mono">
              <Lock className="w-3 h-3" />
              <span>Admin Portal</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
