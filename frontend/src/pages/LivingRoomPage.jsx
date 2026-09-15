import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Phone, MessageSquare } from 'lucide-react';
import { api } from '../api/client';
import ProductCard from '../components/ProductCard';
import SecondaryRoomStrip from '../components/SecondaryRoomStrip';
import EmptyState from '../components/EmptyState';
import LoadingSkeleton from '../components/LoadingSkeleton';

export default function LivingRoomPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "Living Room Furniture | Stylish Furniture Lahore";

    const fetchLivingProducts = async () => {
      try {
        const data = await api.getProducts({ room: 'Living Room', status: 'active' });
        setProducts(data);
      } catch (err) {
        console.error('Error fetching living room furniture:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchLivingProducts();
  }, []);

  // Filter subsets for room subsections
  const sofas = products.filter((p) => p.category.toLowerCase().includes('sofa') || p.category.toLowerCase().includes('chair'));
  const tables = products.filter((p) => p.category.toLowerCase().includes('table'));
  const storage = products.filter((p) => p.category.toLowerCase().includes('storage'));

  return (
    <div className="bg-canvas">
      
      {/* Secondary Room Strip */}
      <SecondaryRoomStrip activeRoom="Living Room" />

      {/* Hero: Large Living Room Visual */}
      <section className="relative min-h-[480px] lg:min-h-[580px] flex items-end bg-stone-900 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1800&q=80"
          alt="Living room furniture layout"
          className="absolute inset-0 w-full h-full object-cover opacity-75"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/40 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-canvas">
          <div className="max-w-2xl">
            <span className="text-xs uppercase font-mono tracking-widest text-canvas/80 bg-charcoal/50 px-3 py-1 border border-canvas/20 inline-block mb-4">
              Room Collection 01
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal leading-tight mb-4">
              Living Room
            </h1>
            <p className="text-base sm:text-lg text-canvas/80 leading-relaxed font-light">
              Centering comfort and social gathering. Explore tailored seating, artisanal coffee surfaces, and refined media consoles engineered for modern lounging.
            </p>
          </div>
        </div>
      </section>

      {/* Living Room Introduction Section */}
      <section className="py-14 sm:py-20 border-b border-stone-200 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-4">
              <span className="text-xs uppercase font-mono tracking-widest text-stone-500 block mb-2">
                Spatial Styling
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl text-charcoal font-normal">
                Curated Lounge Essentials
              </h2>
            </div>
            <div className="lg:col-span-8 text-sm sm:text-base text-stone-600 space-y-3 leading-relaxed">
              <p>
                The living room requires a delicate harmony between tactile comfort and enduring structure. From generous sectional seating to sculptural accent chairs, our collection features pieces that anchor your home with distinction.
              </p>
              <div className="flex flex-wrap gap-4 pt-2 text-xs font-mono text-stone-700">
                <span className="bg-canvas px-3 py-1.5 border border-stone-200">Sofa Collections</span>
                <span className="bg-canvas px-3 py-1.5 border border-stone-200">Coffee & Side Tables</span>
                <span className="bg-canvas px-3 py-1.5 border border-stone-200">Media Consoles & Credenzas</span>
                <span className="bg-canvas px-3 py-1.5 border border-stone-200">Accent Armchairs</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Living Room Products / Sections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {loading ? (
          <LoadingSkeleton count={6} type="card" />
        ) : products.length === 0 ? (
          <EmptyState
            title="Living room furniture will appear here."
            message="Showroom pieces for the living room are updated as new arrivals enter our Lahore store. Submit an inquiry for custom sofa sizes, fabric selections, or living room packages."
            actionLink="/inquiry?room=Living Room"
            actionText="Request Living Room Furniture"
          />
        ) : (
          <div className="space-y-16">
            
            {/* Featured Section */}
            <div>
              <div className="flex items-center justify-between mb-6 pb-2 border-b border-stone-200">
                <h3 className="font-serif text-2xl text-charcoal font-normal">
                  Featured Living Room Pieces
                </h3>
                <span className="text-xs font-mono text-stone-400">
                  {products.length} {products.length === 1 ? 'Item' : 'Items'}
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((p, idx) => (
                  <ProductCard key={p._id} product={p} variant={idx === 0 ? 'default' : 'compact'} />
                ))}
              </div>
            </div>

            {/* Sofa Collection Rail */}
            {sofas.length > 0 && (
              <div className="pt-8 border-t border-stone-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-serif text-2xl text-charcoal font-normal">
                    Sofa & Seating Collection
                  </h3>
                  <span className="text-xs font-mono text-stone-400">Horizontal Rail</span>
                </div>
                <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-none">
                  {sofas.map((s) => (
                    <ProductCard key={`sofa-${s._id}`} product={s} variant="rail" />
                  ))}
                </div>
              </div>
            )}

            {/* Tables & Storage */}
            {(tables.length > 0 || storage.length > 0) && (
              <div className="pt-8 border-t border-stone-200">
                <h3 className="font-serif text-2xl text-charcoal font-normal mb-6">
                  Tables & Storage
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[...tables, ...storage].map((item) => (
                    <ProductCard key={`acc-${item._id}`} product={item} variant="default" />
                  ))}
                </div>
              </div>
            )}

          </div>
        )}
      </div>

      {/* Inquiry Banner */}
      <section className="bg-stone-50 border-t border-stone-200 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="text-xs uppercase font-mono tracking-widest text-stone-500">
            Custom Living Room Furniture
          </span>
          <h3 className="font-serif text-3xl text-charcoal font-normal">
            Need specific sofa dimensions or matching accent chairs?
          </h3>
          <p className="text-sm text-stone-600 max-w-xl mx-auto leading-relaxed">
            Our team at Stylish Furniture in Nagra Town Lahore can assist with custom sizing, materials, and complete living room sets.
          </p>
          <div className="pt-4 flex justify-center gap-4">
            <Link
              to="/inquiry?room=Living Room"
              className="px-6 py-3 bg-charcoal text-canvas text-xs uppercase tracking-widest font-mono hover:bg-stone-800 transition-colors"
            >
              Request Custom Dimensions
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
