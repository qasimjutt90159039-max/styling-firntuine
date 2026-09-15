import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, ArrowRight, ShieldCheck } from 'lucide-react';
import { api } from '../api/client';
import ProductCard from '../components/ProductCard';
import SecondaryRoomStrip from '../components/SecondaryRoomStrip';
import EmptyState from '../components/EmptyState';
import LoadingSkeleton from '../components/LoadingSkeleton';

export default function OfficePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "Office Furniture | Stylish Furniture Lahore";

    const fetchOfficeProducts = async () => {
      try {
        const data = await api.getProducts({ room: 'Office', status: 'active' });
        setProducts(data);
      } catch (err) {
        console.error('Error fetching office furniture:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchOfficeProducts();
  }, []);

  return (
    <div className="bg-canvas">
      {/* Secondary Room Strip */}
      <SecondaryRoomStrip activeRoom="Office" />

      {/* Large Workspace Visual Header */}
      <section className="relative min-h-[420px] sm:min-h-[500px] flex items-center bg-stone-900 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1920&q=80"
          alt="Professional modern workspace interior"
          className="absolute inset-0 w-full h-full object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/90 via-charcoal/60 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-canvas">
          <div className="max-w-2xl">
            <span className="text-xs uppercase font-mono tracking-widest text-canvas/70 inline-flex items-center gap-2 bg-charcoal/60 px-3 py-1 border border-canvas/20 mb-4">
              <Briefcase className="w-3 h-3" />
              <span>Room Collection 04</span>
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal leading-tight mb-4">
              Office & Workspace
            </h1>
            <p className="text-sm sm:text-base text-canvas/80 leading-relaxed font-light">
              Structured environments for productivity. Ergonomic task seating, spacious executive desks, meeting tables, and lockable storage solutions.
            </p>
          </div>
        </div>
      </section>

      {/* Workspace Categories Strip */}
      <section className="py-8 bg-stone-50 border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs font-mono">
            <div className="p-4 bg-canvas border border-stone-200">
              <span className="text-stone-400 block mb-1">01</span>
              <strong className="text-charcoal font-medium block">Office Chairs</strong>
              <span className="text-stone-500 font-sans">Ergonomic & executive task seating.</span>
            </div>
            <div className="p-4 bg-canvas border border-stone-200">
              <span className="text-stone-400 block mb-1">02</span>
              <strong className="text-charcoal font-medium block">Desks</strong>
              <span className="text-stone-500 font-sans">Executive, study, and computer desks.</span>
            </div>
            <div className="p-4 bg-canvas border border-stone-200">
              <span className="text-stone-400 block mb-1">03</span>
              <strong className="text-charcoal font-medium block">Tables</strong>
              <span className="text-stone-500 font-sans">Conference and discussion tables.</span>
            </div>
            <div className="p-4 bg-canvas border border-stone-200">
              <span className="text-stone-400 block mb-1">04</span>
              <strong className="text-charcoal font-medium block">Storage</strong>
              <span className="text-stone-500 font-sans">Filing cabinets, credenzas, and bookshelves.</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Office Catalog Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {loading ? (
          <LoadingSkeleton count={3} type="card" />
        ) : products.length === 0 ? (
          <EmptyState
            title="Office furniture will appear here."
            message="Commercial office desks, study sets, and ergonomic seating will appear here as cataloged. Contact our Lahore showroom directly for corporate or home-office inquiries."
            actionLink="/inquiry?room=Office"
            actionText="Inquire About Office Furniture"
          />
        ) : (
          <div className="space-y-16">
            
            <div>
              <div className="flex items-center justify-between mb-8 pb-3 border-b border-stone-200">
                <h3 className="font-serif text-2xl text-charcoal font-normal">
                  Office Furniture
                </h3>
                <span className="text-xs font-mono text-stone-400">
                  {products.length} {products.length === 1 ? 'Item' : 'Items'}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((item) => (
                  <ProductCard key={item._id} product={item} variant="default" />
                ))}
              </div>
            </div>

            {/* Product rail */}
            {products.length > 1 && (
              <div className="pt-8 border-t border-stone-200">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-serif text-xl text-charcoal">
                    Workspace Selection Rail
                  </h4>
                  <span className="text-xs font-mono text-stone-400">
                    Scroll horizontally &rarr;
                  </span>
                </div>
                <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-none">
                  {products.map((p) => (
                    <ProductCard key={`office-rail-${p._id}`} product={p} variant="rail" />
                  ))}
                </div>
              </div>
            )}

          </div>
        )}
      </div>

      {/* Corporate & Office Inquiry CTA */}
      <section className="py-16 bg-stone-50 border-t border-stone-200 text-center">
        <div className="max-w-3xl mx-auto px-4 space-y-4">
          <span className="text-xs uppercase font-mono tracking-widest text-stone-500">
            Commercial & Residential Workspaces
          </span>
          <h3 className="font-serif text-3xl text-charcoal font-normal">
            Equipping your study or commercial office in Lahore?
          </h3>
          <p className="text-sm text-stone-600 max-w-xl mx-auto leading-relaxed">
            Submit your office floor layout or quantity specifications to Stylish Furniture. We assist with custom-built desk surfaces and seating arrangements.
          </p>
          <div className="pt-2">
            <Link
              to="/inquiry?room=Office"
              className="inline-flex items-center gap-2 px-8 py-3 bg-charcoal text-canvas text-xs uppercase tracking-widest font-mono hover:bg-stone-800 transition-colors"
            >
              <span>Submit Office Inquiry</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
