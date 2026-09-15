import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Layers, Sparkles, Check, ArrowRight } from 'lucide-react';
import { api } from '../api/client';
import ProductCard from '../components/ProductCard';
import SecondaryRoomStrip from '../components/SecondaryRoomStrip';
import EmptyState from '../components/EmptyState';
import LoadingSkeleton from '../components/LoadingSkeleton';

export default function BedroomPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "Bedroom Furniture | Stylish Furniture Lahore";

    const fetchBedroomProducts = async () => {
      try {
        const data = await api.getProducts({ room: 'Bedroom', status: 'active' });
        setProducts(data);
      } catch (err) {
        console.error('Error fetching bedroom furniture:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchBedroomProducts();
  }, []);

  return (
    <div className="bg-canvas">
      {/* Secondary Sticky Room Strip */}
      <SecondaryRoomStrip activeRoom="Bedroom" />

      {/* Full-width Bedroom Visual Header */}
      <section className="relative w-full h-[450px] sm:h-[550px] bg-stone-900 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1920&q=80"
          alt="Architectural bedroom environment"
          className="w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-charcoal/40 backdrop-blur-[1px]" />
        
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-canvas">
            <div className="max-w-xl bg-charcoal/80 backdrop-blur-md p-8 sm:p-10 border border-canvas/20">
              <span className="text-[11px] uppercase font-mono tracking-widest text-canvas/70 block mb-2">
                Room Collection 02
              </span>
              <h1 className="font-serif text-3xl sm:text-5xl font-normal mb-3">
                Bedroom Collection
              </h1>
              <p className="text-xs sm:text-sm text-canvas/80 leading-relaxed font-light">
                Crafting serene sanctuaries. Architectural solid bedframes, bedside tables, wardrobe systems, and tactile finishing designed for peaceful rest.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Material & Detail Highlight Area */}
      <section className="py-12 bg-stone-50 border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-xs font-mono text-stone-700">
            <div className="p-4 bg-canvas border border-stone-200 space-y-1">
              <span className="text-stone-400 block">Category 01</span>
              <h4 className="font-serif text-base text-charcoal font-sans font-semibold">Beds & Headboards</h4>
              <p className="text-stone-500 font-sans">King, Queen, and custom dimensions.</p>
            </div>
            <div className="p-4 bg-canvas border border-stone-200 space-y-1">
              <span className="text-stone-400 block">Category 02</span>
              <h4 className="font-serif text-base text-charcoal font-sans font-semibold">Bedside Tables</h4>
              <p className="text-stone-500 font-sans">Single & twin drawer nightstands.</p>
            </div>
            <div className="p-4 bg-canvas border border-stone-200 space-y-1">
              <span className="text-stone-400 block">Category 03</span>
              <h4 className="font-serif text-base text-charcoal font-sans font-semibold">Wardrobes</h4>
              <p className="text-stone-500 font-sans">Built-in and standalone closet storage.</p>
            </div>
            <div className="p-4 bg-canvas border border-stone-200 space-y-1">
              <span className="text-stone-400 block">Category 04</span>
              <h4 className="font-serif text-base text-charcoal font-sans font-semibold">Bedroom Storage</h4>
              <p className="text-stone-500 font-sans">Dressers, chest of drawers, and ottomans.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Bedroom Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {loading ? (
          <LoadingSkeleton count={4} type="card" />
        ) : products.length === 0 ? (
          <EmptyState
            title="Bedroom furniture will appear here."
            message="Showroom bedroom sets and custom bedframes will be displayed here as items are cataloged in our Lahore showroom. Inquire today for custom sizes."
            actionLink="/inquiry?room=Bedroom"
            actionText="Inquire for Bedroom Furniture"
          />
        ) : (
          <div className="space-y-16">
            
            {/* Product Spotlight */}
            <div>
              <span className="text-xs uppercase font-mono tracking-widest text-stone-500 block mb-4">
                Bedroom Spotlight
              </span>
              <ProductCard product={products[0]} variant="featured" />
            </div>

            {/* Vertical Furniture List (Distinct layout from living room) */}
            {products.length > 1 && (
              <div className="pt-8 border-t border-stone-200">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="font-serif text-2xl text-charcoal font-normal">
                    Curated Bedroom Pieces
                  </h3>
                  <span className="text-xs font-mono text-stone-400">Vertical Showcase</span>
                </div>

                <div className="space-y-6">
                  {products.slice(1).map((item) => (
                    <div
                      key={item._id}
                      className="bg-canvas border border-stone-200 p-6 flex flex-col md:flex-row items-center justify-between gap-6 hover:border-charcoal transition-all group"
                    >
                      <div className="w-full md:w-48 h-36 bg-stone-100 overflow-hidden shrink-0">
                        <img
                          src={item.images && item.images[0] ? item.images[0] : 'https://images.unsplash.com/photo-1540518614846-7ede433c4ef0?auto=format&fit=crop&w=600&q=80'}
                          alt={item.name}
                          className="w-full h-full object-cover reveal-zoom"
                          loading="lazy"
                        />
                      </div>

                      <div className="flex-1 space-y-2">
                        <span className="text-[10px] uppercase font-mono tracking-widest text-stone-400">
                          {item.category}
                        </span>
                        <h4 className="font-serif text-xl text-charcoal group-hover:text-stone-700">
                          {item.name}
                        </h4>
                        {item.description && (
                          <p className="text-xs text-stone-600 line-clamp-2 max-w-xl leading-relaxed">
                            {item.description}
                          </p>
                        )}
                        {item.material && (
                          <span className="inline-block text-[11px] font-mono text-stone-400">
                            Material: {item.material}
                          </span>
                        )}
                      </div>

                      <div className="flex flex-col sm:flex-row md:flex-col gap-2 w-full md:w-auto shrink-0">
                        <Link
                          to={`/furniture/${item._id}`}
                          className="px-5 py-2 text-center text-xs uppercase tracking-wider font-mono border border-stone-300 hover:border-charcoal transition-colors"
                        >
                          View Details
                        </Link>
                        <Link
                          to={`/inquiry?product=${encodeURIComponent(item.name)}&room=Bedroom`}
                          className="px-5 py-2 text-center text-xs uppercase tracking-wider font-mono bg-charcoal text-canvas hover:bg-stone-800 transition-colors"
                        >
                          Inquire
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        )}
      </div>

      {/* Inquiry Callout */}
      <section className="py-14 bg-stone-50 border-t border-stone-200 text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h3 className="font-serif text-2xl text-charcoal font-normal mb-2">
            Custom Bedroom Sets & Storage
          </h3>
          <p className="text-xs sm:text-sm text-stone-600 mb-6">
            Inquire about tailored dimensions for master suites or guest bedrooms. Visit our showroom in Nagra Town Lahore.
          </p>
          <Link
            to="/inquiry?room=Bedroom"
            className="px-6 py-3 bg-charcoal text-canvas text-xs uppercase tracking-widest font-mono hover:bg-stone-800"
          >
            Request Bedroom Inquiry
          </Link>
        </div>
      </section>

    </div>
  );
}
