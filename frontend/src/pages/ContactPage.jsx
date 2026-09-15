import React, { useEffect } from 'react';
import { Phone, MapPin, Navigation, ArrowUpRight } from 'lucide-react';
import { BUSINESS_INFO } from '../data/business';
import InquiryForm from '../components/InquiryForm';

export default function ContactPage() {
  useEffect(() => {
    document.title = "Contact Stylish Furniture | Lahore, Pakistan";
  }, []);

  return (
    <div className="bg-canvas">
      
      {/* Header Banner */}
      <section className="py-14 sm:py-20 border-b border-stone-200 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-xs uppercase font-mono tracking-widest text-stone-500 block mb-2">
            Store Location & Communication
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl text-charcoal font-normal">
            Contact Stylish Furniture
          </h1>
          <p className="text-sm sm:text-base text-stone-600 mt-2 font-light max-w-2xl">
            Get in touch directly with our Lahore showroom. Inquire about furniture pieces, discuss custom requirements, or visit us in Nagra Town Lahore.
          </p>
        </div>
      </section>

      {/* Main Content Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Verified Business Information & Map */}
          <div className="lg:col-span-5 space-y-8">
            
            <div className="bg-stone-50 border border-stone-200 p-6 sm:p-8 space-y-6">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-stone-400 block mb-1">
                  Business Entity
                </span>
                <h3 className="font-serif text-2xl text-charcoal font-normal">
                  {BUSINESS_INFO.name}
                </h3>
                <p className="text-xs uppercase font-mono tracking-wider text-stone-500 mt-1">
                  {BUSINESS_INFO.category}
                </p>
              </div>

              {/* Phone CTA Card */}
              <div className="pt-4 border-t border-stone-200 space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-stone-400 block">
                  Contact Number
                </span>
                <a
                  href={BUSINESS_INFO.phoneRaw}
                  className="flex items-center gap-3 text-lg sm:text-xl font-mono text-charcoal hover:underline"
                >
                  <Phone className="w-5 h-5 text-stone-600 shrink-0" />
                  <span>{BUSINESS_INFO.phone}</span>
                </a>
                <p className="text-xs text-stone-500">
                  Direct voice calls for stock inquiries and orders.
                </p>
                <div className="pt-1">
                  <a
                    href={BUSINESS_INFO.phoneRaw}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-charcoal text-canvas text-xs uppercase tracking-widest font-mono hover:bg-stone-800 transition-colors"
                  >
                    <span>Click to Call</span>
                  </a>
                </div>
              </div>

              {/* Address & Directions */}
              <div className="pt-4 border-t border-stone-200 space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-stone-400 block">
                  Showroom Address
                </span>
                <div className="flex items-start gap-3 text-sm text-stone-700 leading-relaxed">
                  <MapPin className="w-5 h-5 text-stone-600 shrink-0 mt-0.5" />
                  <span>{BUSINESS_INFO.address}</span>
                </div>
                <div className="pt-2">
                  <a
                    href={BUSINESS_INFO.mapSearchUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider font-mono text-charcoal hover:underline"
                  >
                    <span>Open in Google Maps</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Social Media Notice */}
              <div className="pt-4 border-t border-stone-200 text-xs text-stone-500 font-mono">
                <span>Social Media: None provided</span>
              </div>
            </div>

            {/* Google Map Section */}
            <div className="border border-stone-200 overflow-hidden bg-stone-100">
              <div className="p-3 bg-canvas border-b border-stone-200 flex items-center justify-between text-xs font-mono text-stone-600">
                <div className="flex items-center gap-1.5">
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Location Map</span>
                </div>
                <span>Nagra Town Lahore</span>
              </div>
              <iframe
                title="Stylish Furniture Location"
                src={`https://maps.google.com/maps?q=${encodeURIComponent(BUSINESS_INFO.address)}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                width="100%"
                height="320"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

          </div>

          {/* Right Column: Contact / Inquiry Form */}
          <div className="lg:col-span-7">
            <InquiryForm />
          </div>

        </div>
      </div>

    </div>
  );
}
