import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Phone, Compass, Sparkles } from 'lucide-react';
import RoomExplorer from '../components/RoomExplorer';
import FurnitureSpotlight from '../components/FurnitureSpotlight';
import { BUSINESS_INFO, ROOMS } from '../data/business';
import { api } from '../api/client';

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "Stylish Furniture | Modern Furniture Store in Nagra Town Lahore";
    
    const fetchHomeProducts = async () => {
      try {
        const data = await api.getProducts({ status: 'active' });
        setProducts(data);
      } catch (err) {
        console.error('Failed to load home products:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchHomeProducts();
  }, []);

  return (
    <div className="bg-canvas">
      
      {/* 7. EDITORIAL SPLIT-SCREEN HERO */}
      <section className="relative border-b border-stone-200 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[640px] lg:min-h-[720px] items-stretch">
            
            {/* LEFT SPLIT */}
            <div className="lg:col-span-6 flex flex-col justify-center py-12 sm:py-20 lg:pr-12 border-b lg:border-b-0 lg:border-r border-stone-200">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-stone-100 border border-stone-200 text-[10px] font-mono uppercase tracking-widest text-stone-600 mb-6 w-fit">
                <Compass className="w-3 h-3 text-stone-500" />
                <span>Modern Furniture Marketplace</span>
              </div>

              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-charcoal font-normal tracking-tight leading-[1.15] mb-6">
                Furniture That Shapes Your Space.
              </h1>

              <p className="text-base sm:text-lg text-stone-600 leading-relaxed max-w-lg mb-8 font-light">
                Discover refined furniture collections arranged by living spaces. Explore contemporary silhouettes, enduring craftsmanship, and room styling tailored for residential and commercial environments.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <Link
                  to="/furniture"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-charcoal text-canvas text-xs uppercase tracking-widest font-mono hover:bg-stone-800 transition-colors shadow-subtle text-center"
                >
                  <span>Explore Furniture</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-stone-300 text-charcoal text-xs uppercase tracking-widest font-mono hover:border-charcoal hover:bg-stone-50 transition-colors text-center"
                >
                  <span>Contact Store</span>
                </Link>
              </div>

              {/* Verified Location Stamp */}
              <div className="mt-12 pt-8 border-t border-stone-100 flex items-center gap-3 text-xs text-stone-500 font-mono">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Showroom: Nagra Rd, Nagra Town Lahore</span>
              </div>
            </div>

            {/* RIGHT SPLIT: Large Premium Furniture Visual with Floating Labels */}
            <div className="lg:col-span-6 relative bg-stone-100 min-h-[420px] lg:min-h-full overflow-hidden group">
              <img
                src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=80"
                alt="Modern interior room scene with curated furniture"
                className="w-full h-full object-cover reveal-zoom"
              />

              {/* Floating UI Labels: LIVING, BEDROOM, DINING */}
              <div className="absolute inset-0 p-6 flex flex-col justify-between pointer-events-none">
                
                {/* Top right label */}
                <div className="flex justify-end pointer-events-auto">
                  <Link
                    to="/rooms/living-room"
                    className="bg-canvas/90 backdrop-blur-md px-4 py-2 border border-stone-200 shadow-lift text-charcoal text-xs uppercase tracking-widest font-mono hover:bg-charcoal hover:text-canvas transition-colors flex items-center gap-2"
                  >
                    <span>LIVING</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                {/* Center / middle left label */}
                <div className="flex justify-start pointer-events-auto">
                  <Link
                    to="/rooms/bedroom"
                    className="bg-canvas/90 backdrop-blur-md px-4 py-2 border border-stone-200 shadow-lift text-charcoal text-xs uppercase tracking-widest font-mono hover:bg-charcoal hover:text-canvas transition-colors flex items-center gap-2"
                  >
                    <span>BEDROOM</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                {/* Bottom right label */}
                <div className="flex justify-end pointer-events-auto">
                  <Link
                    to="/rooms/dining-room"
                    className="bg-canvas/90 backdrop-blur-md px-4 py-2 border border-stone-200 shadow-lift text-charcoal text-xs uppercase tracking-widest font-mono hover:bg-charcoal hover:text-canvas transition-colors flex items-center gap-2"
                  >
                    <span>DINING</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 8. CHOOSE YOUR SPACE (ROOM EXPLORER) */}
      <RoomExplorer />

      {/* 9. FURNITURE SPOTLIGHT */}
      <FurnitureSpotlight products={products} loading={loading} />

      {/* EDITORIAL ROOM COMPOSITIONS SECTION */}
      <section className="py-20 sm:py-28 bg-canvas">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-5 space-y-6">
              <span className="text-xs uppercase font-mono tracking-widest text-stone-500">
                Spatial Philosophy
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-charcoal font-normal leading-tight">
                Designed to harmonize with your daily rituals.
              </h2>
              <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
                Whether furnishing a spacious drawing room, creating a serene bedroom sanctuary, or equipping an efficient workspace, furniture should bring balance, comfort, and architectural clarity to each space.
              </p>

              <div className="pt-2 flex flex-col gap-3 font-mono text-xs text-stone-700">
                <div className="flex items-center gap-3 p-3 bg-stone-50 border border-stone-200">
                  <span className="font-semibold text-charcoal">01</span>
                  <span>Room-Specific Proportions & Scale</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-stone-50 border border-stone-200">
                  <span className="font-semibold text-charcoal">02</span>
                  <span>Direct Showroom Consultation in Lahore</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-stone-50 border border-stone-200">
                  <span className="font-semibold text-charcoal">03</span>
                  <span>Tailored Inquiries for Custom Requirements</span>
                </div>
              </div>

              <div className="pt-4">
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-mono text-charcoal hover:underline"
                >
                  <span>Learn about our store</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="aspect-[3/4] bg-stone-100 overflow-hidden border border-stone-200">
                  <img
                    src="https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=800&q=80"
                    alt="Storage and cabinetry composition"
                    className="w-full h-full object-cover reveal-zoom"
                    loading="lazy"
                  />
                </div>
                <div className="p-4 bg-stone-50 border border-stone-200">
                  <span className="text-[10px] uppercase font-mono tracking-widest text-stone-400">
                    Storage & Shelving
                  </span>
                  <h4 className="font-serif text-base text-charcoal">
                    Structured Organization
                  </h4>
                </div>
              </div>

              <div className="space-y-4 sm:pt-8">
                <div className="p-4 bg-stone-50 border border-stone-200">
                  <span className="text-[10px] uppercase font-mono tracking-widest text-stone-400">
                    Workspace Solutions
                  </span>
                  <h4 className="font-serif text-base text-charcoal">
                    Office & Study Desks
                  </h4>
                </div>
                <div className="aspect-[3/4] bg-stone-100 overflow-hidden border border-stone-200">
                  <img
                    src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=800&q=80"
                    alt="Office workstation furniture"
                    className="w-full h-full object-cover reveal-zoom"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* QUICK INQUIRY & STORE VISIT STRIP */}
      <section className="bg-stone-50 border-t border-stone-200 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <span className="text-xs uppercase font-mono tracking-widest text-stone-500 block mb-1">
                Store Location & Inquiries
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-charcoal font-normal">
                Visit {BUSINESS_INFO.name} in Lahore.
              </h3>
              <p className="text-sm text-stone-600 mt-1 max-w-xl">
                {BUSINESS_INFO.address}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <a
                href={BUSINESS_INFO.phoneRaw}
                className="inline-flex items-center gap-2 px-6 py-3 bg-charcoal text-canvas text-xs uppercase tracking-widest font-mono hover:bg-stone-800 transition-colors"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call {BUSINESS_INFO.phone}</span>
              </a>
              <Link
                to="/inquiry"
                className="inline-flex items-center gap-2 px-6 py-3 border border-stone-300 bg-canvas text-charcoal text-xs uppercase tracking-widest font-mono hover:border-charcoal transition-colors"
              >
                <span>Request Information</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
