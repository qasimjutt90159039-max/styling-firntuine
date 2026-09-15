import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Phone, MapPin, Grid, Layers, HelpCircle, CheckSquare } from 'lucide-react';
import { BUSINESS_INFO, ROOMS } from '../data/business';

export default function AboutPage() {
  useEffect(() => {
    document.title = "About Stylish Furniture | Furniture Store in Nagra Town Lahore";
  }, []);

  return (
    <div className="bg-canvas">
      
      {/* Header Banner */}
      <section className="border-b border-stone-200 py-16 sm:py-24 bg-stone-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-xs uppercase font-mono tracking-widest text-stone-500 block mb-3">
            Business Profile & Store Philosophy
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-charcoal font-normal tracking-tight leading-tight mb-6">
            About Stylish Furniture
          </h1>
          <p className="text-base sm:text-lg text-stone-600 max-w-2xl font-light leading-relaxed">
            {BUSINESS_INFO.name} is a local furniture store categorized under {BUSINESS_INFO.category}, located on Nagra Road in Nagra Town Lahore, Pakistan. We provide a room-based furniture browsing experience designed to connect customers with contemporary interior pieces.
          </p>
        </div>
      </section>

      {/* SECTION 1: ABOUT STYLISH FURNITURE */}
      <section className="py-16 sm:py-20 border-b border-stone-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
            <div className="md:col-span-4">
              <span className="text-xs uppercase font-mono tracking-widest text-stone-500 block mb-2">
                01 &bull; Overview
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl text-charcoal font-normal">
                Local Showroom in Lahore
              </h2>
            </div>
            <div className="md:col-span-8 space-y-4 text-stone-600 text-sm sm:text-base leading-relaxed">
              <p>
                Operating in Nagra Town, Lahore, Stylish Furniture provides furniture pieces suitable for homes, apartments, and commercial offices. Our digital showcase enables customers to review furniture items, understand materials, and prepare specific inquiries prior to visiting or making orders.
              </p>
              <div className="p-4 bg-stone-50 border border-stone-200 font-mono text-xs text-stone-700 space-y-2">
                <div><strong>Business Name:</strong> {BUSINESS_INFO.name}</div>
                <div><strong>Classification:</strong> {BUSINESS_INFO.category}</div>
                <div><strong>Location:</strong> {BUSINESS_INFO.address}</div>
                <div><strong>Contact Number:</strong> {BUSINESS_INFO.phone}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: FURNITURE CATEGORIES */}
      <section className="py-16 sm:py-20 border-b border-stone-200 bg-stone-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
            <div className="md:col-span-4">
              <span className="text-xs uppercase font-mono tracking-widest text-stone-500 block mb-2">
                02 &bull; Categories
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl text-charcoal font-normal">
                Furniture Categories
              </h2>
            </div>
            <div className="md:col-span-8 space-y-6">
              <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
                Our catalog and showroom classification covers primary furniture needs across seating, resting, dining, working, and storage:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { title: 'Sofas & Seating', desc: 'Lounge sofas, armchairs, sectionals, and living room seating.' },
                  { title: 'Beds & Sleep', desc: 'Bedframes, headboards, and bedside arrangements.' },
                  { title: 'Dining Furniture', desc: 'Dining tables, banquet chairs, and communal surfaces.' },
                  { title: 'Tables & Accents', desc: 'Coffee tables, end tables, consoles, and functional desks.' },
                  { title: 'Storage & Media', desc: 'Cabinets, credenzas, wardrobes, and modular shelving.' },
                  { title: 'Office Furniture', desc: 'Task chairs, work desks, and professional study setups.' },
                ].map((cat) => (
                  <div key={cat.title} className="p-4 bg-canvas border border-stone-200">
                    <h4 className="font-serif text-base text-charcoal mb-1">{cat.title}</h4>
                    <p className="text-xs text-stone-500 leading-relaxed">{cat.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: ROOM-BASED SELECTION */}
      <section className="py-16 sm:py-20 border-b border-stone-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
            <div className="md:col-span-4">
              <span className="text-xs uppercase font-mono tracking-widest text-stone-500 block mb-2">
                03 &bull; Methodology
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl text-charcoal font-normal">
                Room-Based Selection
              </h2>
            </div>
            <div className="md:col-span-8 space-y-4 text-stone-600 text-sm sm:text-base leading-relaxed">
              <p>
                Rather than browsing disconnected product listings, our showroom system is structured around the context of rooms. This approach allows customers to consider the scale, geometry, and styling harmony of furnishings relative to their specific space requirements.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                {ROOMS.slice(0, 4).map((r) => (
                  <Link
                    key={r.id}
                    to={r.path}
                    className="p-3 bg-stone-50 border border-stone-200 text-center hover:border-charcoal transition-colors group"
                  >
                    <span className="text-xs font-mono text-stone-400 block mb-1">{r.number}</span>
                    <span className="text-xs font-medium text-charcoal group-hover:underline">{r.name}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: CUSTOMER INQUIRY EXPERIENCE */}
      <section className="py-16 sm:py-20 bg-stone-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
            <div className="md:col-span-4">
              <span className="text-xs uppercase font-mono tracking-widest text-stone-500 block mb-2">
                04 &bull; Service Flow
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl text-charcoal font-normal">
                Customer Inquiry Experience
              </h2>
            </div>
            <div className="md:col-span-8 space-y-6">
              <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
                We maintain direct, transparent communication for customer inquiries. Customers can submit dimensions, reference pictures, or model requests directly through our inquiry form or contact our showroom phone.
              </p>

              <div className="space-y-3">
                <div className="flex items-start gap-3 p-4 bg-canvas border border-stone-200">
                  <CheckSquare className="w-5 h-5 text-stone-700 shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-medium text-charcoal text-sm">Direct Phone Accessibility</h5>
                    <p className="text-xs text-stone-500 mt-0.5">
                      Call our representative directly at {BUSINESS_INFO.phone} for immediate availability and showroom questions.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-canvas border border-stone-200">
                  <CheckSquare className="w-5 h-5 text-stone-700 shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-medium text-charcoal text-sm">Digital Request Management</h5>
                    <p className="text-xs text-stone-500 mt-0.5">
                      Submit an inquiry with optional reference photos to discuss custom sizes or showroom models.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-4 flex flex-wrap items-center gap-4">
                <Link
                  to="/inquiry"
                  className="px-6 py-3 bg-charcoal text-canvas text-xs uppercase tracking-widest font-mono hover:bg-stone-800 transition-colors"
                >
                  Submit Inquiry
                </Link>
                <Link
                  to="/contact"
                  className="px-6 py-3 border border-stone-300 bg-canvas text-charcoal text-xs uppercase tracking-widest font-mono hover:border-charcoal transition-colors"
                >
                  Showroom Location
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
